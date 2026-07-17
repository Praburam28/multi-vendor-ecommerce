from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import vendor_required

from app.models.vendor import Vendor
from app.models.vendor_order import VendorOrder

router = APIRouter(
    prefix="/vendor/orders",
    tags=["Vendor Orders"]
)

@router.get("/")
def get_vendor_orders(
    db: Session = Depends(get_db),
    current_user=Depends(vendor_required)
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.user_id == current_user.id)
        .first()
    )

    return (
        db.query(VendorOrder)
        .filter(VendorOrder.vendor_id == vendor.id)
        .all()
    )