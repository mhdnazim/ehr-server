import mongoose, { Document, Schema } from 'mongoose';

export interface IPatient extends Document {
    name: string;
    age: number;
    gender: string;
    contact: string;
    address?: string;
    createdAt: Date;
    updatedAt: Date;
}

const patientSchema = new Schema<IPatient>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [0, 'Age must be a positive number'],
        },
        gender: {
            type: String,
            required: [true, 'Gender is required'],
            enum: ['Male', 'Female', 'Other'],
        },
        contact: {
            type: String,
            required: [true, 'Contact number is required'],
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Patient = mongoose.model<IPatient>('Patient', patientSchema);
