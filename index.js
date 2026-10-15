
import express from 'express';
import cors from 'cors';
import taskRoutes from './src/routes/routes.js'; // Adjust path if your folder structure differs

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Task API is running successfully!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});