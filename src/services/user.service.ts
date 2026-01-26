import { IUser } from '../models/user.model';
import { User } from '../models/user.model';

export interface CreateUserData {
  name: string;
  email: string;
  age?: number;
}

export const createUser = async (userData: CreateUserData): Promise<IUser> => {
  try {
    const user = new User(userData);
    const savedUser = await user.save();
    return savedUser;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error('Email already exists');
    }
    throw error;
  }
};

export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find().sort({ createdAt: -1 });
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

