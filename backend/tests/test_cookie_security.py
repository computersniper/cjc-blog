import sys
from pathlib import Path

from starlette.responses import Response

BACKEND_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND_DIR))

from cookie_security import harden_set_cookie_headers, harden_set_cookie_value


def test_harden_set_cookie_value_adds_secure_httponly_and_samesite():
    cookie = harden_set_cookie_value("session=abc; Path=/")

    assert "Secure" in cookie
    assert "HttpOnly" in cookie
    assert "SameSite=Lax" in cookie


def test_harden_set_cookie_value_preserves_existing_attributes():
    cookie = harden_set_cookie_value(
        "session=abc; Path=/; Secure; HttpOnly; SameSite=Strict"
    )

    assert cookie.count("Secure") == 1
    assert cookie.count("HttpOnly") == 1
    assert "SameSite=Strict" in cookie
    assert "SameSite=Lax" not in cookie


def test_harden_set_cookie_headers_updates_response_headers():
    response = Response()
    response.raw_headers.append((b"set-cookie", b"session=abc; Path=/"))

    harden_set_cookie_headers(response)

    set_cookie = next(
        value.decode("latin-1")
        for name, value in response.raw_headers
        if name.lower() == b"set-cookie"
    )
    assert "Secure" in set_cookie
    assert "HttpOnly" in set_cookie
    assert "SameSite=Lax" in set_cookie
