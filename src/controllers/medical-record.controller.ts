import { Request, Response } from 'express';
import { createMedicalRecord, getMedicalRecordsByPatientId, getMedicalRecordById, updateMedicalRecord, deleteMedicalRecord } from '../services/medical-record.service';
import { getPatientById } from '../services/patient.service';

export const addMedicalRecord = async (req: Request, res: Response): Promise<void> => {
    try {
        const { patientId } = req.body;

        // Verify patient exists
        const patient = await getPatientById(patientId);
        if (!patient) {
            res.status(404).json({
                success: false,
                message: 'Patient not found',
            });
            return;
        }

        const record = await createMedicalRecord(req.body);
        res.status(201).json({
            success: true,
            message: 'Medical record added successfully',
            data: record,
        });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((val: any) => val.message);
            res.status(400).json({
                success: false,
                message: 'Validation Error',
                error: messages,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to add medical record',
        });
    }
};

export const getPatientHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // Patient ID
        const records = await getMedicalRecordsByPatientId(id as string);
        res.status(200).json({
            success: true,
            count: records.length,
            data: records,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch medical history',
            error: error.message,
        });
    }
};

export const getMedicalRecord = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const record = await getMedicalRecordById(id as string);
        if (!record) {
            res.status(404).json({
                success: false,
                message: 'Medical record not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: record,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch medical record',
            error: error.message,
        });
    }
};

export const updateRecord = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const record = await updateMedicalRecord(id as string, req.body);
        if (!record) {
            res.status(404).json({
                success: false,
                message: 'Medical record not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Medical record updated successfully',
            data: record,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to update medical record',
            error: error.message,
        });
    }
};

export const removeMedicalRecord = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const record = await deleteMedicalRecord(id as string);
        if (!record) {
            res.status(404).json({
                success: false,
                message: 'Medical record not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Medical record deleted successfully',
            data: record,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete medical record',
            error: error.message,
        });
    }
};
