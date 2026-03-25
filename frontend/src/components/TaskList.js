import React, { useState } from 'react';
import './TaskList.css';

const TaskList = ({ tasks, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditClick = (task) => {
    setEditingId(task.id);
    setEditData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (taskId) => {
    await onUpdate(taskId, editData);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  if (tasks.length === 0) {
    return <div className="empty-state">No tasks found. Create one to get started!</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className={`task-card priority-${task.priority}`}>
          {editingId === task.id ? (
            <div className="task-edit-form">
              <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleEditChange}
                className="edit-input"
              />
              <textarea
                name="description"
                value={editData.description}
                onChange={handleEditChange}
                className="edit-textarea"
              ></textarea>
              <div className="edit-row">
                <select
                  name="status"
                  value={editData.status}
                  onChange={handleEditChange}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <select
                  name="priority"
                  value={editData.priority}
                  onChange={handleEditChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="edit-actions">
                <button
                  onClick={() => handleSaveEdit(task.id)}
                  className="btn btn-sm btn-success"
                >
                  Save
                </button>
                <button onClick={handleCancel} className="btn btn-sm btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className={`badge badge-${task.status}`}>{task.status}</span>
              </div>
              {task.description && (
                <p className="task-description">{task.description}</p>
              )}
              <div className="task-footer">
                <div className="task-meta">
                  <span className={`priority-badge priority-${task.priority}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                  <span className="task-date">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="task-actions">
                  <button
                    onClick={() => handleEditClick(task)}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
