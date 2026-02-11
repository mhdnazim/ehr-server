import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/httpError';

const patientSchema = z.object({
    name: z.string().min(1, 'Name is required').trim(),
    age: z.number().int().positive('Age must be a positive integer'),
    gender: z.enum(['Male', 'Female', 'Other'], {
        message: 'Gender must be Male, Female, or Other'
    }),
    contact: z.string().min(1, 'Contact number is required').trim(),
    address: z.string().optional(),
});

export const validateCreatePatient = (req: Request, res: Response, next: NextFunction) => {
    const result = patientSchema.safeParse(req.body);
    if (!result.success) {
        const errorMessage = result.error.issues.map((err) => err.message).join(', ');
        return next(HttpError.badRequest(errorMessage));
    }
    req.body = result.data;
    next();
};

export const validateUpdatePatient = (req: Request, res: Response, next: NextFunction) => {
    const result = patientSchema.partial().safeParse(req.body);
    if (!result.success) {
        const errorMessage = result.error.issues.map((err) => err.message).join(', ');
        return next(HttpError.badRequest(errorMessage));
    }
    req.body = result.data;
    next();
};
