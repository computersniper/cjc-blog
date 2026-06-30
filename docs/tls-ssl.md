# TLS and HTTPS Enforcement

The site already answers on `https://www.caijiechao.com/`, but the HTTP origin
currently returns the page directly. External scanners will report this as
"Website is not using HTTPS" when `http://www.caijiechao.com/` does not redirect
to HTTPS.

## Required nginx behavior

HTTP must return a permanent redirect:

```text
http://www.caijiechao.com/ -> 301 or 308 -> https://www.caijiechao.com/
```

Use `deploy/nginx/http-to-https.conf` as the port 80 server block:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name www.caijiechao.com caijiechao.com;

    return 301 https://$host$request_uri;
}
```

Keep the HTTPS server block on port 443 serving the frontend and proxying the
API. Include the security headers only in the HTTPS server block and locations:

```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.caijiechao.com caijiechao.com;

    ssl_certificate /www/server/panel/vhost/cert/www.caijiechao.com/fullchain.pem;
    ssl_certificate_key /www/server/panel/vhost/cert/www.caijiechao.com/privkey.pem;

    include /www/wwwroot/www.caijiechao.com/deploy/nginx/security-headers.conf;

    root /www/wwwroot/www.caijiechao.com/frontend;
    index index.html;

    location /api/ {
        include /www/wwwroot/www.caijiechao.com/deploy/nginx/security-headers.conf;
        proxy_pass http://127.0.0.1:8000/;
    }
}
```

If you use the BaoTa panel, the same fix is the "force HTTPS" option for the
site. After enabling it, confirm the generated nginx config has a port 80 server
that only redirects to HTTPS.

## Deployment

```bash
sudo nginx -t
sudo nginx -s reload
```

## Verification

Run these checks after reload:

```bash
curl -I http://www.caijiechao.com/
curl -I https://www.caijiechao.com/
```

Expected HTTP result:

```text
HTTP/1.1 301 Moved Permanently
Location: https://www.caijiechao.com/
```

Expected HTTPS result:

```text
HTTP/1.1 200 OK
Strict-Transport-Security: max-age=31536000
```

## Best Practices

- Keep port 80 open only for redirects and certificate renewal challenges.
- Keep certificates auto-renewed with BaoTa/Let's Encrypt.
- Use HSTS only after HTTPS works reliably for the domain.
- Do not serve login, admin, contact, or API pages over HTTP.
