# Backend Event Management Platform API

# Features

## Authentication & Authorization

* Register customer & organizer
* Login with JWT
* Role-based access control (RBAC)
* Protected routes
* Forgot password
* Reset password
* Update profile
* Upload profile picture

---

## Event Management

* Create event
* Update event
* Delete event
* Event detail
* Event listing
* Search event
* Filter by category
* Filter by location
* Pagination
* Event slug URL
* Free & paid events

---

## Transaction System

* Ticket checkout
* Payment proof upload
* Transaction statuses:

  * WAITING_FOR_PAYMENT
  * WAITING_FOR_ADMIN_CONFIRMATION
  * DONE
  * REJECTED
  * EXPIRED
  * CANCELED
* Automatic expiration
* Automatic cancellation
* Seat restoration
* SQL transaction handling

---

## Organizer Dashboard

* Organizer transactions
* Dashboard statistics
* Monthly revenue analytics
* Daily revenue analytics
* Chart-ready API response

---

# Tech Stack

| Category          | Technology |
| ----------------- | ---------- |
| Runtime           | Node.js    |
| Backend Framework | Express.js |
| Language          | TypeScript |
| Database          | PostgreSQL |
| ORM               | Prisma     |
| Validation        | Zod        |
| Authentication    | JWT        |
| Password Hashing  | bcryptjs   |
| File Upload       | Multer     |
| Scheduler         | node-cron  |

---

# Project Structure

```txt
src/
│
├── config/
├── controllers/
├── cron/
├── interfaces/
├── middleware/
├── repositories/
├── routes/
├── services/
├── uploads/
├── utils/
├── validators/
│
├── app.ts
└── server.ts
```

---

# Installation

## 1. Clone Repository

```bash
git clone <repository-url>

cd event-management-api
```

---

## 2. Install Dependencies

```bash
npm install
```

---

# Main Dependencies Versions

```json
{
  "@prisma/client": "5.22.0",
  "bcryptjs": "2.4.3",
  "cors": "2.8.5",
  "dotenv": "16.4.5",
  "express": "4.21.1",
  "jsonwebtoken": "9.0.2",
  "multer": "1.4.5-lts.1",
  "node-cron": "3.0.3",
  "nanoid": "5.0.7",
  "pg": "8.13.1",
  "prisma": "5.22.0",
  "slugify": "1.6.6",
  "zod": "3.23.8"
}
```

---

# Environment Variables

Buat file:

```txt
.env
```

Isi:

```env
PORT=5000

DATABASE_URL="postgresql://postgres:password@localhost:5432/event_management"

JWT_SECRET="SUPER_SECRET_KEY"
```

---

# Database Migration

## Generate Prisma Client

```bash
npx prisma generate
```

---

## Run Migration

```bash
npx prisma migrate dev
```

---

# Run Development Server

```bash
npm run dev
```

Server akan berjalan di:

```txt
http://localhost:5000
```

---

# API Base URL

```txt
http://localhost:5000/api
```

---

# Authentication

Gunakan JWT token pada protected routes.

## Header

```txt
Authorization: Bearer YOUR_TOKEN
```

---

# API Endpoints

# Auth

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | `/auth/register` |
| POST   | `/auth/login`    |

---

# Users

| Method | Endpoint                       |
| ------ | ------------------------------ |
| PATCH  | `/users/profile`               |
| PATCH  | `/users/profile-picture`       |
| POST   | `/users/forgot-password`       |
| POST   | `/users/reset-password/:token` |

---

# Events

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | `/events`           |
| GET    | `/events/:slug`     |
| POST   | `/events`           |
| PATCH  | `/events/:id`       |
| DELETE | `/events/:id`       |
| GET    | `/events/my-events` |

---

# Transactions

| Method | Endpoint                         |
| ------ | -------------------------------- |
| POST   | `/transactions`                  |
| POST   | `/transactions/:id/upload-proof` |
| PATCH  | `/transactions/:id/accept`       |
| PATCH  | `/transactions/:id/reject`       |
| GET    | `/transactions/my-transactions`  |

---

# Organizer Dashboard

| Method | Endpoint                                  |
| ------ | ----------------------------------------- |
| GET    | `/transactions/organizer/all`             |
| GET    | `/transactions/organizer/statistics`      |
| GET    | `/transactions/organizer/monthly-revenue` |
| GET    | `/transactions/organizer/daily-revenue`   |

---

# Transaction Workflow

```txt
WAITING_FOR_PAYMENT
↓ upload payment proof

WAITING_FOR_ADMIN_CONFIRMATION
↓ organizer accept
DONE

↓ organizer reject
REJECTED

↓ no payment proof within 2 hours
EXPIRED

↓ no organizer action within 3 days
CANCELED
```

---

# Cron Jobs

## Expired Transaction

Berjalan setiap menit:

```txt
WAITING_FOR_PAYMENT
```

yang melewati:

```txt
expiredAt
```

akan otomatis:

```txt
EXPIRED
```

---

## Auto Cancel Transaction

Berjalan setiap jam.

Transaction:

```txt
WAITING_FOR_ADMIN_CONFIRMATION
```

lebih dari 3 hari akan otomatis:

```txt
CANCELED
```

---

# File Uploads

## Payment Proof

```txt
uploads/payment-proofs
```

---

## Profile Pictures

```txt
uploads/profilePicture
```

---

# Postman Testing

Disarankan membuat collection:

* Auth
* Events
* Transactions
* Organizer Dashboard
* Users

Gunakan environment variable:

```txt
BASE_URL
TOKEN
ORGANIZER_TOKEN
CUSTOMER_TOKEN
```

---