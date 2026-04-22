from pydantic import BaseModel
from typing import Optional
import datetime

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
