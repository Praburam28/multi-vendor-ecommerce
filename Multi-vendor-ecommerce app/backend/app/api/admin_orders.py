from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import admin_required
from app.models.order import Order

router = APIRouter(
    prefix="/admin/orders",
    tags=["Admin Orders"]
)

@router.get("/")
def get_orders(
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return db.query(Order).all()