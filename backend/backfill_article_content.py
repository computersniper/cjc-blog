"""Move legacy static article bodies into the canonical article database.

The migration is idempotent: it fills only missing language bodies unless
``--force`` is passed. It uses only the Python standard library so it can run on
the production host without adding a deployment dependency.
"""

from __future__ import annotations

import argparse
import sqlite3
from html.parser import HTMLParser
from pathlib import Path


VOID_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link",
    "meta", "param", "source", "track", "wbr",
}


class LanguageBlockExtractor(HTMLParser):
    """Capture inner HTML from article-lang-en and article-lang-zh blocks."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=False)
        self.blocks = {"en": [], "zh": []}
        self.active: str | None = None
        self.depth = 0

    @staticmethod
    def _language(attrs: list[tuple[str, str | None]]) -> str | None:
        classes = dict(attrs).get("class") or ""
        tokens = set(classes.split())
        if "article-lang-en" in tokens:
            return "en"
        if "article-lang-zh" in tokens:
            return "zh"
        return None

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if self.active:
            self.blocks[self.active].append(self.get_starttag_text())
            if tag not in VOID_TAGS:
                self.depth += 1
            return
        language = self._language(attrs)
        if language:
            self.active = language
            self.depth = 1

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if self.active:
            self.blocks[self.active].append(self.get_starttag_text())

    def handle_endtag(self, tag: str) -> None:
        if not self.active:
            return
        self.depth -= 1
        if self.depth == 0:
            self.active = None
        else:
            self.blocks[self.active].append(f"</{tag}>")

    def handle_data(self, data: str) -> None:
        if self.active:
            self.blocks[self.active].append(data)

    def handle_entityref(self, name: str) -> None:
        if self.active:
            self.blocks[self.active].append(f"&{name};")

    def handle_charref(self, name: str) -> None:
        if self.active:
            self.blocks[self.active].append(f"&#{name};")

    def handle_comment(self, data: str) -> None:
        if self.active:
            self.blocks[self.active].append(f"<!--{data}-->")


def extract_language_blocks(path: Path) -> tuple[str, str]:
    parser = LanguageBlockExtractor()
    parser.feed(path.read_text(encoding="utf-8", errors="replace"))
    return "".join(parser.blocks["en"]).strip(), "".join(parser.blocks["zh"]).strip()


def backfill(db_path: Path, frontend_root: Path, force: bool = False) -> int:
    connection = sqlite3.connect(db_path)
    connection.row_factory = sqlite3.Row
    updated = 0
    try:
        rows = connection.execute(
            "SELECT id, read_url, content, content_zh FROM articles "
            "WHERE read_url IS NOT NULL AND TRIM(read_url) NOT IN ('', '#')"
        ).fetchall()
        for row in rows:
            article_path = frontend_root / str(row["read_url"]).lstrip("/\\")
            if not article_path.is_file():
                continue
            content, content_zh = extract_language_blocks(article_path)
            next_content = content if force or not (row["content"] or "").strip() else row["content"]
            next_content_zh = content_zh if force or not (row["content_zh"] or "").strip() else row["content_zh"]
            if next_content == row["content"] and next_content_zh == row["content_zh"]:
                continue
            connection.execute(
                "UPDATE articles SET content = ?, content_zh = ? WHERE id = ?",
                (next_content, next_content_zh, row["id"]),
            )
            updated += 1
        connection.commit()
    finally:
        connection.close()
    return updated


def main() -> None:
    backend_root = Path(__file__).resolve().parent
    parser = argparse.ArgumentParser()
    parser.add_argument("--db", type=Path, default=backend_root / "blog.db")
    parser.add_argument("--frontend", type=Path, default=backend_root.parent / "frontend")
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()
    count = backfill(args.db.resolve(), args.frontend.resolve(), args.force)
    print(f"Backfilled {count} article record(s).")


if __name__ == "__main__":
    main()
