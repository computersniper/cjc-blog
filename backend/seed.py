import sqlite3
import datetime

conn = sqlite3.connect("blog.db")
c = conn.cursor()

articles = [
    (
        "Design and analysis of a dynamic programming algorithm to solve the MCS problem",
        "Algorithm",
        "There are many ways to solve the minimum subarray problem, here we use the idea of dynamic programming to solve it.",
        "blog/read_daa/1.png",
        "blog/read_daa/read.html",
        "2024-06-27 10:00:00"
    ),
    (
        "The worst linear time algorithm?",
        "Algorithm",
        "Try to write a linear time algorithm to find the kth largest element in an array. But why our linear time algorithm only beats 5 percent of similar algorithms?",
        "blog/kth-largest-element-in-an-array/img/cover.png",
        "blog/kth-largest-element-in-an-array/read.html",
        "2024-07-03 10:00:00"
    ),
    (
        "Building an Android Movie Collection App",
        "Software Engineering",
        "a comprehensive movie collection application that enables users to search, favorite, display, and manage movie information with dynamic data loading. Built with modern Android technologies, the app delivers a responsive and seamless user experience.",
        "blog/android-movie-app/img/icon.jpg",
        "blog/android-movie-app/read.html",
        "2025-11-14 10:00:00"
    )
]

c.execute("""
CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255),
    category VARCHAR(100),
    summary TEXT,
    content TEXT,
    cover_image VARCHAR(255),
    created_at DATETIME,
    read_url VARCHAR(255)
)
""")

c.execute("""
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255),
    category VARCHAR(100),
    summary TEXT,
    content TEXT,
    cover_image VARCHAR(255),
    tech_stack VARCHAR(255),
    created_at DATETIME
)
""")

# clear existing
c.execute("DELETE FROM articles")
c.execute("DELETE FROM projects")

for art in articles:
    c.execute("""
    INSERT INTO articles (title, category, summary, cover_image, read_url, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
    """, art)

projects = [
    (
        "MathTasks Intelligent Production Platform",
        "Web",
        "5-role full-link collaboration based on FSM & RBAC, solving concurrent routing conflicts. Built a 30+ field question bank model. Async task queues for difficulty evaluation.",
        "work/work1/cover.png",
        "Python, FastAPI, Next.js, PostgreSQL, Vector Search",
        "2026-01-10 10:00:00",
        "<p>Full details about MathTasks Intelligent Production Platform.</p>"
    ),
    (
        "Enterprise LLM Unified Gateway",
        "Software",
        "Unified access to 8+ vendors and 20+ models. Configured multi-key load balancing and Failover. Optimized long-running inference connections.",
        "work/work2/1.png",
        "Python, LiteLLM, Docker, PostgreSQL, Redis",
        "2026-02-10 10:00:00",
        "<p>Full details about Enterprise LLM Unified Gateway & API Management.</p>"
    )
]

for proj in projects:
    c.execute("""
    INSERT INTO projects (title, category, summary, cover_image, tech_stack, created_at, content)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, proj)

conn.commit()
conn.close()
print("Database seeded!")
