from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.models.base import Base


class Cart(Base):
    __tablename__ = "carts"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(Integer, ForeignKey("users.id"), unique=True)

    customer = relationship(
    "User",
    back_populates="cart" )

    items = relationship(
    "CartItem",
    back_populates="cart",
    cascade="all, delete-orphan",)
    
    
    