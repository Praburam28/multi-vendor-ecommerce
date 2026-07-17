from sqlalchemy import Column, Integer, ForeignKey, String, Float
from sqlalchemy.orm import relationship

from app.models.base import Base


class VendorOrder(Base):
    __tablename__ = "vendor_orders"

    id = Column(Integer, primary_key=True, index=True)

    order_id = Column(Integer, ForeignKey("orders.id"))

    vendor_id = Column(Integer, ForeignKey("vendors.id"))

    status = Column(String, default="Pending")

    total_amount = Column(Float, default=0)

    order = relationship(
        "Order",
        back_populates="vendor_orders"
    )

    vendor = relationship(
        "Vendor",
        back_populates="orders"
    )

    items = relationship(
        "OrderItem",
        back_populates="vendor_order",
        cascade="all, delete-orphan"
    )