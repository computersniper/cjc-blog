SECURE_COOKIE_FLAGS = ("Secure", "HttpOnly", "SameSite=Lax")


def _has_cookie_attribute(parts: list[str], attribute: str) -> bool:
    attribute = attribute.lower()
    return any(part.strip().lower() == attribute for part in parts)


def _has_samesite(parts: list[str]) -> bool:
    return any(part.strip().lower().startswith("samesite=") for part in parts)


def harden_set_cookie_value(cookie_value: str) -> str:
    parts = cookie_value.split(";")
    hardened = cookie_value

    if not _has_cookie_attribute(parts, "secure"):
        hardened += "; Secure"
    if not _has_cookie_attribute(parts, "httponly"):
        hardened += "; HttpOnly"
    if not _has_samesite(parts):
        hardened += "; SameSite=Lax"

    return hardened


def harden_set_cookie_headers(response) -> None:
    response.raw_headers = [
        (
            name,
            harden_set_cookie_value(value.decode("latin-1")).encode("latin-1"),
        )
        if name.lower() == b"set-cookie"
        else (name, value)
        for name, value in response.raw_headers
    ]
