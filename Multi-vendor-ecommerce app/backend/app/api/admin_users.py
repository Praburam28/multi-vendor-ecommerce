from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import admin_required
from app.models.user import User

router = APIRouter(
    prefix="/admin/users",
    tags=["Admin Users"]
)

@router.get("/")
def get_users(
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return db.query(User).all()