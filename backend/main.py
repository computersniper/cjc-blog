from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import base64
import hashlib
import html
import hmac
import json
import os
import smtplib
import ssl
import time
from email.message import EmailMessage
from pathlib import Path

import models
import schemas
from cookie_security import harden_set_cookie_headers
from security_headers import SECURITY_HEADERS
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="CJC Blog API")
security = HTTPBearer()

def load_env_file():
    env_path = Path(__file__).with_name(".env")
    if not env_path.exists():
        return

    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))

load_env_file()

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "cjc-blog-admin")
ADMIN_SECRET = os.getenv("ADMIN_SECRET", "change-this-secret-before-deploy")
TOKEN_EXPIRE_SECONDS = int(os.getenv("ADMIN_TOKEN_EXPIRE_SECONDS", "86400"))

SMTP_HOST = os.getenv("SMTP_HOST", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", "465"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
SMTP_FROM = os.getenv("SMTP_FROM", SMTP_USERNAME)
SMTP_FROM_NAME = os.getenv("SMTP_FROM_NAME", "CJC Blog")
CONTACT_TO = os.getenv("CONTACT_TO", "")
SMTP_USE_SSL = os.getenv("SMTP_USE_SSL", "true").lower() in {"1", "true", "yes"}
SMTP_USE_STARTTLS = os.getenv("SMTP_USE_STARTTLS", "false").lower() in {"1", "true", "yes"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    for name, value in SECURITY_HEADERS.items():
        response.headers.setdefault(name, value)
    harden_set_cookie_headers(response)
    return response

def _b64encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode().rstrip("=")

def _b64decode(data: str) -> bytes:
    padding = "=" * (-len(data) % 4)
    return base64.urlsafe_b64decode(data + padding)

def create_access_token(username: str) -> str:
    payload = {
        "sub": username,
        "exp": int(time.time()) + TOKEN_EXPIRE_SECONDS,
    }
    payload_part = _b64encode(json.dumps(payload, separators=(",", ":")).encode())
    signature = hmac.new(ADMIN_SECRET.encode(), payload_part.encode(), hashlib.sha256).digest()
    return f"{payload_part}.{_b64encode(signature)}"

def verify_admin(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    try:
        payload_part, signature_part = credentials.credentials.split(".", 1)
        expected_signature = hmac.new(ADMIN_SECRET.encode(), payload_part.encode(), hashlib.sha256).digest()
        if not hmac.compare_digest(_b64decode(signature_part), expected_signature):
            raise ValueError("Bad signature")
        payload = json.loads(_b64decode(payload_part))
        if payload.get("exp", 0) < int(time.time()):
            raise ValueError("Expired token")
        if payload.get("sub") != ADMIN_USERNAME:
            raise ValueError("Bad user")
        return payload["sub"]
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired admin token")

@app.post("/auth/login", response_model=schemas.TokenResponse)
def login(login_request: schemas.LoginRequest):
    username_ok = hmac.compare_digest(login_request.username, ADMIN_USERNAME)
    password_ok = hmac.compare_digest(login_request.password, ADMIN_PASSWORD)
    if not username_ok or not password_ok:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return schemas.TokenResponse(access_token=create_access_token(login_request.username))

@app.get("/auth/verify")
def verify_token(_: str = Depends(verify_admin)):
    return {"ok": True}

def require_mail_config():
    missing = [
        name for name, value in {
            "SMTP_HOST": SMTP_HOST,
            "SMTP_USERNAME": SMTP_USERNAME,
            "SMTP_PASSWORD": SMTP_PASSWORD,
            "SMTP_FROM": SMTP_FROM,
            "CONTACT_TO": CONTACT_TO,
        }.items()
        if not value
    ]
    if missing:
        raise HTTPException(
            status_code=503,
            detail=f"Email service is not configured. Missing: {', '.join(missing)}"
        )

def build_contact_email(contact_message: schemas.ContactMessage) -> EmailMessage:
    safe_name = html.escape(contact_message.name)
    safe_email = html.escape(contact_message.email)
    safe_message = html.escape(contact_message.message).replace("\n", "<br>")

    email = EmailMessage()
    email["Subject"] = f"New message from {contact_message.name} - CJC Blog"
    email["From"] = f"{SMTP_FROM_NAME} <{SMTP_FROM}>"
    email["To"] = CONTACT_TO
    email["Reply-To"] = contact_message.email
    email.set_content(
        "\n".join([
            "New message from CJC Blog",
            "",
            f"Name: {contact_message.name}",
            f"Email: {contact_message.email}",
            "",
            "Message:",
            contact_message.message,
        ])
    )
    email.add_alternative(
        f"""
        <html>
            <body>
                <h2>New message from CJC Blog</h2>
                <p><strong>Name:</strong> {safe_name}</p>
                <p><strong>Email:</strong> {safe_email}</p>
                <p><strong>Message:</strong></p>
                <p>{safe_message}</p>
            </body>
        </html>
        """,
        subtype="html",
    )
    return email

def send_contact_email(email: EmailMessage):
    context = ssl.create_default_context()
    if SMTP_USE_SSL:
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context, timeout=20) as server:
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(email)
    else:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20) as server:
            if SMTP_USE_STARTTLS:
                server.starttls(context=context)
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(email)

@app.post("/contact/send")
def send_contact_message(contact_message: schemas.ContactMessage):
    if contact_message.website:
        return {"status": "success", "message": "Message has been sent."}

    require_mail_config()
    try:
        send_contact_email(build_contact_email(contact_message))
    except smtplib.SMTPException:
        raise HTTPException(status_code=502, detail="Email provider rejected the message.")
    except OSError:
        raise HTTPException(status_code=502, detail="Email provider is unreachable.")

    return {"status": "success", "message": "Message has been sent."}

@app.post("/articles/", response_model=schemas.Article)
def create_article(article: schemas.ArticleCreate, db: Session = Depends(get_db), _: str = Depends(verify_admin)):
    db_article = models.Article(**article.model_dump())
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

@app.get("/articles/", response_model=List[schemas.Article])
def read_articles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    articles = db.query(models.Article).order_by(models.Article.created_at.desc()).offset(skip).limit(limit).all()
    return articles

@app.get("/articles/{article_id}", response_model=schemas.Article)
def read_article(article_id: int, db: Session = Depends(get_db)):
    db_article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if db_article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return db_article

@app.put("/articles/{article_id}", response_model=schemas.Article)
def update_article(article_id: int, article: schemas.ArticleUpdate, db: Session = Depends(get_db), _: str = Depends(verify_admin)):
    db_article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if db_article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    
    for key, value in article.model_dump().items():
        setattr(db_article, key, value)
        
    db.commit()
    db.refresh(db_article)
    return db_article

@app.delete("/articles/{article_id}")
def delete_article(article_id: int, db: Session = Depends(get_db), _: str = Depends(verify_admin)):
    db_article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if db_article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    db.delete(db_article)
    db.commit()
    return {"message": "Article deleted successfully"}

# --- Projects API ---

@app.post("/projects/", response_model=schemas.Project)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db), _: str = Depends(verify_admin)):
    db_project = models.Project(**project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@app.get("/projects/", response_model=List[schemas.Project])
def read_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    projects = db.query(models.Project).order_by(models.Project.created_at.desc()).offset(skip).limit(limit).all()
    return projects

@app.get("/projects/{project_id}", response_model=schemas.Project)
def read_project(project_id: int, db: Session = Depends(get_db)):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project

@app.put("/projects/{project_id}", response_model=schemas.Project)
def update_project(project_id: int, project: schemas.ProjectUpdate, db: Session = Depends(get_db), _: str = Depends(verify_admin)):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    
    for key, value in project.model_dump().items():
        setattr(db_project, key, value)
        
    db.commit()
    db.refresh(db_project)
    return db_project

@app.delete("/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db), _: str = Depends(verify_admin)):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(db_project)
    db.commit()
    return {"message": "Project deleted successfully"}
