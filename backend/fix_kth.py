import sqlite3
conn = sqlite3.connect("blog.db")
conn.execute("UPDATE articles SET read_url='blog/kth-largest-element-in-an-array/read.html' WHERE id=2")
conn.commit()
conn.close()
print("done")
