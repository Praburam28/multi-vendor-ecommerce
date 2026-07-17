from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import customer_required

from app.models.review import Review
from app.models.product import Product

from app.schemas.review import (
    ReviewCreate,
    ReviewUpdate,
    ReviewResponse
)

router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"]
)


@router.post("/", response_model=ReviewResponse)
def create_review(
    review: ReviewCreate,
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):

    product = db.query(Product).filter(
        Product.id == review.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    existing = db.query(Review).filter(
        Review.product_id == review.product_id,
        Review.customer_id == current_user.id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Review already exists"
        )

    new_review = Review(
        product_id=review.product_id,
        customer_id=current_user.id,
        rating=review.rating,
        comment=review.comment
    )

    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    return new_review


@router.get("/product/{product_id}")
def get_reviews(
    product_id: int,
    db: Session = Depends(get_db)
):

    reviews = db.query(Review).filter(
        Review.product_id == product_id
    ).all()

    average = db.query(
        func.avg(Review.rating)
    ).filter(
        Review.product_id == product_id
    ).scalar()

    return {
        "average_rating": round(average or 0, 2),
        "reviews": reviews
    }


@router.put("/{review_id}")
def update_review(
    review_id: int,
    review: ReviewUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):

    db_review = db.query(Review).filter(
        Review.id == review_id,
        Review.customer_id == current_user.id
    ).first()

    if not db_review:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    db_review.rating = review.rating
    db_review.comment = review.comment

    db.commit()

    return {
        "message": "Review updated successfully"
    }


@router.delete("/{review_id}")
def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):

    db_review = db.query(Review).filter(
        Review.id == review_id,
        Review.customer_id == current_user.id
    ).first()

    if not db_review:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    db.delete(db_review)
    db.commit()

    return {
        "message": "Review deleted successfully"
    }