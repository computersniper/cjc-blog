CONTENT_SECURITY_POLICY = "; ".join(
    [
        "default-src 'self'",
        (
            "script-src 'self' 'unsafe-inline' "
            "https://code.jquery.com "
            "https://unpkg.com "
            "https://cdn.jsdelivr.net "
            "https://uicdn.toast.com "
            "https://common.cnblogs.com "
            "https://cdn.bootcdn.net "
            "https://cdn.bootcss.com "
            "https://tenor.com"
        ),
        (
            "style-src 'self' 'unsafe-inline' "
            "https://cdnjs.cloudflare.com "
            "https://stackpath.bootstrapcdn.com "
            "https://fonts.googleapis.com "
            "https://cdn.jsdelivr.net "
            "https://uicdn.toast.com "
            "https://unpkg.com "
            "https://use.fontawesome.com"
        ),
        "img-src 'self' data: blob: https:",
        (
            "font-src 'self' data: "
            "https://fonts.gstatic.com "
            "https://cdnjs.cloudflare.com "
            "https://stackpath.bootstrapcdn.com "
            "https://use.fontawesome.com"
        ),
        "connect-src 'self' https://assets4.lottiefiles.com",
        "media-src 'self' data: blob: https:",
        "frame-src 'self' https://tenor.com https://*.tenor.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
    ]
)

SECURITY_HEADERS = {
    "Content-Security-Policy": CONTENT_SECURITY_POLICY,
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "X-XSS-Protection": "1; mode=block",
}
