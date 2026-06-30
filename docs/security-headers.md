# Security Headers

The public site is served by nginx, while the API is FastAPI. A production CSP
must therefore be applied at nginx for static HTML and at FastAPI for API
responses.

## Production nginx

1. Copy or keep `deploy/nginx/security-headers.conf` on the server.
2. Include it inside the `www.caijiechao.com` nginx `server` block:

```nginx
server {
    server_name www.caijiechao.com caijiechao.com;

    include /www/wwwroot/www.caijiechao.com/deploy/nginx/security-headers.conf;

    root /www/wwwroot/www.caijiechao.com/frontend;

    location /api/ {
        include /www/wwwroot/www.caijiechao.com/deploy/nginx/security-headers.conf;
        include /www/wwwroot/www.caijiechao.com/deploy/nginx/cookie-security.conf;
        proxy_pass http://127.0.0.1:8000/;
    }
}
```

3. Validate and reload nginx:

```bash
sudo nginx -t
sudo nginx -s reload
```

4. Verify the public headers:

```bash
curl -I https://www.caijiechao.com/ | grep -i content-security-policy
curl -I https://www.caijiechao.com/ | grep -i x-frame-options
curl -I https://www.caijiechao.com/api/articles/ | grep -i content-security-policy
curl -I https://www.caijiechao.com/api/articles/ | grep -i x-frame-options
```

## Current CSP shape

The policy allows the static dependencies currently used by the site:

- script CDNs: jQuery, AOS/unpkg, jsDelivr, Toast UI, highlight.js mirrors, Tenor
- style/font CDNs: Google Fonts, Font Awesome, Bootstrap, Toast UI
- images/media from self, data/blob URLs, and HTTPS sources used by the pages
- frames from self and Tenor, so local PDF iframes keep working

It still blocks high-risk sinks with `object-src 'none'`, `base-uri 'self'`,
`form-action 'self'`, and `frame-ancestors 'none'`.

## Hardening path

The site has many inline scripts, inline styles, and inline event handlers in
legacy static HTML, so the first deploy-safe CSP keeps `'unsafe-inline'`.
The next hardening step is to move inline JavaScript into local `.js` files and
inline styles into local `.css` files, then replace `'unsafe-inline'` with
nonces or hashes.
