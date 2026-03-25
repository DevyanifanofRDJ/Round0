# Task Manager Frontend

A modern React-based frontend for the Scalable REST API with full task management capabilities.

## Features

- 🔐 Secure user authentication (registration & login)
- 📝 Complete task management (CRUD operations)
- 🎨 Responsive and modern UI
- 🔔 Real-time error and success notifications
- 📱 Mobile-friendly design
- ⚡ Fast and optimized performance

## Setup & Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Create environment file:**
```bash
echo "REACT_APP_API_URL=http://localhost:5000/api/v1" > .env
```

3. **Start development server:**
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🔑 Usage

### Register
1. Go to `/register`
2. Enter email, first name, last name, and password
3. Submit to create account
4. Automatically logged in and redirected to dashboard

### Login
1. Go to `/login`
2. Enter email and password
3. Submit to login
4. Redirected to dashboard

### Dashboard
Once logged in, you can:

**Create Tasks**
- Fill task form on the left
- Add title (required), description, status, and priority
- Click "Create Task"

**View Tasks**
- See all your tasks listed on the right
- Filter by status or priority
- Tasks show creation date and current status

**Edit Tasks**
- Click "Edit" on any task
- Modify title, description, status, or priority
- Click "Save" or "Cancel"

**Delete Tasks**
- Click "Delete" on any task
- Confirm deletion in dialog
- Task immediately removed

**Logout**
- Click "Logout" button in top right
- Logged out and redirected to login page

## 🏗️ Project Structure

```
src/
├── components/
│   ├── TaskForm.js         # Form to create/edit tasks
│   ├── TaskList.js         # Display list of tasks
│   └── ProtectedRoute.js   # Authentication guard
├── context/
│   └── AuthContext.js      # Global auth state management
├── pages/
│   ├── Auth.js             # Login & Register pages
│   └── Dashboard.js        # Main dashboard page
├── services/
│   └── api.js              # API integration layer
├── App.js                  # Main app component
└── index.js                # Entry point
```

## 🔗 API Integration

The frontend connects to the backend API at `http://localhost:5000/api/v1`

### API Endpoints Used

**Authentication**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user profile

**Tasks**
- `GET /tasks` - Get user's tasks
- `GET /tasks/:id` - Get single task
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## 🎨 Styling

- **Colors**: Gradient purple theme (#667eea to #764ba2)
- **Responsive**: Mobile-first design that scales to desktop
- **Components**: Modular CSS files for each component
- **Utilities**: Shared button and form styles in App.css

## 🔒 Security Features

- JWT tokens stored in localStorage
- Authorization header added to all API requests
- Protected routes require authentication
- Session persists across page refreshes
- Automatic logout removes stored token

## 📦 Dependencies

- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing
- `axios` - HTTP client for API calls

## 🚀 Build for Production

```bash
npm run build
```

Creates optimized production build in `build/` folder

## 🧪 Testing the App

1. Start backend at `http://localhost:5000`
2. Start frontend with `npm start`
3. Register a new account
4. Create, read, update, and delete tasks
5. Test filters by status and priority
6. Logout and log back in

## 🐛 Troubleshooting

### API Connection Failed
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in `.env` file
- Check browser console for CORS errors

### Tasks Not Loading
- Verify JWT token is valid
- Check network tab in DevTools
- Ensure backend database is running

### Form Validation Errors
- Check error messages displayed
- Verify all required fields are filled
- Check password is at least 6 characters

## 📝 Environment Variables

```env
REACT_APP_API_URL=http://localhost:5000/api/v1
```

## 🔄 State Management

Uses React Context API for global state:
- `AuthContext` - Handles user authentication state
- `user` - Current user profile
- `token` - JWT authentication token
- `isAuthenticated` - Authentication status

## 🎯 Future Enhancements

- [ ] Dark mode toggle
- [ ] Task categories/tags
- [ ] Task due dates
- [ ] Task comments
- [ ] User profile editing
- [ ] Password reset
- [ ] Two-factor authentication
- [ ] Email notifications

## 📄 License

MIT License
