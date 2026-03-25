import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().required().min(3).max(100).messages({
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title must not exceed 100 characters',
    'any.required': 'Title is required',
  }),
  description: Joi.string().max(500).messages({
    'string.max': 'Description must not exceed 500 characters',
  }),
  status: Joi.string().valid('pending', 'in_progress', 'completed').default('pending'),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().max(500),
  status: Joi.string().valid('pending', 'in_progress', 'completed'),
  priority: Joi.string().valid('low', 'medium', 'high'),
});
