from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
from sqlalchemy.orm import relationship

from app.models.base import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    vendor_id = Column(Integer, ForeignKey("vendors.id"), nullable=False)

    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)

    name = Column(String(200), nullable=False)

    description = Column(Text)

    price = Column(Float, nullable=False)

    stock = Column(Integer, default=0)

    image_url = Column(String, nullable=True)

    vendor = relationship(
    "Vendor",
    back_populates="products")

    category = relationship("Category", back_populates="products")
    
    cart_items = relationship(
    "CartItem",
    back_populates="product",
    cascade="all, delete"
)

order_items = relationship(
    "OrderItem",
    back_populates="product",
    cascade="all, delete"
)

reviews = relationship(
    "Review",
    back_populates="product",
    cascade="all, delete"
)
    
    