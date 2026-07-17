from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import admin_required
from app.models.vendor import Vendor

router = APIRouter(
    prefix="/admin/vendors",
    tags=["Admin Vendors"]
)

@router.get("/")
def get_vendors(
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return db.query(Vendor).all()

@router.patch("/{vendor_id}/approve")
def approve_vendor(
    vendor_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()

    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")

    vendor.is_approved = True
    db.commit()

    return {"message": "Vendor approved"}

@router.patch("/{vendor_id}/reject")
def reject_vendor(
    vendor_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()

    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")

    vendor.is_approved = False
    db.commit()

    return {"message": "Vendor rejected"}