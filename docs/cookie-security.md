# Cookie Security

The scanner reported missing `Secure` and `SameSite` attributes. The current
public response shows this cookie:

```text
Set-Cookie: SITE_TOTAL_ID=...; Path=/; Max-Age=259200000; HttpOnly
```

`SITE_TOTAL_ID` is not set by the FastAPI code in this repository. It appears
to be injected by the nginx/BaoTa layer, so the production fix must happen at
that layer.

## Required Cookie Attributes

Every production cookie should include:

```text
Secure; HttpOnly; SameSite=Lax
```

Use `SameSite=Strict` only for cookies that never need to be sent during normal
cross-site navigation. `Lax` is a safer default for a public blog because it
still supports regular top-level navigation.

## Fix the SITE_TOTAL_ID Cookie

Preferred fix: disable the BaoTa/nginx site-statistics feature that creates
`SITE_TOTAL_ID` if the cookie is not required.

If the cookie is required, configure the module that creates it so the header
becomes:

```text
Set-Cookie: SITE_TOTAL_ID=...; Path=/; Max-Age=259200000; HttpOnly; Secure; SameSite=Lax
```

Do not add a second cookie with the same name from application code. Duplicate
cookies can create browser-specific behavior and make scans flaky.

## FastAPI and API Cookies

The FastAPI app now hardens any `Set-Cookie` header it emits by appending
missing `Secure`, `HttpOnly`, and `SameSite=Lax` attributes.

If you add cookies manually in FastAPI, still set the attributes explicitly:

```python
response.set_cookie(
    "session",
    value=session_id,
    httponly=True,
    secure=True,
    samesite="lax",
)
```

The admin panel currently uses a bearer token in `localStorage`, not a cookie.

## nginx Proxy Cookies

For cookies returned by proxied upstreams such as `/api/`, include
`deploy/nginx/cookie-security.conf` in that location:

```nginx
location /api/ {
    include /www/wwwroot/www.caijiechao.com/deploy/nginx/security-headers.conf;
    include /www/wwwroot/www.caijiechao.com/deploy/nginx/cookie-security.conf;
    proxy_pass http://127.0.0.1:8000/;
}
```

## HTTPS First

The `Secure` flag only works correctly when HTTP redirects to HTTPS. Keep the
port 80 server block as a redirect-only block:

```nginx
return 301 https://$host$request_uri;
```

## Verify

After updating nginx or BaoTa settings:

```bash
sudo nginx -t
sudo nginx -s reload
curl -I https://www.caijiechao.com/ | grep -i set-cookie
curl -I http://www.caijiechao.com/
```

Expected result for HTTPS is either no `Set-Cookie` at all or a cookie with both
`Secure` and `SameSite=Lax`. Expected result for HTTP is a 301/308 redirect to
HTTPS and no insecure cookie.
