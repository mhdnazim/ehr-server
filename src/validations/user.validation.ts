import { Request, Response, NextFunction } from 'express';

export interface CreateUserRequest {
  name: string;
  email: string;
  age?: number;
}

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email, age } = req.body;

  // Check required fields
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: 'Name is required and must be a non-empty string',
    });
    return;
  }

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: 'Email is required and must be a non-empty string',
    });
    return;
  }

  // Validate email format
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: 'Please provide a valid email address',
    });
    return;
  }

  // Validate age if provided
  if (age !== undefined) {
    if (typeof age !== 'number' || age < 0) {
      res.status(400).json({
        success: false,
        message: 'Age must be a positive number',
      });
      return;
    }
  }

  next();
};

