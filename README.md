# 🛒 Multi-Vendor E-Commerce Platform

A full-stack Multi-Vendor E-Commerce application built using **FastAPI**, **React (Vite)**, **SQLAlchemy**, and **SQLite/PostgreSQL**. The platform enables multiple vendors to sell products while customers can browse, purchase, and manage orders through a secure shopping experience.

---

# 🚀 Features

## Customer
- User Registration & Login (JWT Authentication)
- Browse Products
- Search & Filter Products
- Product Details
- Wishlist
- Shopping Cart
- Checkout
- Payment Simulation
- Order History
- Product Reviews

## Vendor
- Vendor Registration
- Vendor Dashboard
- Product CRUD
- View Vendor Orders
- Revenue Analytics
- Low Stock Monitoring

## Admin
- Admin Dashboard
- User Management
- Vendor Management
- Product Management
- Category Management
- Order Management
- Revenue Statistics

---

# 🛠 Technology Stack

## Backend
- FastAPI
- SQLAlchemy ORM
- Alembic
- SQLite / PostgreSQL
- JWT Authentication
- Pydantic
- Uvicorn

## Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router
- React Hot Toast
- Lucide Icons

---

# 📂 Project Structure

```
backend/
│
├── app/
│   ├── api/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── dependencies/
│   ├── database/
│   └── main.py
│
├── uploads/
│   └── products/
│
└── requirements.txt


frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   └── App.jsx
│
└── package.json
```

---

# ⚙️ Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/<your-username>/multi-vendor-ecommerce.git

cd multi-vendor-ecommerce
```

---

# Backend Setup

Create virtual environment

```bash
python -m venv venv
```

Activate environment

Windows

```bash
venv\Scripts\activate
```

Linux/Mac

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run database migrations

```bash
alembic upgrade head
```

Start backend

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://localhost:8000
```

Swagger Documentation

```
http://localhost:8000/docs
```

---

# Frontend Setup

Install packages

```bash
npm install
```

Run development server

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# 🔐 Authentication

JWT Token based authentication is implemented.

Workflow

```
Register
      ↓
Login
      ↓
Receive JWT Token
      ↓
Store Token
      ↓
Protected APIs
```

Roles

- Admin
- Vendor
- Customer

---

# 📚 API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|-----------------|---------------------------|
| POST | /register | Register user |
| POST | /login | Login |

---

## Vendor

| Method | Endpoint |
|----------|------------------------|
| POST | /vendor/profile |
| GET | /vendor/dashboard |
| GET | /vendor/orders |

---

## Categories

| Method | Endpoint |
|----------|----------------|
| GET | /categories |
| POST | /categories |

---

## Products

| Method | Endpoint |
|----------|---------------------|
| GET | /products |
| GET | /products/{id} |
| POST | /products |
| PUT | /products/{id} |
| DELETE | /products/{id} |

Supports

- Search
- Category Filter
- Price Filter
- Sorting
- Pagination

---

## Cart

| Method | Endpoint |
|----------|----------------|
| POST | /cart/add |
| GET | /cart |
| PUT | /cart/{id} |
| DELETE | /cart/{id} |

---

## Checkout

| Method | Endpoint |
|----------|----------------|
| POST | /orders/checkout |

---

## Payments

| Method | Endpoint |
|----------|------------------------|
| POST | /payments/{order_id} |
| GET | /payments/history |

---

## Wishlist

| Method | Endpoint |
|----------|----------------|
| GET | /wishlist |
| POST | /wishlist |
| DELETE | /wishlist/{id} |

---

## Reviews

| Method | Endpoint |
|----------|----------------|
| POST | /reviews |
| GET | /reviews/{product_id} |

---

## Admin

| Method | Endpoint |
|----------|------------------------|
| GET | /admin/dashboard |
| GET | /admin/orders |
| GET | /admin/users |
| GET | /admin/vendors |

---

# 🗄 Database Schema

## User

```
id
name
email
password
role
created_at
```

---

## Vendor

```
id
user_id
business_name
address
phone
```

---

## Category

```
id
name
```

---

## Product

```
id
vendor_id
category_id
name
description
price
stock
image_url
```

---

## Cart

```
id
customer_id
```

---

## Cart Item

```
id
cart_id
product_id
quantity
```

---

## Order

```
id
customer_id
total_amount
status
payment_status
payment_method
transaction_id
created_at
```

---

## Vendor Order

```
id
order_id
vendor_id
status
total_amount
```

---

## Order Item

```
id
order_id
vendor_order_id
product_id
quantity
price
```

---

## Wishlist

```
id
customer_id
product_id
```

---

## Review

```
id
customer_id
product_id
rating
comment
```

---

# 🔄 Order Splitting Logic

The checkout process supports multiple vendors in a single customer order.

### Example

Customer Cart

```
Samsung Phone
Vendor A

Sony Headphones
Vendor A

Nike Shoes
Vendor B
```

---

### Checkout Flow

```
Customer
      │
      ▼
Shopping Cart
      │
      ▼
Validate Stock
      │
      ▼
Group Products by Vendor
      │
      ▼
Create Master Order
      │
      ▼
Create Vendor Orders
      │
      ▼
Create Order Items
      │
      ▼
Reduce Product Stock
      │
      ▼
Clear Cart
      │
      ▼
Payment
```

---

### Database Records

Master Order

```
Order #25
Customer 5
Total ₹179998
```

Vendor Orders

```
Vendor A
₹129999

Vendor B
₹49999
```

Order Items

```
Samsung Phone

Sony Headphones

Nike Shoes
```

Benefits

- Independent vendor fulfillment
- Separate vendor revenue
- Individual shipment tracking
- Vendor-specific dashboards

---

# 💳 Payment Flow

```
Checkout
      │
      ▼
Select Payment Method
      │
      ▼
Generate Transaction ID
      │
      ▼
Update Payment Status
      │
      ▼
Update Order Status
      │
      ▼
Update Vendor Orders
```

---

# 📸 Image Upload

Images are stored in

```
backend/uploads/products/
```

Served using FastAPI StaticFiles

```
/uploads/products/<filename>
```

---

# 🚀 Future Enhancements

- Stripe Payment Integration
- Razorpay Integration
- Email Notifications
- SMS Notifications
- Product Recommendations
- Inventory Forecasting
- Coupon System
- Multi-language Support
- Docker Deployment
- CI/CD Pipeline
- Redis Caching
- Elasticsearch Search

---

# 👨‍💻 Author

**Praburam R**

Python Full Stack Developer

GitHub: https://github.com/Praburam28

---
