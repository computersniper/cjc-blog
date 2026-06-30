from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]


def test_http_server_redirects_to_https():
    config = (REPO_ROOT / "deploy" / "nginx" / "http-to-https.conf").read_text(
        encoding="utf-8"
    )

    assert "listen 80;" in config
    assert "server_name www.caijiechao.com caijiechao.com;" in config
    assert "return 301 https://$host$request_uri;" in config


def test_proxy_cookie_flags_secure_and_samesite():
    config = (REPO_ROOT / "deploy" / "nginx" / "cookie-security.conf").read_text(
        encoding="utf-8"
    )

    assert "proxy_cookie_flags" in config
    assert "secure" in config
    assert "httponly" in config
    assert "samesite=lax" in config
