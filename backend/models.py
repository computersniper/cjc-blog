from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import declarative_base
import datetime

Base = declarative_base()

class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    title_zh = Column(String(255), default="")
    category = Column(String(100), index=True)
    summary = Column(Text)
    summary_zh = Column(Text, default="")
    content = Column(Text)
    content_zh = Column(Text, default="")
    cover_image = Column(String(255))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    read_url = Column(String(255), default="#")

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    title_zh = Column(String(255), default="")
    category = Column(String(100), index=True)
    summary = Column(Text)
    summary_zh = Column(Text, default="")
    content = Column(Text)  # HTML from WYSIWYG
    content_zh = Column(Text, default="")
    cover_image = Column(String(255))
    tech_stack = Column(String(255))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

