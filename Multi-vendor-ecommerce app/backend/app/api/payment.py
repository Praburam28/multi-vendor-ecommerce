import random
import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import customer_required

from app.models.order import Order
from app.models.vendor_order import VendorOrder

router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)


@router.post("/{order_id}")
def simulate_payment(
    order_id: int,
    payment_method: str,
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

    if order.payment_status == "Paid":
        raise HTTPException(
            status_code=400,
            detail="Order already paid"
        )

    allowed_methods = {
        "UPI",
        "Card",
        "Net Banking",
        "Cash on Delivery"
    }

    if payment_method not in allowed_methods:
        raise HTTPException(
            status_code=400,
            detail="Invalid payment method"
        )

    payment_success = True

    transaction_id = (
        "TXN-" +
        uuid.uuid4().hex[:10].upper()
    )

    if payment_success:

        order.payment_status = "Paid"
        order.status = "Paid"

        order.payment_method = payment_method
        order.transaction_id = transaction_id

        vendor_orders = (
            db.query(VendorOrder)
            .filter(
                VendorOrder.order_id == order.id
            )
            .all()
        )

        for vendor_order in vendor_orders:
            vendor_order.status = "Paid"

        db.commit()

        return {
            "success": True,
            "message": "Payment Successful",
            "transaction_id": transaction_id,
            "payment_method": payment_method,
            "payment_status": order.payment_status,
            "order_status": order.status,
            "amount": order.total_amount
        }

    return {
        "success": False,
        "message": "Payment Failed",
        "payment_status": "Failed",
        "transaction_id": transaction_id
    }


@router.get("/history")
def payment_history(
    db: Session = Depends(get_db),
    current_user=Depends(customer_required)
):

    orders = (
        db.query(Order)
        .filter(Order.customer_id == current_user.id)
        .order_by(Order.id.desc())
        .all()
    )

    return [
        {
            "order_id": order.id,
            "transaction_id": order.transaction_id,
            "payment_method": order.payment_method,
            "payment_status": order.payment_status,
            "amount": order.total_amount,
            "order_status": order.status
        }
        for order in orders
    ]