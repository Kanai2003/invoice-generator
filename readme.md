# Full Stack Project

This is a full-stack project that consists of a frontend built with React and a backend built with Node.js and Express. The project allows users to perform various actions such as signing in, adding products, generating PDF invoices, and downloading them.

## Features

- User authentication: Users can sign in to access the application.
- Add products: Users can add products with their names, quantities, and rates.
- Generate PDF invoices: Users can generate PDF invoices based on the added products.
- Download PDF: Users can download the generated PDF invoices.

## Technologies Used

- Frontend:
  - React
  - Redux
  - React Router
  - Axios

- Backend:
  - Node.js
  - Express
  - MongoDB (or any other database)
  - JWT for authentication

## Setup

**Clone the repository:**

```bash
git clone <repository-url>
```
**Install dependencies:**

```bash
cd frontend
npm install
cd ../backend
npm install
```
**Set up environment variables:**

Create a .env file in the both backend and Frontend directory and add the necessary environment variables

*Backend*
```
PORT=4000

MONGODB_URI=

CORS_ORIGIN=http://localhost:5173


JWT_SECRET="random complex string"
```
*Frontend*
```
VITE_SERVER_URL=http://localhost:4000
```

## Run the application:

Start the frontend and backend servers:

```bash
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev
```
## Access the application:
Frontend: 
https://invoice-generator-two-pied.vercel.app

Backend: https://nice-rose-seal-shoe.cyclic.app



## Generated PDF: 
[pdf sample](./invoice.pdf)