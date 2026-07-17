from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.models.base import Base


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)

    vendor_order_id = Column(
        Integer,
        ForeignKey("vendor_orders.id")
    )

    product_id = Column(
        Integer,
        ForeignKey("products.id")
    )

    quantity = Column(Integer)

    price = Column(Float)

    vendor_order = relationship(
        "VendorOrder",
        back_populates="items"
    )

    product = relationship("Product")