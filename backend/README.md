# Scalable REST API with Authentication & Role-Based Access

A production-ready REST API with JWT authentication, role-based access control, and comprehensive CRUD operations for task management. Includes a React frontend UI for complete integration.

## 📋 Features

### Backend
✅ **User Management**
- Secure user registration & login
- Password hashing with bcryptjs
- JWT-based authentication
- Role-based access control (User/Admin)

✅ **Task Management (CRUD)**
- Create, read, update, delete tasks
- Filter by status and priority
- Pagination support
- Admin endpoints for managing all tasks

✅ **Security & Best Practices**
- Input validation with Joi
- Error handling & proper HTTP status codes
- CORS protection
- Helmet for security headers
- Environment-based configuration

✅ **API Documentation**
- Swagger/OpenAPI documentation
- Interactive API testing at `/api-docs`

✅ **Database**
- PostgreSQL with proper schema
- Indexed queries for performance
- Relationships & foreign keys

### Frontend
✅ **User Interfaces**
- Registration & login pages
- Protected dashboard
- Task CRUD operations
- Responsive design
- Error/success notifications

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn

### Backend Setup

1. **Clone and navigate to backend:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Setup environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

DB_USER=postgres
DB_PASSWORD=your_db_password
DB_NAME=scalable_api_db
DB_HOST=localhost
DB_PORT=5432

CORS_ORIGIN=http://localhost:3000
```

4. **Create PostgreSQL database:**
```bash
createdb scalable_api_db
```

5. **Run migrations:**
```bash
npm run migrate
```

6. **Start the server:**
```bash
npm run dev
```

The API will be available at `http://localhost:5000`
API Documentation at `http://localhost:5000/api-docs`

### Frontend Setup

1. **Navigate to frontend:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env file:**
```bash
echo "REACT_APP_API_URL=http://localhost:5000/api/v1" > .env
```

4. **Start the application:**
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user"
    },
    "token": "eyJhbGc..."
  }
}
```

#### Login User
```
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {...},
    "token": "eyJhbGc..."
  }
}
```

#### Get Current User
```
GET /api/v1/auth/me
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Task Endpoints

#### Get All Tasks (User)
```
GET /api/v1/tasks?status=pending&priority=high&page=1&limit=10
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Complete project",
      "description": "Finish the REST API",
      "status": "in_progress",
      "priority": "high",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

#### Get Single Task
```
GET /api/v1/tasks/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the REST API",
    "status": "in_progress",
    "priority": "high",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Create Task
```
POST /api/v1/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New task",
  "description": "Task description",
  "status": "pending",
  "priority": "medium"
}

Response: 201 Created
{
  "success": true,
  "message": "Task created successfully",
  "data": {...}
}
```

#### Update Task
```
PUT /api/v1/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed",
  "priority": "high"
}

Response: 200 OK
{
  "success": true,
  "message": "Task updated successfully",
  "data": {...}
}
```

#### Delete Task
```
DELETE /api/v1/tasks/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Task deleted successfully"
}
```

### Admin Endpoints

#### Get All Tasks (Admin)
```
GET /api/v1/tasks/admin/all?userId=1&status=pending&page=1&limit=10
Authorization: Bearer <admin_token>

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": 1,
      "userId": 1,
      "title": "Task",
      "description": "Description",
      "status": "pending",
      "priority": "medium",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {...}
}
```

#### Update Any Task (Admin)
```
PUT /api/v1/tasks/admin/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "completed"
}

Response: 200 OK
```

#### Delete Any Task (Admin)
```
DELETE /api/v1/tasks/admin/:id
Authorization: Bearer <admin_token>

Response: 200 OK
```

## 🗄️ Database Schema

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

## 🔒 Security Features

1. **Password Security**
   - Passwords hashed with bcryptjs (salt rounds: 10)
   - Passwords never stored in plain text

2. **JWT Authentication**
   - Stateless token-based authentication
   - 7-day token expiration
   - Token verification on protected routes

3. **Input Validation**
   - Email format validation
   - Password minimum length requirement
   - Request body validation with Joi
   - SQL injection protection through parameterized queries

4. **CORS & Headers**
   - Helmet middleware for security headers
   - CORS configured for frontend origin
   - CSP, X-Frame-Options, X-Content-Type-Options headers

5. **Error Handling**
   - Proper HTTP status codes
   - No sensitive information in error messages
   - Input sanitization

## 📈 Scalability Considerations

### Current Architecture
- **Modular Structure**: Controllers, routes, middleware, validators separated
- **Database Indexes**: Optimized queries for common filters
- **Pagination**: Implemented for list endpoints
- **Connection Pooling**: PostgreSQL connection pool configured

### Production Scalability Recommendations

1. **Caching**
   - Implement Redis for user sessions and frequently accessed data
   - Cache task listings for better performance
   - Example: Cache tasks by user ID with TTL

2. **Load Balancing**
   - Deploy multiple API instances behind a load balancer (Nginx, HAProxy)
   - Use Docker containers for easy scaling

3. **Database Optimization**
   - Add more indexes based on usage patterns
   - Implement read replicas for query scaling
   - Consider partitioning large tables

4. **Microservices**
   - Separate authentication service
   - Independent task management service
   - User service with separate database

5. **Monitoring & Logging**
   - Winston or Morgan for logging
   - Prometheus for metrics
   - ELK stack for centralized logging
   - APM tools (New Relic, Datadog)

6. **Deployment**
   - Docker containerization
   - Kubernetes orchestration
   - CI/CD pipeline (GitHub Actions, Jenkins)
   - Blue-green deployment strategy

7. **Rate Limiting**
   - Implement rate limiting middleware
   - Prevent abuse and DDoS attacks

8. **API Versioning**
   - Current: `/api/v1/`
   - Easy to introduce `/api/v2/` for backward compatibility

## 🧪 Testing

### Testing Endpoints with Curl

```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get current user (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer TOKEN"

# Create task
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "description": "Task description",
    "status": "pending",
    "priority": "medium"
  }'
```

## 🔐 Creating Test Admin User

To create an admin user for testing:

```sql
-- Connect to your database
psql scalable_api_db

-- Insert admin user (password: admin123 hashed)
INSERT INTO users (email, password, first_name, last_name, role)
VALUES (
  'admin@example.com',
  '$2a$10$YOUR_HASHED_PASSWORD_HERE',
  'Admin',
  'User',
  'admin'
);
```

## 📝 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── swagger.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validationMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── password.js
│   │   └── errors.js
│   ├── validators/
│   │   ├── authValidator.js
│   │   └── taskValidator.js
│   └── server.js
├── migrations/
│   └── run.js
├── package.json
├── .env.example
└── README.md

frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TaskForm.js
│   │   ├── TaskList.js
│   │   └── ProtectedRoute.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Auth.js
│   │   └── Dashboard.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🚀 Deployment

### Docker Deployment

**Backend Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY src ./src
COPY migrations ./migrations
EXPOSE 5000
CMD ["npm", "start"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
```

### Heroku Deployment

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

## 📋 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
JWT_SECRET=change_this_to_a_long_random_string
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

## 🤝 Contributing

Feel free to submit pull requests and open issues for bugs or feature requests.

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes.

## 🆘 Support

For issues and questions:
1. Check the API documentation at `/api-docs`
2. Review the code comments
3. Check PostgreSQL connection settings
4. Verify JWT token is being sent correctly

## 🎯 Assignment Completion Checklist

✅ Backend (Primary Focus)
- [x] User registration & login APIs with password hashing and JWT authentication
- [x] Role-based access (user vs admin)
- [x] CRUD APIs for tasks (secondary entity)
- [x] API versioning (/api/v1/)
- [x] Error handling and validation
- [x] Swagger/API documentation
- [x] Database schema (PostgreSQL)

✅ Frontend (Supportive)
- [x] Built with React.js
- [x] Register & login users
- [x] Access protected dashboard (JWT required)
- [x] Perform CRUD actions on tasks
- [x] Error/success messages from API responses

✅ Security & Scalability
- [x] Secure JWT token handling
- [x] Input sanitization & validation
- [x] Scalable project structure for new modules
- [x] Recommendations for caching, logging, Docker deployment

✅ Deliverables
- [x] Backend project on GitHub with README
- [x] Working APIs for authentication & CRUD
- [x] Basic frontend UI connecting to APIs
- [x] Swagger API documentation
- [x] Scalability notes (see above)
