import { Router } from 'express';
import { addUser, getUsers, getUser } from '../controllers/user.controller';
import { validateCreateUser } from '../validations/user.validation';

const router = Router();

// POST /api/users - Create a new user
router.post('/', validateCreateUser, addUser);

// GET /api/users - Get all users
router.get('/', getUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', getUser);

export default router;

