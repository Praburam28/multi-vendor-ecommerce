from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.database.database import create_tables
from app.api.auth import router as auth_router
from app.api.vendor import router as vendor_router
from app.api.category import router as category_router
from app.api.product import router as product_router
from app.api.cart import router as cart_router
from app.api.order import router as order_router
from app.api.payment import router as payment_router
from app.api.review import router as review_router
from app.api.admin import router as admin_router
from app.api.vendor_dashboard import router as vendor_dashboard_router
from app.api.admin_users import router as admin_users_router
from app.api.admin_vendor import router as admin_vendor_router
from app.api.admin_orders import router as admin_orders_router
from app.api.vendor_orders import router as vendor_orders_router
from app.api.upload import router as upload_router
from app.api.wishlist import router as wishlist_router
from app.api.customer_orders import router as customer_orders_router








app = FastAPI(
    title="Multi Vendor E-Commerce API",
    version="1.0.0"
)

os.makedirs("uploads/products", exist_ok=True)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    create_tables()


app.include_router(auth_router)
app.include_router(vendor_router)
app.include_router(category_router)
app.include_router(product_router)
app.include_router(cart_router)
app.include_router(order_router)
app.include_router(payment_router)
app.include_router(review_router)
app.include_router(admin_router)
app.include_router(vendor_dashboard_router)
app.include_router(admin_users_router)
app.include_router(admin_vendor_router)
app.include_router(admin_orders_router)
app.include_router(vendor_orders_router)
app.include_router(upload_router)
app.include_router(wishlist_router)
app.include_router(customer_orders_router)






@app.get("/")
def root():
    return {
        "message": "Multi Vendor E-Commerce API Running"
    }