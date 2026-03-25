import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { taskAPI, authAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, setLoading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '' });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadUserInfo();
    loadTasks();
  }, [filters]);

  const loadUserInfo = async () => {
    try {
      const response = await authAPI.getMe();
      setUserInfo(response.data.data);
    } catch (error) {
      console.error('Failed to load user info:', error);
    }
  };

  const loadTasks = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;

      const response = await taskAPI.getTasks(params);
      setTasks(response.data.data);
      setErrors([]);
    } catch (error) {
      setErrors([error.response?.data?.message || 'Failed to load tasks']);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const response = await taskAPI.createTask(taskData);
      setTasks([response.data.data, ...tasks]);
      setSuccess('Task created successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setErrors([error.response?.data?.message || 'Failed to create task']);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskAPI.deleteTask(taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
      setSuccess('Task deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setErrors([error.response?.data?.message || 'Failed to delete task']);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const response = await taskAPI.updateTask(taskId, updates);
      setTasks(tasks.map((t) => (t.id === taskId ? response.data.data : t)));
      setSuccess('Task updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setErrors([error.response?.data?.message || 'Failed to update task']);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Dashboard</h1>
          <div className="user-info">
            {userInfo && (
              <span>Welcome, {userInfo.firstName} {userInfo.lastName}</span>
            )}
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {errors.length > 0 && (
          <div className="error-box">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        {success && <div className="success-box">{success}</div>}

        <div className="dashboard-content">
          <div className="task-form-section">
            <h2>Create New Task</h2>
            <TaskForm onSubmit={handleAddTask} />
          </div>

          <div className="task-list-section">
            <h2>Your Tasks</h2>
            <div className="filters">
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={filters.priority}
                onChange={(e) =>
                  setFilters({ ...filters, priority: e.target.value })
                }
              >
                <option value="">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <TaskList
              tasks={tasks}
              onDelete={handleDeleteTask}
              onUpdate={handleUpdateTask}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
