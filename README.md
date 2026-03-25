# 🚀 Scalable REST API with Authentication & Role-Based Access

Complete, production-ready implementation of a scalable REST API with JWT authentication, role-based access control, and a React frontend UI.

## ✨ Project Overview

This project demonstrates enterprise-level backend development with:
- **Secure authentication** using JWT tokens
- **Role-based access control** (User/Admin permissions)
- **RESTful API design** with proper HTTP methods and status codes
- **Comprehensive data validation** using Joi
- **PostgreSQL database** with optimized queries
- **API documentation** using Swagger/OpenAPI
- **Modern React frontend** for API interaction
- **Production-ready** code structure and best practices

## 📁 Project Structure

```
Round 0/
├── backend/                          # Node.js/Express API Server
│   ├── src/
│   │   ├── config/                  # Configuration files
│   │   │   ├── database.js          # PostgreSQL connection pool
│   │   │   └── swagger.js           # Swagger/OpenAPI configuration
│   │   ├── controllers/             # Business logic
│   │   │   ├── authController.js    # User auth endpoints
│   │   │   └── taskController.js    # Task CRUD endpoints
│   │   ├── routes/                  # API routes/endpoints
│   │   │   ├── authRoutes.js        # Auth routes
│   │   │   └── taskRoutes.js        # Task routes with admin endpoints
│   │   ├── middleware/              # Express middleware
│   │   │   ├── authMiddleware.js    # JWT verification & role check
│   │   │   ├── errorHandler.js      # Global error handling
│   │   │   └── validationMiddleware.js # Input validation
│   │   ├── utils/                   # Utility functions
│   │   │   ├── jwt.js               # JWT token generation & verification
│   │   │   ├── password.js          # Password hashing (bcryptjs)
│   │   │   └── errors.js            # Custom error classes
│   │   ├── validators/              # Input validation schemas
│   │   │   ├── authValidator.js     # Auth input validation
│   │   │   └── taskValidator.js     # Task input validation
│   │   └── server.js                # Express app setup
│   ├── migrations/
│   │   └── run.js                   # Database migration script
│   ├── package.json                 # Dependencies
│   ├── .env.example                 # Environment template
│   ├── .gitignore
│   └── README.md                    # Backend documentation
│
├── frontend/                        # React.js Frontend Application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── TaskForm.js          # Task creation/edit form
│   │   │   ├── TaskList.js          # Task list display
│   │   │   └── ProtectedRoute.js    # Route guard for auth
│   │   ├── context/                 # React context for state
│   │   │   └── AuthContext.js       # Global auth state
│   │   ├── pages/                   # Page components
│   │   │   ├── Auth.js              # Login & Register pages
│   │   │   └── Dashboard.js         # Main dashboard
│   │   ├── services/                # API integration
│   │   │   └── api.js               # Axios instance & API calls
│   │   ├── App.js                   # Root component
│   │   └── index.js                 # Entry point
│   ├── package.json
│   └── README.md                    # Frontend documentation
│
├── SETUP_GUIDE.md                   # Detailed setup & deployment guide
├── API_TESTING_GUIDE.md            # Comprehensive API testing examples
└── README.md                        # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** v14+
- **PostgreSQL** v12+
- **npm** or **yarn**

### Backend Setup (5 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Edit .env with your database credentials
# Create PostgreSQL database
createdb scalable_api_db

# Run migrations (create tables)
npm run migrate

# Start development server
npm run dev
```

Backend runs on: **http://localhost:5000**
Swagger docs: **http://localhost:5000/api-docs**

### Frontend Setup (5 minutes)

```bash
# In another terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start React app
npm start
```

Frontend runs on: **http://localhost:3000**

## 📚 Features

### Backend Features ✅

#### Authentication & Authorization
- ✅ User registration with validation
- ✅ Secure login with password hashing (bcryptjs)
- ✅ JWT token generation & verification
- ✅ Role-based access control (User/Admin)
- ✅ Token expiration handling (7 days default)

#### API Endpoints
- ✅ **Auth**: Register, Login, Get Current User
- ✅ **Tasks (User)**: Create, Read, Update, Delete own tasks
- ✅ **Tasks (Admin)**: Read all tasks, Update any task, Delete any task
- ✅ **Filtering**: By status, priority, pagination
- ✅ **Versioning**: `/api/v1/` structure

#### Security
- ✅ Password hashing (bcryptjs with salt rounds: 10)
- ✅ JWT-based stateless authentication
- ✅ Input validation using Joi schemas
- ✅ SQL injection prevention (parameterized queries)
- ✅ CORS protection
- ✅ Security headers (Helmet)
- ✅ Error handling (no sensitive info exposed)

#### Database
- ✅ PostgreSQL with proper schema
- ✅ Optimized indexes for fast queries
- ✅ Foreign key relationships
- ✅ Cascade delete for data integrity
- ✅ Connection pooling

#### API Documentation
- ✅ Swagger/OpenAPI specification
- ✅ Interactive API explorer at `/api-docs`
- ✅ Documented request/response formats
- ✅ Example values and test data

### Frontend Features ✅

#### User Interface
- ✅ Beautiful, responsive design
- ✅ Registration page with validation
- ✅ Login page with error messages
- ✅ Protected dashboard (authentication required)
- ✅ Task creation form with all fields
- ✅ Task list with status and priority display
- ✅ Task editing inline
- ✅ Task deletion with confirmation
- ✅ Filter tasks by status and priority
- ✅ Real-time success/error notifications

#### State Management
- ✅ React Context API for authentication
- ✅ Token persistence in localStorage
- ✅ Protected routes
- ✅ Automatic logout on token expiration

#### Integration
- ✅ Axios HTTP client with interceptors
- ✅ Automatic token injection in headers
- ✅ Error handling and user feedback
- ✅ Loading states

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(50) DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
```

## 🔑 Test Credentials

After setup, you can test with:

```
Email: test@example.com
Password: test123456
```

Or register a new account in the frontend UI.

## 📖 API Documentation

### Key Endpoints

**Authentication:**
```
POST   /api/v1/auth/register     - Create new user
POST   /api/v1/auth/login        - Login user
GET    /api/v1/auth/me           - Get current user profile
```

**Tasks (User):**
```
GET    /api/v1/tasks             - Get user's tasks
GET    /api/v1/tasks/:id         - Get single task
POST   /api/v1/tasks             - Create task
PUT    /api/v1/tasks/:id         - Update task
DELETE /api/v1/tasks/:id         - Delete task
```

**Tasks (Admin):**
```
GET    /api/v1/tasks/admin/all   - Get all tasks
PUT    /api/v1/tasks/admin/:id   - Update any task
DELETE /api/v1/tasks/admin/:id   - Delete any task
```

See [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md) for detailed examples.

## 🔒 Security Features

1. **Password Security**
   - Bcryptjs hashing with salt rounds: 10
   - Never stored in plain text
   - Strong password requirements enforced

2. **JWT Authentication**
   - Stateless token-based system
   - 7-day expiration (configurable)
   - Refresh token support ready

3. **Authorization**
   - Role-based access control (RBAC)
   - User/Admin roles
   - Endpoint-level permissions

4. **Input Validation**
   - Joi schema validation
   - Email format checking
   - Password strength requirements
   - SQL injection prevention

5. **HTTP Security**
   - Helmet middleware for headers
   - CORS configured
   - X-Frame-Options, CSP, etc.

## 📈 Scalability

### Current Architecture
- ✅ Modular code structure
- ✅ Database indexing for performance
- ✅ Connection pooling
- ✅ Pagination support
- ✅ Error handling & logging

### Recommendations for Scale
1. **Caching**: Implement Redis for sessions and frequently accessed data
2. **Load Balancing**: Deploy multiple API instances behind Nginx/HAProxy
3. **Database**: Read replicas, partitioning for large datasets
4. **Microservices**: Separate auth, task, and user services
5. **Monitoring**: Prometheus, Datadog, or New Relic for metrics
6. **Containerization**: Docker for consistent deployment
7. **Orchestration**: Kubernetes for container management
8. **CI/CD**: GitHub Actions or Jenkins for automated deployment

See [SETUP_GUIDE.md](SETUP_GUIDE.md#scalability-architecture) for detailed scalability recommendations.

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access services:
# API: http://localhost:5000
# Frontend: http://localhost:3000
# Database: localhost:5432
```

## 📝 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your_secret_key_min_32_chars
JWT_EXPIRE=7d
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=scalable_api_db
DB_HOST=localhost
DB_PORT=5432
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api/v1
```

## 🧪 Testing

### Manual Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Login and save token
TOKEN="<token_from_response>"

# Create task
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "My Task"}'
```

See [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md) for comprehensive testing examples.

## 🚀 Deployment

### Production Checklist

- [ ] Environment variables properly configured
- [ ] Strong JWT secret (32+ characters)
- [ ] HTTPS enabled
- [ ] Database backups scheduled
- [ ] Error logging configured
- [ ] Rate limiting enabled
- [ ] Security headers verified
- [ ] Database indexes optimized
- [ ] Load testing completed
- [ ] Security audit done

### Deploy to Heroku

```bash
# Backend
cd backend
heroku create your-api-name
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main

# Frontend
cd frontend
heroku create your-frontend-name
git push heroku main
```

See [SETUP_GUIDE.md](SETUP_GUIDE.md#deployment) for detailed deployment instructions.

## 📚 Documentation

- [Backend README](backend/README.md) - Backend API documentation
- [Frontend README](frontend/README.md) - Frontend setup & features
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Complete setup & deployment
- [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md) - API endpoint testing

## 🎯 Assignment Completion

✅ **Backend (Primary Focus)**
- [x] User registration & login APIs with password hashing and JWT authentication
- [x] Role-based access (user vs admin)
- [x] CRUD APIs for secondary entity (Tasks)
- [x] API versioning (/api/v1/)
- [x] Error handling and validation
- [x] Swagger/API documentation
- [x] PostgreSQL database with schema

✅ **Frontend (Supportive)**
- [x] Built with React.js
- [x] Register & login users
- [x] Protected dashboard (JWT required)
- [x] Task CRUD operations
- [x] Error/success messages

✅ **Security & Scalability**
- [x] Secure JWT token handling
- [x] Input sanitization & validation
- [x] Scalable project structure
- [x] Recommendations for caching, logging, Docker

✅ **Deliverables**
- [x] Complete backend code
- [x] Working APIs for authentication & CRUD
- [x] React frontend UI
- [x] Swagger API documentation
- [x] Setup & deployment guides
- [x] Scalability recommendations

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - Open for personal and commercial use.

## 🆘 Support

For questions and issues:
1. Check API docs at `http://localhost:5000/api-docs`
2. Review code comments and structure
3. See API_TESTING_GUIDE.md for endpoint examples
4. Check SETUP_GUIDE.md for configuration

---

## 🎉 Ready to Go!

Everything is set up and ready for:
- ✅ Development
- ✅ Testing
- ✅ Deployment
- ✅ Scaling

Start with the [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions on getting started locally or deploying to production!
