import { Router } from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/todoController';

const taskRoutes = Router();

taskRoutes.post('/', createTask);
taskRoutes.get('/', getAllTasks);
taskRoutes.put('/:id', updateTask);
taskRoutes.get('/:id', getTaskById);
taskRoutes.delete('/:id', deleteTask);

export default taskRoutes;
