![image](https://github.com/user-attachments/assets/d9261e21-6673-4f45-bc65-b623aecf9123)
![image](https://github.com/user-attachments/assets/52a2fb58-9017-4c14-a4d9-54b148de6da5)
![image](https://github.com/user-attachments/assets/bd66b6a2-2885-4275-a5d3-3edeccdfa871)
![image](https://github.com/user-attachments/assets/ea39db8f-8566-4cc4-9f94-8bb0b7562a6f)


# E-Learning Platform

This is a full-featured e-learning platform that allows users to browse courses, enroll, and manage their learning journey. The project uses Django and Django REST Framework for the backend and React for the frontend. It includes features such as authentication, course management, cart and checkout functionalities, and integration with SSLCommerz for payments.

---

## Features

### General
- Browse and search for courses
- View course details and lectures
- Responsive UI built with React and Tailwind CSS

### Authentication
- Register, Login, Logout
- Password Reset and Change
- Token-based authentication using JWT

### Course Management
- View categories and courses
- Course enrollment
- Review and rate courses

### Cart and Checkout
- Add courses to cart
- Checkout with order creation
- Payment integration with SSLCommerz

### User Dashboard
- View profile and enrolled courses
- Change password
- Manage cart and orders

---

## Tech Stack

### Frontend
- React (with React Router for navigation)
- Tailwind CSS for styling
- Axios for API requests
- Lazy loading for route-based code splitting

### Backend
- Django and Django REST Framework
- JWT Authentication (Simple JWT)
- SSLCommerz for payment integration

---

## Installation

### Prerequisites
- Node.js
- Python 3.12.8
- Django
- PostgreSQL

---
## API Endpoints
### User Management
Registration: POST /user/registrations/
Account Activation: GET /user/activate/<uid64>/<token>/
Login (JWT Token): POST /user/token/
Refresh Token: POST /user/token/refresh/
Password Reset: GET /user/password-reset/<email>/
Password Change: POST /user/password-change/
Profile Update: PUT /user/profile-update/<user_id>/
Password Update: PUT /user/password-update/<user_id>/
### Course Management
Categories: GET /course/category/
Courses List: GET /course/course/
Course Detail: GET /course/course/<slug>
Enroll in Course: POST /course/enrollment/
Add to Cart: POST /course/cart/add/
View Cart: GET /course/cart/<cart_id>/
Remove from Cart: DELETE /course/cart/<cart_id>/<item_id>/
Leave Review: POST /course/review/
### Order and Payment
Create Order: POST /order/create-order/
View Orders: GET /order/check-order/<user_id>
Checkout: POST /order/checkout/<oid>/
Apply Coupon: POST /order/coupon/
Payment via SSLCommerz: POST /order/payment/sslcommerz/
