from pydantic import BaseModel


class OrderResponse(BaseModel):
    id: int
    total_amount: float
    payment_status: str

    model_config = {
        "from_attributes": True
    }