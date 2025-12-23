# 🖥️ Corporate Credit Management Platform – Frontend

A role-based React application for managing corporate clients and credit requests, built with modern tooling and integrated with a Spring Boot backend.

---

### 🚀 Tech Stack

React 18 + TypeScript

Vite – Fast build tool

React Router v6 – Routing

Redux Toolkit – State management

Axios – API communication

Tailwind CSS – Styling

React Icons

React Toastify – Notifications

Vitest + React Testing Library – Testing

Docker + Nginx – Production build

---

### 🧱 Architecture Overview

Auth Module – Login & JWT handling

Role Dashboards – Admin, RM, Analyst

Protected Routes – JWT & role guards

Reusable Layout – Sidebar + Topbar

Centralized APIs – Axios instance

Typed Models – Shared TypeScript interfaces

Redux Store – Auth & Menu state

Component-based structure

---

### 📂 Folder Structure

src/

├── apis/ # Axios APIs (auth, users, clients, credits)

├── assets/ # Static assets

├── components/

│ ├── admin/ # Admin pages

│ ├── analyst/ # Analyst pages

│ ├── rm/ # RM pages

│ ├── auth/ # Login

│ └── reusable/ # Layout, Sidebar, Topbar

├── privateRoutes/ # Route guards

├── redux/ # Slices & store

├── types/ # Global TypeScript types

├── App.tsx

└── main.tsx

---

### 👥 User Roles & Features

### 🛡️ Admin

Dashboard: view users

Create users

Activate/deactivate users

Read-only view of clients & credit requests

### 🏢 Relationship Manager (RM)

Dashboard overview

Create & manage clients

Submit credit requests

View own requests

### 📊 Analyst

Dashboard overview

View all credit requests

Review & update status/remarks

---

### 🔐 Authentication Flow

1\. User logs in

2\. JWT + user stored in Redux & localStorage

3\. Axios interceptor attaches JWT

4\. Routes protected by:

PrivateRoute → checks login

RoleRoute → checks role

5\. Logout clears state and redirects

---

### 🛣️ Routing Strategy

/login → Login page

/ → Role-based dashboard

Admin → /admin/...

RM → /rm/...

Analyst → /analyst/...

RoleDashboard decides which dashboard to show.

---

### ⚙️ Environment

Backend expected at:

// axios.ts

baseURL: "http://backend:8080" // Docker

// or

baseURL: "http://localhost:8080" // Local

---

###▶️ Run Locally

Prerequisites

Node.js ≥ 18

npm install

npm run dev

App runs at:

http://localhost:5173

---

### 🧪 Run Tests

npm run test

Coverage:

npm run test:coverage

\> Key flows tested:

Login

Protected routes

Role routes

Dashboards & layout components

---

### 🐳 Run with Docker

Build & run:

docker build -t capstone-frontend .

docker run -p 5173:80 capstone-frontend

Open:

http://localhost:5173

Nginx serves production build with SPA routing support.

---

### 🎨 UI Highlights

Clean login page

Role-based sidebar menus

Responsive layout

Toast notifications for feedback

Tailwind utility-first styling

---

### 📌 Key Features

✅ Role-based dashboards

✅ JWT protected routing

✅ Centralized API layer

✅ Redux global state

✅ Strong TypeScript typing

✅ Component-level tests

✅ Docker-ready production build

✅ SPA refresh handling with Nginx

