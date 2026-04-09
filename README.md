# Shortlink App

A full-stack URL shortener application where authenticated users can create, manage, and redirect shortened URLs. Built with React, Go, and PostgreSQL.

## Project Description

Shortlink App is a modern web application that allows users to:
- Register and authenticate securely with JWT tokens
- Create shortened URLs from long ones with auto-generated or custom slugs
- Manage their links (view, edit, delete)
- Access their shortened URLs via public redirect endpoint
- Enjoy a responsive, user-friendly interface

##  Technology Stack

### Frontend
- **React.js** - UI library for building interactive components
- **Redux & Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Axios** - HTTP client for API communication
- **React Router** - Client-side routing

### Backend
- **Go** - Backend language
- **Gin** - Web framework for building REST APIs
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Token for authentication
- **GORM** - ORM for database operations

### Database
- **PostgreSQL** - Production-grade relational database

## 🚀 Quick Start

### Prerequisites
Before starting, ensure you have installed:
- **Node.js** (v14+) and npm
- **Go** (v1.19+)
- **PostgreSQL** (v12+)
- **Git**

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/adityabastyas/koda-b6-final-fase.git
cd koda-b6-final-fase

# Navigate to backend folder
cd backend

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
# Important: Set the following variables:
# - DB_HOST=localhost
# - DB_PORT=5432
# - DB_USER=postgres
# - DB_PASSWORD=your_password
# - DB_NAME=url_shortener
# - JWT_SECRET=your_secret_key
# - PORT=8080

# Download dependencies
go mod download

# Run database migrations (if applicable)
# go run cmd/migrate/main.go

# Start the server
go run cmd/server/main.go
```

The backend will start on `http://localhost:8080`

### Frontend Setup

```bash
# Navigate to frontend folder (from project root)
cd frontend

# Copy environment file
cp .env.example .env

# Edit .env with your API configuration
# REACT_APP_API_URL=http://localhost:8080

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173` (or the port shown in terminal)

## 💾 Database Setup

### Create Database and Tables

Connect to PostgreSQL and run:

```sql
-- Create database
CREATE DATABASE url_shortener;

-- Connect to the database
\c url_shortener

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create links table
CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    original_url TEXT NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_links_user_id ON links(user_id);
CREATE UNIQUE INDEX idx_links_slug ON links(slug) WHERE deleted_at IS NULL;
```

### Alternative: Using Docker

If you have Docker installed, you can use Docker Compose:

```bash
# From project root
docker-compose up -d

# This creates PostgreSQL container and sets up the database
```

## ⚙️ Environment Configuration

### Backend (.env)

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=url_shortener
DB_SSLMODE=disable

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRATION=900  # 15 minutes in seconds

# Server Configuration
PORT=8080
GIN_MODE=debug  # Use 'release' for production

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_APP_NAME=Shortlink App
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/register
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response (Success):
{
  "success": true,
  "message": "User registered successfully",
  "results": {
    "id": 1,
    "email": "user@example.com"
  }
}

Response (Error):
{
  "success": false,
  "message": "Email already exists",
  "results": null
}
```

#### Login User
```
POST /api/login
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response (Success):
{
  "success": true,
  "message": "Login successful",
  "results": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "email": "user@example.com"
    }
  }
}

Response (Error):
{
  "success": false,
  "message": "Invalid email or password",
  "results": null
}
```

### Link Management Endpoints

#### Create Short Link
```
POST /api/links
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "original_url": "https://example.com/very/long/path",
  "slug": "myslug"  // Optional, auto-generated if not provided
}

Response (Success):
{
  "success": true,
  "message": "Link created successfully",
  "results": {
    "id": 1,
    "original_url": "https://example.com/very/long/path",
    "slug": "myslug",
    "short_url": "http://localhost:8080/myslug",
    "created_at": "2026-04-07T10:30:00Z"
  }
}

Response (Error - Slug Taken):
{
  "success": false,
  "message": "Slug already taken",
  "results": null
}

Response (Error - Invalid Slug):
{
  "success": false,
  "message": "Slug must be 3-50 characters, alphanumeric and hyphens only",
  "results": null
}
```

#### Get User's Links
```
GET /api/links
Authorization: Bearer {token}

Response (Success):
{
  "success": true,
  "message": "Links retrieved successfully",
  "results": [
    {
      "id": 1,
      "original_url": "https://example.com/very/long/path",
      "slug": "myslug",
      "short_url": "http://localhost:8080/myslug",
      "created_at": "2026-04-07T10:30:00Z"
    }
  ]
}
```

#### Delete Link
```
DELETE /api/links/:id
Authorization: Bearer {token}

Response (Success):
{
  "success": true,
  "message": "Link deleted successfully",
  "results": null
}

Response (Error):
{
  "success": false,
  "message": "Link not found",
  "results": null
}
```

### Redirect Endpoint

#### Access Short Link
```
GET /:slug

Response (Success):
HTTP 301 Redirect to original URL

Response (Error):
HTTP 404 Not Found
```

## 📁 Project Structure

### Frontend Structure

```
frontend/
├── src/
│   ├── assets/                 # Images, fonts, static files
│   ├── components/             # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── LinkCard.jsx
│   │   └── LoadingSpinner.jsx
│   ├── pages/                  # Page components
│   │   ├── Landing.jsx         # Home/landing page
│   │   ├── Register.jsx        # User registration
│   │   ├── Login.jsx           # User login
│   │   ├── Dashboard.jsx       # Main dashboard
│   │   └── NotFound.jsx        # 404 page
│   ├── lib/                    # Library utilities
│   │   └── api.js              # API client with axios
│   ├── redux/                  # Redux state management
│   │   └── slices/             # Redux slices
│   │       ├── authSlice.js    # Authentication state
│   │       └── linksSlice.js   # Links management state
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # App entry point
│   └── index.css               # Global styles
├── public/                     # Static files
│   └── index.html
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore file
├── package.json                # Dependencies & scripts
├── package-lock.json           # Dependency lock
├── vite.config.js              # Vite configuration
└── tailwind.config.js          # Tailwind configuration
```

### Backend Structure

```
backend/
├── cmd/
│   └── server/
│       └── main.go             # Server entry point
├── internal/
│   ├── handlers/               # HTTP request handlers
│   │   ├── auth_handler.go     # Authentication handlers
│   │   └── link_handler.go     # Link management handlers
│   ├── models/                 # Data models
│   │   ├── user.go
│   │   └── link.go
│   ├── service/                # Business logic
│   │   ├── auth_service.go
│   │   └── link_service.go
│   ├── repository/             # Database operations
│   │   ├── user_repository.go
│   │   └── link_repository.go
│   ├── routes/                 # Route definitions
│   │   └── routes.go
│   ├── middleware/             # Custom middleware
│   │   └── auth_middleware.go
│   ├── lib/                    # Utility libraries
│   │   ├── jwt.go
│   │   ├── password.go
│   │   └── slug_generator.go
│   ├── di/                     # Dependency injection
│   │   └── container.go
│   └── migrations/             # Database migrations
│       └── migrations.go
├── go.mod                      # Go dependencies
├── go.sum                      # Dependency lock
├── .env.example                # Environment variables template
└── main.go                     # (if applicable)
```

## 🎨 Frontend Features

### Pages Included

1. **Landing Page** (`src/pages/Landing.jsx`)
   - Application description
   - Call-to-action buttons
   - Login/Register links

2. **Registration Page** (`src/pages/Register.jsx`)
   - Email and password input
   - Form validation
   - Error messages
   - Link to login page

3. **Login Page** (`src/pages/Login.jsx`)
   - Email and password input
   - Form validation
   - Error messages
   - Link to registration page

4. **Dashboard** (`src/pages/Dashboard.jsx`)
   - Display all user's shortened links
   - Show original URL, shortened URL
   - Copy to clipboard button
   - Delete button for each link
   - Form to create new short links
   - Display of custom slug options

### Components

- **Navbar** (`src/components/Navbar.jsx`) - Navigation bar with login/logout
- **ProtectedRoute** (`src/components/ProtectedRoute.jsx`) - Route guard for authenticated pages
- **LinkCard** (`src/components/LinkCard.jsx`) - Individual link display card
- **LoadingSpinner** (`src/components/LoadingSpinner.jsx`) - Loading indicator

## 📦 Frontend Dependencies to Install

```bash
# Core dependencies
npm install react react-dom
npm install react-router-dom
npm install axios

# Redux
npm install @reduxjs/toolkit react-redux

# Styling
npm install -D tailwindcss postcss autoprefixer

# Optional but recommended
npm install react-toastify          # Notifications
npm install react-copy-to-clipboard # Copy functionality

# Dev tools
npm install -D vite @vitejs/plugin-react
```

## 🔐 Redux State Management

### Redux Slices Location

```
src/redux/slices/
├── authSlice.js      # Authentication state (user, token, login status)
└── linksSlice.js     # Links state (user links, loading, errors)
```

### Example authSlice.js Structure

```javascript
// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    // Handle async actions
  },
});

export default authSlice.reducer;
```

### Example linksSlice.js Structure

```javascript
// src/redux/slices/linksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const linksSlice = createSlice({
  name: 'links',
  initialState: {
    links: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    // Handle async actions
  },
});

export default linksSlice.reducer;
```

## 🔌 API Integration

### lib/api.js Setup

```javascript
// src/lib/api.js
import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor untuk menambah JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor untuk handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

## 🧪 Testing the Application

### Manual Testing Workflow

1. **Register**
   - Navigate to registration page
   - Enter email and password
   - Verify account created in database

2. **Login**
   - Enter credentials
   - Verify JWT token received
   - Check if redirected to dashboard

3. **Create Link**
   - Enter long URL
   - Leave slug blank (auto-generate) or enter custom
   - Verify link created and displayed

4. **Copy & Redirect**
   - Click copy button (if implemented)
   - Test redirect by visiting short URL
   - Verify HTTP 301 redirect

5. **Delete Link**
   - Click delete on a link
   - Verify link removed from list
   - Check soft delete in database

## Troubleshooting

### Frontend won't connect to backend
- Check if backend is running on `http://localhost:8080`
- Verify `REACT_APP_API_URL` in `.env`
- Check CORS settings in backend
- Check browser console for errors

### Redux state not updating
- Verify slice actions are correctly dispatched
- Check Redux DevTools (browser extension)
- Ensure reducers are properly connected

### Database connection errors
- Ensure PostgreSQL is running
- Verify database credentials in `.env`
- Check if database exists: `createdb url_shortener`

### Authentication issues
- Verify JWT_SECRET is set in backend `.env`
- Check token expiration time
- Ensure Authorization header format: `Bearer {token}`

### Port already in use
- Change `PORT` in backend `.env`
- Change port in frontend `vite.config.js`


## 🔐 Security Considerations

1. **JWT Tokens**
   - Tokens are short-lived (15-60 minutes)
   - No refresh tokens - users re-login when expired
   - Tokens stored in localStorage

2. **Password Security**
   - Minimum 6 characters
   - Hashed using bcrypt (Go backend)

3. **Slug Validation**
   - Reserved words prevented: api, login, register, dashboard
   - 3-50 characters, alphanumeric and hyphens only
   - Unique constraint in database

4. **CORS**
   - Backend should enable CORS for frontend URL only
   - Protected routes require valid JWT

## 📝 Design Decisions & Assumptions

### Authentication
- JWT tokens stored in localStorage
- 15-minute token expiration provides security without refresh token complexity
- Email-based authentication for user identification

### State Management
- Redux Toolkit for centralized state management
- Slices for auth and links management
- Async thunks for API calls

### Slug Generation
- 6-8 character random alphanumeric strings for auto-generated slugs
- Custom slugs validated for length, characters, and reserved words
- Unique constraint ensures no duplicate slugs (excluding soft-deleted)

### Frontend Architecture
- React hooks with Redux for state management
- Axios for HTTP requests with interceptors
- Tailwind CSS for rapid styling
- React Router for navigation

### Backend Architecture
- Layered architecture (handlers → service → repository)
- Dependency injection for loose coupling
- Middleware for JWT authentication
- Repository pattern for database operations

## 🚀 Deployment Notes

For production deployment:
- Change `GIN_MODE` to "release" in backend
- Update `JWT_SECRET` to strong random string
- Use environment variables from secure vault
- Enable HTTPS
- Set `REACT_APP_API_URL` to production backend URL
- Configure database backups

## 📧 Support & Questions

For issues or questions:
1. Check troubleshooting section above
2. Review API documentation
3. Check database schema
4. Verify environment variables
5. Check Redux DevTools for state issues

## 📄 License

This project was created as a development assessment task.

---

**Last Updated:** April 2026
**Version:** 1.0.0