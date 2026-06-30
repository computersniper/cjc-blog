const { defineConfig } = require("vite");

const contentSecurityPolicy = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline'",
    "https://code.jquery.com",
    "https://unpkg.com",
    "https://cdn.jsdelivr.net",
    "https://uicdn.toast.com",
    "https://common.cnblogs.com",
    "https://cdn.bootcdn.net",
    "https://cdn.bootcss.com",
    "https://tenor.com",
  ].join(" "),
  [
    "style-src 'self' 'unsafe-inline'",
    "https://cdnjs.cloudflare.com",
    "https://stackpath.bootstrapcdn.com",
    "https://fonts.googleapis.com",
    "https://cdn.jsdelivr.net",
    "https://uicdn.toast.com",
    "https://unpkg.com",
    "https://use.fontawesome.com",
  ].join(" "),
  "img-src 'self' data: blob: https:",
  [
    "font-src 'self' data:",
    "https://fonts.gstatic.com",
    "https://cdnjs.cloudflare.com",
    "https://stackpath.bootstrapcdn.com",
    "https://use.fontawesome.com",
  ].join(" "),
  [
    "connect-src 'self'",
    "http://127.0.0.1:8000",
    "http://localhost:8000",
    "http://127.0.0.1:*",
    "http://localhost:*",
    "ws://127.0.0.1:*",
    "ws://localhost:*",
    "https://assets4.lottiefiles.com",
  ].join(" "),
  "media-src 'self' data: blob: https:",
  "frame-src 'self' https://tenor.com https://*.tenor.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = {
  "Content-Security-Policy": contentSecurityPolicy,
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "X-XSS-Protection": "1; mode=block",
};

module.exports = defineConfig({
  server: {
    headers: securityHeaders,
  },
  preview: {
    headers: securityHeaders,
  },
});
