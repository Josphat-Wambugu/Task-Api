import express from 'express';
import {
  getAllTasksController,
  getTaskByIdController,
  getCompletedTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
  deleteAllTasksController,
  deleteCompletedTasksController,
  getTasksByStatusController
} from '../Controllers/controller.js';
import { getCompletedTasks } from '../Models/repository.js';

const router = express.Router();

// Get all tasks
router.get('/', getAllTasksController);


router.get('/status/:isCompleted', getCompletedTasksController);


router.get('/status/:statusValue', getTasksByStatusController);

// Get a single task by ID
router.get('/:id', getTaskByIdController);

// Create a new task
router.post('/', createTaskController);

// Update a task by ID
router.put('/:id', updateTaskController);

// Delete all completed tasks
router.delete('/completed', deleteCompletedTasksController);

// Delete all tasks
router.delete('/', deleteAllTasksController);

// Delete a single task by ID
router.delete('/:id', deleteTaskController);

export default router;