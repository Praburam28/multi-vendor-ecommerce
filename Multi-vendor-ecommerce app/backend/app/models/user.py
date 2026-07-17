from sqlalchemy import Column, Integer, String, Boolean

from app.models.base import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False, index=True)

    password = Column(String, nullable=False)

    role = Column(String, nullable=False)

    is_active = Column(Boolean, default=True)
    
    vendor = relationship(
    "Vendor",
    back_populates="user",
    uselist=False)
    
    cart = relationship(
    "Cart",
    back_populates="customer",
    uselist=False )
    
    orders = relationship(
    "Order",
    back_populates="customer",
    cascade="all, delete-orphan",)
    
    
    