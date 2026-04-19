# MyGate — Society Management System

**MyGate** is a full-stack, role-based society management platform built completely from scratch using Domain-Driven Design (Clean Architecture). It digitally monitors the flow of external visitors, manages residents, and provides overarching analytics and secure approvals via a centralized web dashboard.

---

## 🌐 Live Demonstration
**Admin Dashboard Demo:** [https://yakshitsavaliya.netlify.app/](https://yakshitsavaliya.netlify.app/)

> **Test Credentials:**
> - **Phone:** `0000000000`
> - **Mock OTP:** `123456`

---

## 🏗️ Architecture Stack

### Backend API (Node.js)
Built using strict **Clean Architecture** principles separating domain rules from infrastructure.
* **Core:** Node.js (v22), Express, TypeScript
* **Database Layer:** Prisma ORM mapped to a globally distributed **TiDB Cloud** Serverless MySQL instance.
* **Security:** Stateful JSON Web Token (JWT) handling with custom Role-Based Access Control (RBAC) middleware overriding standard Express interceptors.
* **Deployment:** Containerized Web Service dynamically hosted on **Render**.

### Admin Dashboard (React.js)
A standalone front-end hub optimized for management metrics and real-time gate logging.
* **Core:** Vite + React + TypeScript 
* **Routing:** React Router v6 mapping protected routes
* **Styling Framework:** Zero third-party constraints! Completely crafted using pure Vanilla CSS enforcing a premium Dark Mode Glassmorphism aesthetic with micro-animations.
* **Deployment:** Hosted securely on **Netlify**.

---

## 🔑 Features & Entities
* **Super Admin Portal:** View system-wide statistics, verify pending residents, and analyze historical global gate traffic.
* **Guards:** Can instantly log external visitors against a resident's flat number.
* **Residents:** Maintain active registries and wait for secure `PENDING / VERIFIED` gating logic.
* **Intercepted Flow Control:** Frontend securely intercepts multiple HTTP responses natively (e.g., catching `403` / `401` errors and forcing session regeneration gracefully without tearing the UI).

---

## 🚀 Local Development

To spin up the ecosystem locally:

**1. Database Configuration**
Create a `.env` in the root:
```env
DATABASE_URL="mysql://root:password@localhost:3306/mygate"
JWT_SECRET="local_dev_key"
NODE_ENV="development"
```

**2. Boot the API Engine**
```bash
npm install
npx prisma generate
npx prisma db push --accept-data-loss
npm run dev
```

**3. Boot the React GUI**
```bash
cd admin-client
npm install
npm run dev
```

---
