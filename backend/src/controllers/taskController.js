import pool from '../config/database.js';
import { AppError } from '../utils/errors.js';

/**
 * @desc Get all tasks
 * @route GET /api/v1/tasks
 */
export const getTasks = async (req, res, next) => {
  try {
    const { status, priority, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM tasks WHERE user_id = $1';
    const params = [req.user.userId];
    let paramIndex = 2;

    if (status) {
      query += ` AND status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    if (priority) {
      query += ` AND priority = $${paramIndex}`;
      params.push(priority);
      paramIndex++;
    }

    // Get total count
    const countResult = await pool.query(
      `SELECT COUNT(*) as count FROM tasks WHERE user_id = $1 ${status ? `AND status = $2` : ''} ${priority && !status ? `AND priority = $2` : priority && status ? `AND priority = $3` : ''}`,
      params.slice(0, status && priority ? 3 : status || priority ? 2 : 1)
    );

    const total = parseInt(countResult.rows[0].count);

    query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    res.status(200).json({
      success: true,
      data: result.rows.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
      })),
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get single task
 * @route GET /api/v1/tasks/:id
 */
export const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      throw new AppError('Task not found', 404);
    }

    const task = result.rows[0];

    res.status(200).json({
      success: true,
      data: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
      },
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Create new task
 * @route POST /api/v1/tasks
 */
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority } = req.validatedBody;

    const result = await pool.query(
      'INSERT INTO tasks (user_id, title, description, status, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.userId, title, description, status, priority]
    );

    const task = result.rows[0];

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
      },
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Update task
 * @route PUT /api/v1/tasks/:id
 */
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.validatedBody;

    // Check if task exists and belongs to user
    const taskCheck = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    );

    if (taskCheck.rows.length === 0) {
      throw new AppError('Task not found or you do not have permission', 404);
    }

    // Build update query
    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramIndex}`);
      values.push(title);
      paramIndex++;
    }

    if (description !== undefined) {
      updates.push(`description = $${paramIndex}`);
      values.push(description);
      paramIndex++;
    }

    if (status !== undefined) {
      updates.push(`status = $${paramIndex}`);
      values.push(status);
      paramIndex++;
    }

    if (priority !== undefined) {
      updates.push(`priority = $${paramIndex}`);
      values.push(priority);
      paramIndex++;
    }

    updates.push(`updated_at = NOW()`);

    values.push(id);

    const result = await pool.query(
      `UPDATE tasks SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );

    const task = result.rows[0];

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
      },
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Delete task
 * @route DELETE /api/v1/tasks/:id
 */
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      throw new AppError('Task not found or you do not have permission', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get all tasks (Admin only)
 * @route GET /api/v1/admin/tasks
 */
export const getAllTasksAdmin = async (req, res, next) => {
  try {
    const { userId, status, priority, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM tasks';
    const params = [];
    let paramIndex = 1;

    if (userId) {
      query += ` WHERE user_id = $${paramIndex}`;
      params.push(userId);
      paramIndex++;
    }

    if (status) {
      query += params.length > 0 ? ` AND status = $${paramIndex}` : ` WHERE status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    if (priority) {
      query += params.length > 0 ? ` AND priority = $${paramIndex}` : ` WHERE priority = $${paramIndex}`;
      params.push(priority);
      paramIndex++;
    }

    // Get total count
    const countResult = await pool.query(
      `SELECT COUNT(*) as count FROM tasks ${params.length > 0 ? 'WHERE ' + params.map((_, i) => {
        if (i === 0 && userId) return `user_id = $1`;
        if (status && i === (userId ? 1 : 0)) return `status = $${i + 1}`;
        if (priority) return `priority = $${i + 1}`;
        return '';
      }).filter(Boolean).join(' AND ') : ''}`,
      params
    );

    const total = parseInt(countResult.rows[0].count);

    query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    res.status(200).json({
      success: true,
      data: result.rows.map((task) => ({
        id: task.id,
        userId: task.user_id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
      })),
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Update any task (Admin only)
 * @route PUT /api/v1/admin/tasks/:id
 */
export const updateTaskAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.validatedBody;

    // Check if task exists
    const taskCheck = await pool.query(
      'SELECT * FROM tasks WHERE id = $1',
      [id]
    );

    if (taskCheck.rows.length === 0) {
      throw new AppError('Task not found', 404);
    }

    // Build update query
    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramIndex}`);
      values.push(title);
      paramIndex++;
    }

    if (description !== undefined) {
      updates.push(`description = $${paramIndex}`);
      values.push(description);
      paramIndex++;
    }

    if (status !== undefined) {
      updates.push(`status = $${paramIndex}`);
      values.push(status);
      paramIndex++;
    }

    if (priority !== undefined) {
      updates.push(`priority = $${paramIndex}`);
      values.push(priority);
      paramIndex++;
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const result = await pool.query(
      `UPDATE tasks SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );

    const task = result.rows[0];

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: {
        id: task.id,
        userId: task.user_id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
      },
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Delete any task (Admin only)
 * @route DELETE /api/v1/admin/tasks/:id
 */
export const deleteTaskAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      throw new AppError('Task not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
