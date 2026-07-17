from faker import Faker
import random

from app.database.database import SessionLocal
from app.models.user import User
from app.models.vendor import Vendor

fake = Faker("en_IN")

db = SessionLocal()

def create_admin():
    admin = db.query(User).filter(
        User.email == "admin@multivendor.com"
    ).first()

    if admin:
        return admin

    admin = User(
        full_name="System Administrator",
        email="admin@multivendor.com",
        password="admin123",
        role="admin",
        is_active=True,
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)

    print("✔ Admin Created")

    return admin

STORE_NAMES = [
    "Tech World",
    "Fashion Hub",
    "Sports Zone",
    "Home Essentials",
    "Digital Store",
]

def create_vendors():
    for i in range(5):

        email = f"vendor{i+1}@multivendor.com"

        exists = db.query(User).filter(
            User.email == email
        ).first()

        if exists:
            continue

        user = User(
            full_name=fake.name(),
            email=email,
            password="vendor123",
            role="vendor",
            is_active=True,
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        vendor = Vendor(
            user_id=user.id,
            store_name=STORE_NAMES[i],
            phone=fake.phone_number(),
            address=fake.address(),
            approved=True,
        )

        db.add(vendor)
        db.commit()

    print("✔ Vendors Created")
    
def create_customers():

    for i in range(20):

        email = f"customer{i+1}@gmail.com"

        exists = db.query(User).filter(
            User.email == email
        ).first()

        if exists:
            continue

        customer = User(
            full_name=fake.name(),
            email=email,
            password="customer123",
            role="customer",
            is_active=True,
        )

        db.add(customer)

    db.commit()

    print("✔ Customers Created")
    
def main():
    create_admin()
    create_vendors()
    create_customers()

    print("Users Seeded Successfully")


if __name__ == "__main__":
    main()