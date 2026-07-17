from pydantic import BaseModel


class ProductCreate(BaseModel):
    category_id: int
    name: str
    description: str
    price: float
    stock: int
    image_url: str | None = None


class ProductUpdate(BaseModel):
    category_id: int
    name: str
    description: str
    price: float
    stock: int
    image_url: str | None = None


class ProductResponse(BaseModel):
    id: int
    vendor_id: int
    category_id: int
    name: str
    description: str
    price: float
    stock: int
    image_url: str | None

    model_config = {
        "from_attributes": True
    }