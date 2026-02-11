import mongoose, { Document, Schema } from 'mongoose';

export interface IMedicalRecord extends Document {
    patientId: mongoose.Schema.Types.ObjectId;
    visitDate: Date;
    diagnosis: string;
    medications: string[];
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const medicalRecordSchema = new Schema<IMedicalRecord>(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            required: [true, 'Patient ID is required'],
        },
        visitDate: {
            type: Date,
            default: Date.now,
        },
        diagnosis: {
            type: String,
            required: [true, 'Diagnosis is required'],
            trim: true,
        },
        medications: {
            type: [String],
            default: [],
        },
        notes: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export const MedicalRecord = mongoose.model<IMedicalRecord>('MedicalRecord', medicalRecordSchema);
