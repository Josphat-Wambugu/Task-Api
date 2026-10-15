import crypto from 'crypto';
import * as taskRepository from '../Models/repository.js';


const formatForMySQL = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  // Check if date is valid
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format provided');
  }
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

export const createTask = async (taskData) => {
  const id = crypto.randomUUID();

  if (taskData.start_time && taskData.end_time) {
    if (new Date(taskData.start_time) > new Date(taskData.end_time)) {
      throw new Error('End time cannot be earlier than start time');
    }
  }

  const newTask = {
    id,
    title: taskData.title,
    description: taskData.description || null,
    isCompleted: taskData.isCompleted || false,
    start_time: formatForMySQL(taskData.start_time), 
    end_time: formatForMySQL(taskData.end_time),  
    status: taskData.status || null,
  };

  return await taskRepository.createTask(newTask);
};


export const getAllTasks = async () => { return await taskRepository.getAllTasks(); };

export const getTaskById = async (id) => { return await taskRepository.getTaskById(id); };

export const getCompletedTasks = async (isCompleted) => { return await taskRepository.getCompletedTasks(isCompleted); };

export const getTasksByStatus = async (statusValue) => { return await taskRepository.getTasksByStatus(statusValue); };

export const updateTask = async (id, taskData) => { 
    const updatedTask = {
    
    title: taskData.title,
    description: taskData.description || null,
    isCompleted: taskData.isCompleted || false,
    start_time: formatForMySQL(taskData.start_time),
    end_time: formatForMySQL(taskData.end_time),  
    status: taskData.status || null,   
  };
  return await taskRepository.updateTask(id, updatedTask); };


export const deleteTask = async (id) => { return await taskRepository.deleteTask(id); };


export const deleteAllTasks = async () => { return await taskRepository.deleteAllTasks(); };


export const deleteCompletedTasks = async () => { return await taskRepository.deleteCompletedTasks(); };