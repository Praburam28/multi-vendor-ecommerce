from pydantic import BaseModel


class VendorCreate(BaseModel):
    store_name: str
    phone: str
    address: str


class VendorResponse(BaseModel):
    id: int
    store_name: str
    phone: str
    address: str
    approved: bool

    model_config = {
        "from_attributes": True
    }