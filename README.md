# mini-drive1
Node.js + Express backend for Mini Drive with JWT authentication, role-based access control, file uploads using Multer, MongoDB integration, secure file sharing with request–approval permissions, and admin moderation features.
mini-drive
Node.js + Express backend for Mini Drive with JWT authentication, role-based access control, file uploads using Multer, MongoDB integration, secure file sharing with request–approval permissions, and admin moderation features.

Mini Drive – Backend 🚀
This is the backend service for Mini Drive, a cloud-storage–like web application inspired by Google Drive.

It provides:

User & Admin authentication
File upload & management
Secure file sharing with access control
Admin moderation features
REST APIs consumed by the frontend
🛠 Tech Stack
Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication
Multer (file uploads)
bcryptjs (password hashing)
📂 Folder Structure
backend/ │ ├── config/ │ └── db.js # MongoDB connection │ ├── controllers/ │ ├── authController.js # User & Admin auth logic │ ├── fileController.js # File upload, list, delete │ ├── adminController.js # Admin actions │ └── shareController.js # File sharing & access requests │ ├── middleware/ │ ├── auth.js # JWT authentication │ ├── isAdmin.js # Admin authorization │ └── upload.js # Multer config │ ├── models/ │ ├── User.js # User schema │ ├── File.js # File schema │ └── AccessRequest.js # File access requests │ ├── routes/ │ ├── authRoutes.js │ ├── fileRoutes.js │ ├── adminRoutes.js │ └── shareRoutes.js │ ├── uploads/ # Uploaded files │ ├── server.js # App entry point ├── package.json └── .env
