import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController';

const userRoutes = Router();

userRoutes.post('/', createUser);
userRoutes.get('/', getAllUsers);
userRoutes.put('/:id', updateUser);
userRoutes.get('/:id', getUserById);
userRoutes.delete('/:id', deleteUser);

export default userRoutes;
