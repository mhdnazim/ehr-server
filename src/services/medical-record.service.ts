import { IMedicalRecord, MedicalRecord } from '../models/medical-record.model';

export interface CreateMedicalRecordData {
    patientId: string;
    diagnosis: string;
    medications?: string[];
    notes?: string;
    visitDate?: Date;
}

export const createMedicalRecord = async (recordData: CreateMedicalRecordData): Promise<IMedicalRecord> => {
    const record = new MedicalRecord(recordData);
    return await record.save();
};

export const getMedicalRecordsByPatientId = async (patientId: string): Promise<IMedicalRecord[]> => {
    return await MedicalRecord.find({ patientId: patientId as any }).sort({ visitDate: -1 });
};

export const getMedicalRecordById = async (id: string): Promise<IMedicalRecord | null> => {
    return await MedicalRecord.findById(id);
};

export const updateMedicalRecord = async (id: string, updateData: Partial<CreateMedicalRecordData>): Promise<IMedicalRecord | null> => {
    return await MedicalRecord.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteMedicalRecord = async (id: string): Promise<IMedicalRecord | null> => {
    return await MedicalRecord.findByIdAndDelete(id);
};
