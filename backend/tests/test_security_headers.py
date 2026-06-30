import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND_DIR))

from security_headers import CONTENT_SECURITY_POLICY, SECURITY_HEADERS


def test_security_headers_include_csp_and_clickjacking_controls():
    assert SECURITY_HEADERS["Content-Security-Policy"] == CONTENT_SECURITY_POLICY
    assert SECURITY_HEADERS["X-Content-Type-Options"] == "nosniff"
    assert SECURITY_HEADERS["X-Frame-Options"] == "DENY"
    assert SECURITY_HEADERS["Referrer-Policy"] == "strict-origin-when-cross-origin"


def test_csp_keeps_current_site_dependencies_but_blocks_risky_sinks():
    csp = CONTENT_SECURITY_POLICY

    assert "default-src 'self'" in csp
    assert "script-src 'self' 'unsafe-inline'" in csp
    assert "https://code.jquery.com" in csp
    assert "https://cdn.jsdelivr.net" in csp
    assert "https://uicdn.toast.com" in csp
    assert "https://fonts.googleapis.com" in csp
    assert "object-src 'none'" in csp
    assert "frame-ancestors 'none'" in csp
    assert "base-uri 'self'" in csp


def test_api_responses_set_x_content_type_options():
    from fastapi.testclient import TestClient
    from main import app

    response = TestClient(app).get("/articles/")

    assert response.status_code == 200
    assert response.headers["x-content-type-options"] == "nosniff"


def test_api_responses_deny_framing():
    from fastapi.testclient import TestClient
    from main import app

    response = TestClient(app).get("/articles/")

    assert response.status_code == 200
    assert response.headers["x-frame-options"] == "DENY"
    assert "frame-ancestors 'none'" in response.headers["content-security-policy"]
