# Notes Management API

This project provides a backend API built using **Node.js**, **Express**, and **MongoDB**. It includes two main routes: **auth** for authentication and **note** for note management and user profile handling. The API supports role-based access control (RBAC) for users and admins.

---

## Features

### Authentication Routes (`/auth`)
1. **POST /userRegister**: Register a new user.  
   **Body**:  
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```

2. **POST /userLogin**: Log in as a user and receive a JWT token.  
   **Body**:  
   ```json
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

3. **POST /adminLogin**: Log in as an admin and receive a JWT token.  
   **Body**:  
   ```json
   {
     "email": "admin@example.com",
     "password": "adminpass"
   }
   ```

---

### Note Management Routes (`/notes`)
1. **POST /createNote**: Create a new note for the authenticated user.  
   **Body**:  
   ```json
   {
     "title": "Meeting Notes",
     "description": "Discuss project requirements."
   }
   ```

2. **GET /getNote**: Get all notes of the authenticated user.  
   **Headers**:  
   - `Authorization`: Bearer `<JWT_TOKEN>`

3. **PATCH /notes/:id**: Edit a specific note by ID.  
   **Body**:  
   ```json
   {
     "title": "Updated Meeting Notes",
     "description": "Updated discussion points."
   }
   ```

4. **DELETE /notes/:id**: Delete a specific note by ID.

5. **GET /users**: Get all user profiles (admin only).  
   **Headers**:  
   - `Authorization`: Bearer `<ADMIN_JWT_TOKEN>`

6. **GET /users/:id**: Fetch details of a specific user by ID (admin only).

7. **DELETE /users/:id**: Delete a user profile by ID (admin only).

8. **GET /notes**: Get all notes (admin only).

---

## How to Test with Postman

### 1. **Setup Authorization**
- For protected routes, include the `Authorization` header:  
  `Authorization: Bearer <JWT_TOKEN>`

### 2. **Endpoints Testing**

#### **Authentication**
- **Register User**:  
  POST `/auth/userRegister`  
  Use the provided body to register a new user.

- **Login User/Admin**:  
  POST `/auth/userLogin` or `/auth/adminLogin`  
  Copy the `token` from the response and use it for authorization.

#### **Notes Management**
- **Create Note**:  
  POST `/notes/createNote`  
  Include the JWT in the `Authorization` header and use the body to create a note.

- **Get Notes**:  
  GET `/notes/getNote`  
  Include the JWT in the `Authorization` header.

- **Edit Note**:  
  PATCH `/notes/:id`  
  Replace `:id` with the note ID, include the JWT, and provide the updated data.

- **Delete Note**:  
  DELETE `/notes/:id`  
  Replace `:id` with the note ID and include the JWT.

- **Admin-Specific Routes**:  
  Access `/notes` or `/users` endpoints using the admin token for operations like fetching or deleting users/notes.

---

## Example Postman Configuration

1. **Authorization**:  
   - Select **Bearer Token**.  
   - Paste the token received from `/userLogin` or `/adminLogin`.

2. **Headers**:  
   - Add `Content-Type: application/json`.

3. **Body**:  
   - Use raw JSON format to send the required data for endpoints like `/createNote` or `/userRegister`.

---

## Requirements
- Node.js
- MongoDB
- Postman for API testing
