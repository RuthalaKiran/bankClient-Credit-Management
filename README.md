# 🏦 Corporate Credit Management Platform

A full-stack enterprise application to manage corporate clients and credit requests with role-based access for Admin, Relationship Manager (RM), and Analyst. Built using Spring Boot, React (TypeScript), MongoDB, and fully containerized with Docker.

---

### 🚀 Tech Stack

### 🖥️ Frontend

React 18 + TypeScript

Vite

Redux Toolkit

React Router v6

Axios

Tailwind CSS

Vitest + React Testing Library

Nginx (Docker)

### ⚙️ Backend

Java 17

Spring Boot 3

Spring Security + JWT

MongoDB

Maven

Swagger (OpenAPI)

JUnit + Mockito

JaCoCo

SonarQube

Docker

### 🗄️ Database

MongoDB

---

### 🧱 High-Level Architecture

\[ React Frontend \] ---> \[ Spring Boot Backend \] ---> \[ MongoDB \]

| |

JWT Auth JWT Validation

Frontend communicates via REST APIs.

Backend enforces security & business rules.

MongoDB persists users, clients, and credit requests.

All services run together via Docker Compose.

---

### 👥 Roles & Responsibilities

### 🛡️ Admin

Create users (RM / Analyst)

Activate / deactivate users

View all users, clients & credit requests (read-only)

### 🏢 Relationship Manager (RM)

Create & manage corporate clients

Submit credit requests

View own requests

### 📊 Analyst

View all credit requests

Approve / reject with remarks

---

### ✨ Key Features

✅ JWT-based authentication

✅ Role-based authorization

✅ Corporate client onboarding

✅ Credit request lifecycle

✅ Global API response format

✅ Protected frontend routes

✅ Centralized API layer

✅ Redux state management

✅ Clean layered backend architecture

✅ Unit testing & coverage

✅ SonarQube code quality

✅ Dockerized full stack

---

### 📂 Project Structure

capstone/

├── backend/

│ └── Corporate-Credit-Management-Platform/

│ ├── src/

│ ├── Dockerfile

│ └── README.md

│

├── frontend/

│ ├── src/

│ ├── Dockerfile

│ ├── nginx.conf

│ └── README.md

│

└── docker-compose.yml

---

### 🐳 Run Entire Stack with Docker

✅ Prerequisites

Docker

Docker Compose

From capstone/ root:

docker-compose up --build

---

### 🌍 Access URLs

ServiceURL

Frontendhttp://localhost:5173

Backendhttp://localhost:8080

Swaggerhttp://localhost:8080/swagger-ui.html

MongoDBmongodb://localhost:27017

---

### ▶️ Run Locally (Without Docker)

Backend

cd backend/Corporate-Credit-Management-Platform

mvn clean spring-boot:run

Frontend

cd frontend

npm install

npm run dev

---

### 🧪 Testing & Quality

Backend

mvn clean test

JaCoCo coverage report: target/site/jacoco

SonarQube for code quality

Frontend

npm run test

npm run test:coverage

Vitest + RTL

Component & route coverage

---

### 🔐 Security

JWT tokens for stateless auth

Passwords encrypted with BCrypt

Role-based route protection

Global exception handling

---

### 📘 Documentation

Backend APIs documented via Swagger

Consistent API response wrapper

Detailed READMEs in backend & frontend folders

---

### 🏁 Final Note

This project demonstrates:

Real-world enterprise architecture

Secure authentication & authorization

Clean frontend UX with role separation

Production-ready Docker setup

Strong testing & quality practices