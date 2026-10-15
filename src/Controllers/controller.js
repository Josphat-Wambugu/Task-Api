import { createTask,getAllTasks,getTaskById,getCompletedTasks,updateTask,deleteAllTasks,deleteCompletedTasks,deleteTask}from '../Services/services.js';

export const getAllTasksController = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all tasks' });
  }
};

export const getTaskByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await getTaskById(id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task by id' });
  }
};

export const getCompletedTasksController = async (req, res) => {
  const { isCompleted } = req.params;
  try {
    const tasks = await getCompletedTasks(isCompleted);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch completed tasks' });
  }
};

export const createTaskController = async (req, res) => {
  const task = req.body;
  try {
    const newTask = await createTask(task);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("EXACT SQL ERROR:", error); // <-- Add this line
    res.status(500).json({ error: 'Failed to create task', details: error.message });
  }
};

export const updateTaskController = async (req, res) => {
  const { id } = req.params;
  const task = req.body;
  try {
    const updatedTask = await updateTask(id, task);
    res.json(updatedTask);
  } catch (error) {
    console.error("EXACT SQL ERROR:", error);
    res.status(500).json({ error: 'Failed to update task' ,details: error.message});
  }
};

export const deleteTaskController = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTask(id);
    res.status(204).send();
  } catch (error) {
    console.error("EXACT SQL ERROR:", error);
    res.status(500).json({ error: 'Failed to delete task', details: error.message });
  }
};      
 

export const deleteAllTasksController = async (req, res) => {
  try {
    await deleteAllTasks();
    res.status(204).send();
  } catch (error) {
    console.error("EXACT SQL ERROR:", error);
    res.status(500).json({ error: 'Failed to delete all tasks', details: error.message });
  }
};


export const deleteCompletedTasksController = async (req, res) => {
  try {
    await deleteCompletedTasks();
    res.status(204).send();
  } catch (error) {
    console.error("EXACT SQL ERROR:", error);
    res.status(500).json({ error: 'Failed to delete completed tasks', details: error.message });
  }
};
