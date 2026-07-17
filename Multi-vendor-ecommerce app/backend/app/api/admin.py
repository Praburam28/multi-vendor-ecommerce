from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import admin_required

from app.models.user import User
from app.models.vendor import Vendor
from app.models.product import Product
from app.models.category import Category
from app.models.order import Order
from app.models.vendor_order import VendorOrder

router = APIRouter(
    prefix="/admin",
    tags=["Admin Dashboard"]
)


@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):

    total_users = db.query(User).count()

    total_vendors = db.query(Vendor).count()

    total_customers = db.query(User).filter(
        User.role == "Customer"
    ).count()

    total_products = db.query(Product).count()

    total_categories = db.query(Category).count()

    total_orders = db.query(Order).count()

    total_revenue = (
        db.query(func.sum(Order.total_amount))
        .filter(Order.payment_status == "Paid")
        .scalar()
    ) or 0

    pending_orders = db.query(VendorOrder).filter(
        VendorOrder.status == "Pending"
    ).count()

    paid_orders = db.query(VendorOrder).filter(
        VendorOrder.status == "Paid"
    ).count()

    shipped_orders = db.query(VendorOrder).filter(
        VendorOrder.status == "Shipped"
    ).count()

    delivered_orders = db.query(VendorOrder).filter(
        VendorOrder.status == "Delivered"
    ).count()

    approved_vendors = db.query(Vendor).filter(
        Vendor.approved == True
    ).count()

    low_stock_products = db.query(Product).filter(
        Product.stock < 10
    ).count()

    average_order_value = (
        db.query(func.avg(Order.total_amount))
        .filter(Order.payment_status == "Paid")
        .scalar()
    ) or 0

    latest_orders = (
        db.query(Order)
        .order_by(Order.id.desc())
        .limit(10)
        .all()
    )

    latest_orders_data = [
        {
            "id": order.id,
            "total_amount": order.total_amount,
            "payment_status": order.payment_status,
            "status": order.status,
        }
        for order in latest_orders
    ]

    return {
        "users": total_users,
        "vendors": total_vendors,
        "customers": total_customers,
        "products": total_products,
        "categories": total_categories,
        "orders": total_orders,
        "revenue": round(total_revenue, 2),

        "pending_orders": pending_orders,
        "paid_orders": paid_orders,
        "shipped_orders": shipped_orders,
        "delivered_orders": delivered_orders,

        "approved_vendors": approved_vendors,
        "low_stock_products": low_stock_products,
        "average_order_value": round(average_order_value, 2),

        "latest_orders": latest_orders_data,

        "system_health": "Excellent"
    }
