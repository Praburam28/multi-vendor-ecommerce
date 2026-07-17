from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import customer_required
from app.models.cart import Cart
from app.models.cart_item import CartItem
from app.models.product import Product
from app.schemas.cart import AddCartItem, UpdateCartItem

router = APIRouter(
    prefix="/cart",
    tags=["Shopping Cart"]
)


# Add Product to Cart
@router.post("/add")
def add_to_cart(
    item: AddCartItem,
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):
    product = db.query(Product).filter(
        Product.id == item.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    if product.stock < item.quantity:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock"
        )

    cart = db.query(Cart).filter(
        Cart.customer_id == current_user.id
    ).first()

    if not cart:
        cart = Cart(customer_id=current_user.id)

        db.add(cart)
        db.commit()
        db.refresh(cart)

    existing_item = db.query(CartItem).filter(
        CartItem.cart_id == cart.id,
        CartItem.product_id == item.product_id
    ).first()

    if existing_item:
        existing_item.quantity += item.quantity

    else:
        cart_item = CartItem(
            cart_id=cart.id,
            product_id=item.product_id,
            quantity=item.quantity
        )

        db.add(cart_item)

    db.commit()

    return {
        "message": "Item added to cart successfully"
    }


# View Cart
@router.get("/")
def view_cart(
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):
    cart = db.query(Cart).filter(
        Cart.customer_id == current_user.id
    ).first()

    if not cart:
        return {
            "items": [],
            "total": 0
        }

    items = []
    total = 0

    for item in cart.items:

        subtotal = item.product.price * item.quantity

        total += subtotal

        items.append({
    "cart_item_id": item.id,
    "product_id": item.product.id,
    "product_name": item.product.name,
    "image_url": item.product.image_url,   # <-- ADD THIS
    "price": item.product.price,
    "quantity": item.quantity,
    "subtotal": item.product.price * item.quantity
})

    return {
        "items": items,
        "total": total
    }


# Update Quantity
@router.put("/{item_id}")
def update_cart_item(
    item_id: int,
    update: UpdateCartItem,
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):
    item = db.query(CartItem).filter(
        CartItem.id == item_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )

    item.quantity = update.quantity

    db.commit()

    return {
        "message": "Quantity updated successfully"
    }


# Remove Item
@router.delete("/{item_id}")
def remove_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):
    item = db.query(CartItem).filter(
        CartItem.id == item_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Item not found"
        )

    db.delete(item)

    db.commit()

    return {
        "message": "Item removed successfully"
    }