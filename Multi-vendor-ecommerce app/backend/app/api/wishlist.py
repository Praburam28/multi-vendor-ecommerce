from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import customer_required

from app.models.wishlist import Wishlist

router = APIRouter(
    prefix="/wishlist",
    tags=["Wishlist"]
)

@router.get("/")
def get_wishlist(
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):
    return (
        db.query(Wishlist)
        .filter(
            Wishlist.user_id == current_user.id
        )
        .all()
    )


@router.post("/{product_id}")
def add_wishlist(
    product_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):

    exists = (
        db.query(Wishlist)
        .filter(
            Wishlist.user_id == current_user.id,
            Wishlist.product_id == product_id
        )
        .first()
    )

    if exists:
        raise HTTPException(
            status_code=400,
            detail="Already in wishlist"
        )

    item = Wishlist(
        user_id=current_user.id,
        product_id=product_id
    )

    db.add(item)

    db.commit()

    return {"message": "Added to wishlist"}


@router.delete("/{product_id}")
def remove_wishlist(
    product_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):

    item = (
        db.query(Wishlist)
        .filter(
            Wishlist.user_id == current_user.id,
            Wishlist.product_id == product_id
        )
        .first()
    )

    if item:
        db.delete(item)
        db.commit()

    return {"message": "Removed"}