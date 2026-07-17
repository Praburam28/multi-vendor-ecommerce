from pydantic import BaseModel, Field


class ReviewCreate(BaseModel):
    product_id: int
    rating: int = Field(..., ge=1, le=5)
    comment: str


class ReviewUpdate(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    comment: str


class ReviewResponse(BaseModel):
    id: int
    product_id: int
    customer_id: int
    rating: int
    comment: str | None

    model_config = {
        "from_attributes": True
    }