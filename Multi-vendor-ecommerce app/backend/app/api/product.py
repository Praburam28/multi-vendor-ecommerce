from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import vendor_required
from app.models.vendor import Vendor
from app.models.product import Product
from app.schemas.product import (
    ProductCreate,
    ProductUpdate,
    ProductResponse
)

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.post("/", response_model=ProductResponse)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user=Depends(vendor_required)
):

    vendor = db.query(Vendor).filter(
        Vendor.user_id == current_user.id
    ).first()

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor profile not found"
        )

    new_product = Product(
        vendor_id=vendor.id,
        category_id=product.category_id,
        name=product.name,
        description=product.description,
        price=product.price,
        stock=product.stock,
        image_url=product.image_url
    )

    db.add(new_product)

    db.commit()

    db.refresh(new_product)

    return new_product


@router.get("/", response_model=list[ProductResponse])
def get_products(
    search: str | None = Query(None),
    category_id: int | None = Query(None),
    min_price: float | None = Query(None),
    max_price: float | None = Query(None),
    in_stock: bool | None = Query(None),
    sort: str | None = Query("id"),
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):

    query = db.query(Product)

    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))

    if category_id:
        query = query.filter(Product.category_id == category_id)

    if min_price is not None:
        query = query.filter(Product.price >= min_price)

    if max_price is not None:
        query = query.filter(Product.price <= max_price)

    if in_stock:
        query = query.filter(Product.stock > 0)

    if sort == "price":
        query = query.order_by(Product.price)

    elif sort == "name":
        query = query.order_by(Product.name)

    else:
        query = query.order_by(Product.id)

    offset = (page - 1) * size

    products = query.offset(offset).limit(size).all()

    return products

@router.get("/{product_id}", response_model=ProductResponse)
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product

@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(vendor_required)
):

    vendor = db.query(Vendor).filter(
        Vendor.user_id == current_user.id
    ).first()

    db_product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not db_product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    if db_product.vendor_id != vendor.id:
        raise HTTPException(
            status_code=403,
            detail="You can only update your own products"
        )

    db_product.category_id = product.category_id
    db_product.name = product.name
    db_product.description = product.description
    db_product.price = product.price
    db_product.stock = product.stock
    db_product.image_url = product.image_url

    db.commit()
    db.refresh(db_product)

    return db_product

@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(vendor_required)
):

    vendor = db.query(Vendor).filter(
        Vendor.user_id == current_user.id
    ).first()

    db_product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not db_product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    if db_product.vendor_id != vendor.id:
        raise HTTPException(
            status_code=403,
            detail="You can only delete your own products"
        )

    db.delete(db_product)
    db.commit()

    return {
        "message": "Product deleted successfully"
    }