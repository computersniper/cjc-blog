from pydantic import BaseModel, Field, field_validator
from typing import Optional
import datetime
from email.utils import parseaddr

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class ContactMessage(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=3, max_length=254)
    message: str = Field(..., min_length=1, max_length=5000)
    website: Optional[str] = Field(default="", max_length=200)

    @field_validator("name", "email", "message", "website")
    @classmethod
    def strip_text(cls, value: str) -> str:
        return value.strip() if value else ""

    @field_validator("name", "email")
    @classmethod
    def reject_header_breaks(cls, value: str) -> str:
        if "\r" in value or "\n" in value:
            raise ValueError("Invalid input")
        return value

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        parsed_name, parsed_email = parseaddr(value)
        if parsed_name or parsed_email != value or "@" not in parsed_email:
            raise ValueError("Invalid email address")
        return value

class ArticleBase(BaseModel):
    title: str
    title_zh: Optional[str] = ""
    category: str
    summary: str
    summary_zh: Optional[str] = ""
    content: Optional[str] = None
    content_zh: Optional[str] = ""
    cover_image: str
    read_url: Optional[str] = "#"

class ArticleCreate(ArticleBase):
    pass

class ArticleUpdate(ArticleBase):
    pass

class Article(ArticleBase):
    id: int
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    title: str
    title_zh: Optional[str] = ""
    category: str
    summary: str
    summary_zh: Optional[str] = ""
    content: Optional[str] = None
    content_zh: Optional[str] = ""
    cover_image: str
    tech_stack: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    created_at: datetime.datetime

    class Config:
        from_attributes = True
