import sqlite3

db_path = "ecommerce.db"

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

def add_column(table, column_sql):
    try:
        cursor.execute(f"ALTER TABLE {table} ADD COLUMN {column_sql}")
        print(f"✅ Added: {column_sql}")
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e).lower():
            print(f"ℹ️ Column already exists: {column_sql}")
        else:
            print(f"❌ {e}")

# Orders table
add_column("orders", "transaction_id TEXT")
add_column("orders", "payment_method TEXT")

conn.commit()
conn.close()

print("🎉 Database updated successfully.")