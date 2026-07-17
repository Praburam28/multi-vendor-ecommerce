from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.database import get_db
from app.dependencies.auth import vendor_required

from app.models.vendor import Vendor
from app.models.product import Product
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.user import User

router = APIRouter(
    prefix="/vendor/dashboard",
    tags=["Vendor Dashboard"]
)

@router.get("/")
def dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(vendor_required)
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.user_id == current_user.id)
        .first()
    )

    total_products = (
        db.query(Product)
        .filter(Product.vendor_id == vendor.id)
        .count()
    )

    total_orders = (
        db.query(OrderItem)
        .join(Product)
        .filter(Product.vendor_id == vendor.id)
        .count()
    )

    revenue = (
        db.query(func.sum(OrderItem.price * OrderItem.quantity))
        .join(Product)
        .filter(Product.vendor_id == vendor.id)
        .scalar()
    )

    low_stock = (
        db.query(Product)
        .filter(
            Product.vendor_id == vendor.id,
            Product.stock < 5
        )
        .all()
    )

    return {
        "total_products": total_products,
        "total_orders": total_orders,
        "total_customers": 0,
        "total_revenue": revenue or 0,
        "low_stock": low_stock
    }