from pydantic import BaseModel


class AddCartItem(BaseModel):
    product_id: int
    quantity: int


class UpdateCartItem(BaseModel):
    quantity: int