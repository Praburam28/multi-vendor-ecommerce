from collections import defaultdict

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi import Query

from app.database.database import get_db
from app.dependencies.auth import (
    customer_required,
    vendor_required,
    admin_required,
)

from app.models.cart import Cart
from app.models.cart_item import CartItem
from app.models.order import Order
from app.models.vendor_order import VendorOrder
from app.models.order_item import OrderItem
from app.models.product import Product
from app.models.vendor import Vendor

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


# ===========================
# CHECKOUT
# ===========================

@router.post("/checkout")
def checkout(
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):
    cart = (
        db.query(Cart)
        .filter(Cart.customer_id == current_user.id)
        .first()
    )

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    if not cart.items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    total_amount = 0

    # Validate stock
    for item in cart.items:
        if item.product.stock < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"{item.product.name} has only {item.product.stock} item(s) left."
            )

        total_amount += item.product.price * item.quantity

    try:
        # Master Order
        master_order = Order(
            customer_id=current_user.id,
            total_amount=total_amount,
            payment_status="Pending",
            status="Pending"
        )

        db.add(master_order)
        db.flush()

        vendor_groups = defaultdict(list)

        for item in cart.items:
            vendor_groups[item.product.vendor_id].append(item)

        # Vendor Orders
        for vendor_id, items in vendor_groups.items():

            vendor_total = sum(
                i.product.price * i.quantity
                for i in items
            )

            vendor_order = VendorOrder(
                order_id=master_order.id,
                vendor_id=vendor_id,
                total_amount=vendor_total,
                status="Pending"
            )

            db.add(vendor_order)
            db.flush()

            for item in items:

                db.add(
                    OrderItem(
                        vendor_order_id=vendor_order.id,
                        product_id=item.product.id,
                        quantity=item.quantity,
                        price=item.product.price
                    )
                )

                item.product.stock -= item.quantity

        db.query(CartItem).filter(
            CartItem.cart_id == cart.id
        ).delete()

        db.commit()
        db.refresh(master_order)

        return {
            "message": "Order placed successfully",
            "order_id": master_order.id,
            "total_amount": master_order.total_amount,
            "payment_status": master_order.payment_status
        }

    except Exception:
        db.rollback()
        raise
    
    
# ===========================
# CUSTOMER ORDERS
# ===========================

@router.get("/my-orders")
def my_orders(
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):

    orders = db.query(Order).filter(
        Order.customer_id == current_user.id
    ).all()

    return orders


@router.get("/my-orders")
def my_orders(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    status: str | None = None,
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):

    query = db.query(Order).filter(
        Order.customer_id == current_user.id
    )

    if status:
        query = query.filter(Order.status == status)

    total = query.count()

    orders = (
        query
        .order_by(Order.id.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "orders": [
            {
                "id": order.id,
                "status": order.status,
                "payment_status": order.payment_status,
                "total_amount": order.total_amount,
            }
            for order in orders
        ]
    }

# ===========================
# VENDOR ORDERS
# ===========================

@router.get("/vendor-orders")
def vendor_orders(
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

    orders = db.query(VendorOrder).filter(
        VendorOrder.vendor_id == vendor.id
    ).all()

    return [
    {
        "vendor_order_id": order.id,
        "master_order_id": order.order_id,
        "status": order.status,
        "total_amount": order.total_amount,
        "items": len(order.items)
    }
    for order in orders
]

# ===========================
# ORDER DETAILS
# ===========================

@router.get("/invoice/{order_id}")
def invoice(
    order_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):

    order = (
        db.query(Order)
        .filter(
            Order.id == order_id,
            Order.customer_id == current_user.id
        )
        .first()
    )

    if not order:
        raise HTTPException(404, "Order not found")

    return {
        "invoice_number": f"INV-{order.id:06}",
        "order_id": order.id,
        "customer": current_user.full_name,
        "total": order.total_amount,
        "payment_status": order.payment_status,
        "status": order.status,
    }

# ===========================
# UPDATE ORDER STATUS
# ===========================

@router.patch("/{vendor_order_id}/status")
def update_order_status(
    vendor_order_id: int,
    status: str,
    db: Session = Depends(get_db),
    current_user=Depends(vendor_required)
):

    vendor = db.query(Vendor).filter(
        Vendor.user_id == current_user.id
    ).first()

    order = db.query(VendorOrder).filter(
        VendorOrder.id == vendor_order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    if order.vendor_id != vendor.id:
        raise HTTPException(
            status_code=403,
            detail="You can update only your own orders"
        )

    allowed_status = [
        "Pending",
        "Paid",
        "Shipped",
        "Delivered",
        "Cancelled"

    ]

    if status not in allowed_status:
        raise HTTPException(
            status_code=400,
            detail="Invalid status"
        )

    order.status = status

    db.commit()

    return {
        "message": "Order status updated successfully"
    }
    
# ===========================
# CANCEL ORDER
# ===========================

@router.patch("/cancel/{order_id}")
def cancel_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):

    order = (
        db.query(Order)
        .filter(
            Order.id == order_id,
            Order.customer_id == current_user.id
        )
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    if order.status != "Pending":
        raise HTTPException(
            status_code=400,
            detail="Only pending orders can be cancelled."
        )

    # Restore Stock
    for vendor_order in order.vendor_orders:

        for item in vendor_order.items:

            product = db.query(Product).filter(
                Product.id == item.product_id
            ).first()

            if product:
                product.stock += item.quantity

        vendor_order.status = "Cancelled"

    order.status = "Cancelled"

    db.commit()

    return {
        "message": "Order cancelled successfully"
    }
    
    
# ===========================
# VENDOR REVENUE
# ===========================

@router.get("/vendor/revenue")
def vendor_revenue(
    db: Session = Depends(get_db),
    current_user=Depends(vendor_required)
):

    vendor = (
        db.query(Vendor)
        .filter(Vendor.user_id == current_user.id)
        .first()
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found"
        )

    revenue = (
        db.query(func.sum(VendorOrder.total_amount))
        .filter(
            VendorOrder.vendor_id == vendor.id,
            VendorOrder.status == "Delivered"
        )
        .scalar()
    ) or 0

    total_orders = (
        db.query(VendorOrder)
        .filter(VendorOrder.vendor_id == vendor.id)
        .count()
    )

    delivered = (
        db.query(VendorOrder)
        .filter(
            VendorOrder.vendor_id == vendor.id,
            VendorOrder.status == "Delivered"
        )
        .count()
    )

    pending = (
        db.query(VendorOrder)
        .filter(
            VendorOrder.vendor_id == vendor.id,
            VendorOrder.status == "Pending"
        )
        .count()
    )

    return {
        "revenue": revenue,
        "total_orders": total_orders,
        "delivered_orders": delivered,
        "pending_orders": pending
    }

# ===========================
# ORDER TIMELINE
# ===========================

@router.get("/{order_id}/timeline")
def order_timeline(
    order_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):

    order = (
        db.query(Order)
        .filter(
            Order.id == order_id,
            Order.customer_id == current_user.id
        )
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return {
        "order_id": order.id,
        "payment_status": order.payment_status,
        "current_status": order.status,
        "timeline": [
            {
                "step": "Pending",
                "completed": True
            },
            {
                "step": "Paid",
                "completed": order.status in [
                    "Paid",
                    "Shipped",
                    "Delivered"
                ]
            },
            {
                "step": "Shipped",
                "completed": order.status in [
                    "Shipped",
                    "Delivered"
                ]
            },
            {
                "step": "Delivered",
                "completed": order.status == "Delivered"
            }
        ]
    }
    
@router.get("/vendor/dashboard-summary")
def vendor_dashboard_summary(
    db: Session = Depends(get_db),
    current_user=Depends(vendor_required)
):

    vendor = (
        db.query(Vendor)
        .filter(Vendor.user_id == current_user.id)
        .first()
    )

    if not vendor:
        raise HTTPException(404, "Vendor not found")

    total_orders = (
        db.query(VendorOrder)
        .filter(VendorOrder.vendor_id == vendor.id)
        .count()
    )

    revenue = (
        db.query(func.sum(VendorOrder.total_amount))
        .filter(
            VendorOrder.vendor_id == vendor.id,
            VendorOrder.status == "Delivered"
        )
        .scalar()
    ) or 0

    return {
        "orders": total_orders,
        "revenue": revenue,
    }

@router.get("/invoice/{order_id}")
def invoice(
    order_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):

    order = (
        db.query(Order)
        .filter(
            Order.id == order_id,
            Order.customer_id == current_user.id
        )
        .first()
    )

    if not order:
        raise HTTPException(404, "Order not found")

    return {
        "invoice_number": f"INV-{order.id:06}",
        "order_id": order.id,
        "customer": current_user.full_name,
        "total": order.total_amount,
        "payment_status": order.payment_status,
        "status": order.status,
    }

@router.get("/admin/order-summary")
def admin_order_summary(
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):

    return {
        "pending": db.query(VendorOrder).filter(
            VendorOrder.status == "Pending"
        ).count(),

        "paid": db.query(VendorOrder).filter(
            VendorOrder.status == "Paid"
        ).count(),

        "shipped": db.query(VendorOrder).filter(
            VendorOrder.status == "Shipped"
        ).count(),

        "delivered": db.query(VendorOrder).filter(
            VendorOrder.status == "Delivered"
        ).count(),

        "cancelled": db.query(VendorOrder).filter(
            VendorOrder.status == "Cancelled"
        ).count(),
    }