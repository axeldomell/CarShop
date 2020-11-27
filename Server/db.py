import sqlite3

conn = sqlite3.connect("cars.sqlite")

cursor = conn.cursor()

sql_query = """CREATE TABLE employees(
    id integer PRIMARY KEY,
    name text NOT NULL
)"""

cursor.execute(sql_query)
