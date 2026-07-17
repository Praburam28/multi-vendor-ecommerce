from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from app.models.base import Base


class Vendor(Base):
    __tablename__ = "vendors"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), unique=True)

    store_name = Column(String, nullable=False)

    phone = Column(String)

    address = Column(String)

    approved = Column(Boolean, default=False)

    user = relationship(
        "User",
        back_populates="vendor"
    )

    products = relationship(
        "Product",
        back_populates="vendor",
        cascade="all, delete-orphan"
    )

    orders = relationship(
        "VendorOrder",
        back_populates="vendor",
        cascade="all, delete-orphan"
    )