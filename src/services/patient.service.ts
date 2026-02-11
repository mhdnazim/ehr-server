import { IPatient, Patient } from '../models/patient.model';

export interface CreatePatientData {
    name: string;
    age: number;
    gender: string;
    contact: string;
    address?: string;
}

export const createPatient = async (patientData: CreatePatientData): Promise<IPatient> => {
    const patient = new Patient(patientData);
    return await patient.save();
};

export const updatePatientById = async (id: string, patientData: CreatePatientData): Promise<IPatient | null> => {
    return await Patient.findByIdAndUpdate(id, patientData, { new: true });
};

export const getAllPatients = async (): Promise<IPatient[]> => {
    return await Patient.find().sort({ createdAt: -1 });
};

export const getPatientById = async (id: string): Promise<IPatient | null> => {
    return await Patient.findById(id);
};

export const deletePatient = async (id: string): Promise<IPatient | null> => {
    return await Patient.findByIdAndDelete(id);
};
