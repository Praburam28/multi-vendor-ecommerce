from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship

from app.models.base import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    total_amount = Column(Float, default=0)

    payment_status = Column(String, default="Pending")
    
    status = Column(String, default="Pending")

    customer = relationship(
    "User",
    back_populates="orders",)
    

    vendor_orders = relationship(
        "VendorOrder",
        back_populates="order",
        cascade="all, delete-orphan"
    )
    
    transaction_id = Column(String, nullable=True)
    payment_method = Column(String, nullable=True)
