from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import (
    get_current_user,
    admin_required,
    vendor_required,
)
from app.models.user import User
from app.models.vendor import Vendor
from app.schemas.vendor import (
    VendorCreate,
    VendorResponse
)

from sqlalchemy import func

from app.models.product import Product
from app.models.vendor import Vendor
from app.models.vendor_order import VendorOrder


router = APIRouter(
    prefix="/vendors",
    tags=["Vendor"]
)


@router.post("/", response_model=VendorResponse)
def create_vendor(
    vendor: VendorCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != "Vendor":
        raise HTTPException(
            status_code=403,
            detail="Only vendor users can create a vendor profile"
        )

    existing = db.query(Vendor).filter(
        Vendor.user_id == current_user.id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Vendor profile already exists"
        )

    new_vendor = Vendor(
        user_id=current_user.id,
        store_name=vendor.store_name,
        phone=vendor.phone,
        address=vendor.address
    )

    db.add(new_vendor)
    db.commit()
    db.refresh(new_vendor)

    return new_vendor


@router.get("/me", response_model=VendorResponse)
def get_my_vendor(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    vendor = db.query(Vendor).filter(
        Vendor.user_id == current_user.id
    ).first()

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor profile not found"
        )

    return vendor


@router.get("/")
def get_all_vendors(
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return db.query(Vendor).all()



@router.get("/dashboard")
def vendor_dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(vendor_required),
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.user_id == current_user.id)
        .first()
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found"
        )

    total_products = (
        db.query(Product)
        .filter(Product.vendor_id == vendor.id)
        .count()
    )

    total_orders = (
        db.query(VendorOrder)
        .filter(VendorOrder.vendor_id == vendor.id)
        .count()
    )

    total_revenue = (
        db.query(func.sum(VendorOrder.total_amount))
        .filter(
            VendorOrder.vendor_id == vendor.id,
            VendorOrder.status == "Delivered"
        )
        .scalar()
    ) or 0

    pending_orders = (
        db.query(VendorOrder)
        .filter(
            VendorOrder.vendor_id == vendor.id,
            VendorOrder.status == "Pending"
        )
        .count()
    )

    shipped_orders = (
        db.query(VendorOrder)
        .filter(
            VendorOrder.vendor_id == vendor.id,
            VendorOrder.status == "Shipped"
        )
        .count()
    )

    delivered_orders = (
        db.query(VendorOrder)
        .filter(
            VendorOrder.vendor_id == vendor.id,
            VendorOrder.status == "Delivered"
        )
        .count()
    )

    low_stock = (
        db.query(Product)
        .filter(
            Product.vendor_id == vendor.id,
            Product.stock < 10
        )
        .count()
    )

    latest_orders = (
        db.query(VendorOrder)
        .filter(VendorOrder.vendor_id == vendor.id)
        .order_by(VendorOrder.id.desc())
        .limit(5)
        .all()
    )

    return {
        "products": total_products,
        "orders": total_orders,
        "revenue": round(total_revenue, 2),
        "pending": pending_orders,
        "shipped": shipped_orders,
        "delivered": delivered_orders,
        "low_stock": low_stock,
        "latest_orders": [
            {
                "id": order.id,
                "status": order.status,
                "amount": order.total_amount
            }
            for order in latest_orders
        ]
    }