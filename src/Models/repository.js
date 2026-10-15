import con from "../config/db.js"; 

const getAllTasks = async () => {
  const [rows] = await con.query("SELECT * FROM tasks");
  return rows;
};

const getCompletedTasks = async () => {
  const [rows] = await con.query("SELECT * FROM tasks WHERE isCompleted = true");
  return rows;
};

const getTaskById = async (id) => {
  console.log("Querying MySQL for ID:", id); 
  const [rows] = await con.query("SELECT * FROM tasks WHERE id = ?", [id]);
  console.log("MySQL returned rows:", rows); 
  return rows[0];
};

const getTasksByStatus = async (statusValue) => {
  const [rows] = await con.query("SELECT * FROM tasks WHERE status = ?", [statusValue]);
  return rows;
};


const createTask = async (task) => {

  const { id, title, description, isCompleted, start_time, end_time, status } = task;
  
  await con.query(
    "INSERT INTO tasks (id, title, description, isCompleted, start_time, end_time, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, title, description, isCompleted || false, start_time || null, end_time || null, status || null]
  );
  
  return task;
};

const updateTask = async (id, task) => {
  const { title, description, isCompleted, start_time, end_time,status } = task;
  await con.query(
    "UPDATE tasks SET title = ?, description = ?, isCompleted = ?, start_time = ?, end_time = ?, status = ? WHERE id = ?",
    [
      title || null, 
      description || null, 
      isCompleted ?? false, 
      start_time || null, 
      end_time || null, 
      status || null,
      id
    ]
  );
  return { id, ...task };
};

const deleteTask = async (id) => {
  await con.query("DELETE FROM tasks WHERE id = ?", [id]);
};  

const deleteAllTasks = async () => {
  await con.query("DELETE FROM tasks");
};

const deleteCompletedTasks = async () => {
  await con.query("DELETE FROM tasks WHERE isCompleted = true");
};

export { 
  getAllTasks, 
  getTaskById, 
  getTasksByStatus,
  getCompletedTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
  deleteAllTasks, 
  deleteCompletedTasks 
};