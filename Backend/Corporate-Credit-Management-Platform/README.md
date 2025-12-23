# 📘 Corporate Credit Management Platform – Backend

A Spring Boot REST API for managing corporate clients and credit requests with role-based access (Admin, Relationship Manager, Analyst), JWT authentication, and MongoDB persistence.

---

### 🚀 Tech Stack

Java 17

Spring Boot 3

Spring Security + JWT

MongoDB

Maven

Swagger / OpenAPI

JUnit + Mockito

JaCoCo (Code Coverage)

Docker

---

### 🧱 Architecture Overview

Auth Module – Login & JWT issuance

User Management – Admin creates & manages users

Client Onboarding – RM manages corporate clients

Credit Requests – RM submits, Analyst reviews

Security Layer – JWT filter + role-based access

Global Exception Handling

Consistent API Response Wrapper

---

### 📂 Package Structure

com.bank.corporate

├── config # Security, Swagger, Mongo config

├── controller # REST controllers

├── service # Business logic

├── repository # Mongo repositories

├── document # MongoDB documents

├── dto # Request/response DTOs

├── enums # Role, CreditStatus

├── exception # Custom exceptions + handler

├── security # JWT, filters, user details

└── util # ApiResponse, helpers

---

### 🔐 Roles

ADMIN – Create/manage users

RM – Manage clients & submit credit requests

ANALYST – Review & update credit requests

---

### 📑 API Response Format

All APIs return a common structure:

{

"success": true,

"message": "Operation successful",

"data": {}

}

Error example:

{

"success": false,

"message": "Invalid credentials",

"data": null

}

---

### 🔑 Authentication APIs

MethodEndpointDescription

POST/api/auth/loginLogin & get JWT

POST/api/auth/registerCreate user (Admin only)

---

### 👤 User APIs (Admin)

MethodEndpointDescription

GET/api/users/meGet current user

PUT/api/admin/users/{id}/statusActivate/deactivate user

---

### 🏢 Client APIs (RM)

MethodEndpointDescription

POST/api/rm/clientsCreate client

GET/api/clientsGet own clients (search supported)

GET/api/clients/{id}Client details

PUT/api/clients/{id}Update client

---

### 💳 Credit Request APIs

MethodEndpointDescription

POST/api/credit-requestsCreate request (RM)

GET/api/credit-requestsRM: own, Analyst: all

GET/api/credit-requests/{id}Request details

PUT/api/credit-requests/{id}Update status/remarks (Analyst)

---

### ⚙️ Configuration

application.yml (local):

spring:

data:

mongodb:

uri: mongodb://localhost:27017/creditdb

app:

jwt:

secret: your\_secret\_key\_here

expiration: 86400000

For Docker, Mongo URI is injected via environment variable.

---

### ▶️ Run Locally

Prerequisites

Java 17

Maven

MongoDB running on localhost:27017

mvn clean spring-boot:run

Backend will start at:

http://localhost:8080

---

### 🧪 Run Tests & Coverage

mvn clean test

JaCoCo report:

target/site/jacoco/index.html

✔️ Service layer coverage ≥ 80%

---

### 📖 Swagger UI

After starting app:

http://localhost:8080/swagger-ui.html

Use JWT token in Authorize button.

---

### 🐳 Run with Docker

Build jar first:

mvn clean package -DskipTests

Then build image:

docker build -t capstone-backend .

docker run -p 8080:8080 capstone-backend

(Usually run via docker-compose with MongoDB.)

---

### 🛡️ Security

JWT-based stateless authentication

Role-based route protection

Passwords hashed using BCrypt

Custom exceptions with global handler

---

### 📌 Key Features

✅ Clean layered architecture

✅ Consistent API responses

✅ Role-based access control

✅ Search & filtering support

✅ Robust validation & error handling

✅ High unit test coverage

✅ SonarQube compliant

✅ Dockerized

---
