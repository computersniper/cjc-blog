import sqlite3

from backend.backfill_article_content import backfill, extract_language_blocks


def test_extract_and_backfill_is_idempotent(tmp_path):
    frontend = tmp_path / "frontend"
    article = frontend / "blog" / "sample" / "read.html"
    article.parent.mkdir(parents=True)
    article.write_text(
        '<div class="article-lang-en"><h2>English</h2><img src="img/a.png"></div>'
        '<div class="article-lang-zh"><h2>Chinese</h2><p>Body</p></div>',
        encoding="utf-8",
    )
    english, chinese = extract_language_blocks(article)
    assert "English" in english
    assert "Chinese" in chinese

    db = tmp_path / "blog.db"
    connection = sqlite3.connect(db)
    connection.execute(
        "CREATE TABLE articles (id INTEGER PRIMARY KEY, read_url TEXT, content TEXT, content_zh TEXT)"
    )
    connection.execute(
        "INSERT INTO articles VALUES (1, 'blog/sample/read.html', '', '')"
    )
    connection.commit()
    connection.close()

    assert backfill(db, frontend) == 1
    assert backfill(db, frontend) == 0
    connection = sqlite3.connect(db)
    row = connection.execute("SELECT content, content_zh FROM articles WHERE id = 1").fetchone()
    connection.close()
    assert "English" in row[0]
    assert "Chinese" in row[1]
