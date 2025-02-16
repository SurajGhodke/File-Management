# File Management System API

## 📌 Overview

This **File Management System API** is a backend service built using **Node.js, Express.js, and MongoDB** with a **microservice architecture**. It allows users to manage folders and documents, implement version control, and apply hierarchical structures.

## 🏗️ Architecture Decisions

- **Microservice Design**: Separated into three services: **Users, Hierarchy (Folders), and Versions (Documents)**.
- **Monorepo Approach**: A single `package.json` for managing dependencies across services.
- **JWT Authentication**: Secure authentication with **JSON Web Tokens (JWT)**.
- **MongoDB with Mongoose**: Schema-based NoSQL database for efficient data handling.
- **RESTful API**: Following REST principles for clear and structured endpoints.

## ⚖️ Trade-off Analysis

| Decision               | Pros                                       | Cons                                       |
| ---------------------- | ------------------------------------------ | ------------------------------------------ |
| **Microservices**      | Scalable, modular, easier maintenance      | Increased complexity                       |
| **Monorepo Approach**  | Easier dependency management, simple setup | Services are tightly coupled               |
| **MongoDB**            | Flexible schema, efficient querying        | Requires indexing for performance          |
| **JWT Authentication** | Stateless, widely used                     | Token storage & expiration handling needed |

## 🚀 Setup Instructions

### 1️⃣ **Clone the Repository**

```sh
git clone https://github.com/your-repo/file-management-api.git
cd file-management-api
```

### 2️⃣ **Install Dependencies**

```sh
npm install
```

### 3️⃣ **Create a \*\***\`\`\***\* File**

Create a `.env` file in the root directory and add:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/file_management
JWT_SECRET=your_secret_key
```

### 4️⃣ **Start the Server**

```sh
npm start
```

### 5️⃣ **Test API in Postman**

Import the Postman collection: [Postman API Collection](#)

## 🔥 API Endpoints

### **User Authentication**

| Method | Endpoint              | Description                    |
| ------ | --------------------- | ------------------------------ |
| `POST` | `/api/users/register` | Register a new user            |
| `POST` | `/api/users/login`    | Login and receive JWT token    |
| `GET`  | `/api/users/me`       | Get authenticated user details |

### **Folder Management**

| Method   | Endpoint                           | Description                   |
| -------- | ---------------------------------- | ----------------------------- |
| `GET`    | `/api/folders/viewstore`           | Get root folders for the user |
| `GET`    | `/api/folders/viewstore/:folderId` | Get content of a folder       |
| `POST`   | `/api/folders`                     | Create a new folder           |
| `PUT`    | `/api/folders/:id`                 | Update folder name            |
| `DELETE` | `/api/folders/:id`                 | Delete a folder               |

### **Document Management**

| Method   | Endpoint                      | Description                    |
| -------- | ----------------------------- | ------------------------------ |
| `GET`    | `/api/documents/:id`          | Get document details           |
| `POST`   | `/api/documents`              | Create a new document          |
| `POST`   | `/api/documents/:id/version`  | Create a document version      |
| `GET`    | `/api/documents/:id/versions` | Get all versions of a document |
| `PUT`    | `/api/documents/:id`          | Update document details        |
| `DELETE` | `/api/documents/:id`          | Delete a document              |

### **Search & Statistics**

| Method | Endpoint                               | Description                       |
| ------ | -------------------------------------- | --------------------------------- |
| `GET`  | `/api/documents/filter?search=keyword` | Search documents by title/content |
| `GET`  | `/api/total-documents`                 | Get total count of documents      |

## 📌 Notes

- **Authorization:** Use JWT token in the `Authorization: Bearer <token>` header.
- **Database:** Ensure MongoDB is running before starting the server.

## 📜 License

MIT License

---

This API is designed to handle document storage, versioning, and user access in a **scalable** and **secure** way. 🚀
