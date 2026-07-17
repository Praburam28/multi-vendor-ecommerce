from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import customer_required
from app.models.order import Order

router = APIRouter(
    prefix="/my-orders",
    tags=["Customer Orders"]
)

@router.get("/")
def my_orders(
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):
    return (
        db.query(Order)
        .filter(Order.user_id == current_user.id)
        .all()
    )