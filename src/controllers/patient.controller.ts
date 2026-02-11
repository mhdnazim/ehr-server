import { Request, Response } from 'express';
import { createPatient, getAllPatients, getPatientById, deletePatient, updatePatientById } from '../services/patient.service';

export const addPatient = async (req: Request, res: Response): Promise<void> => {
    console.log('[DEBUG] Entering addPatient controller');
    try {
        const patientData = req.body;
        const newPatient = await createPatient(patientData);
        res.status(201).json({
            success: true,
            message: 'Patient created successfully',
            data: newPatient,
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
            message: error.message || 'Failed to create patient',
        });
    }
};

// export const updatePatient = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { id } = req.params;
//         const patientData = req.body;
//         const updatedPatient = await updatePatient(id as string, patientData);
//         if (!updatedPatient) {
//             res.status(404).json({
//                 success: false,
//                 message: 'Patient not found',
//             });
//             return;
//         }
//         res.status(200).json({
//             success: true,
//             message: 'Patient updated successfully',
//             data: updatedPatient,
//         });
//     } catch (error: any) {
//         if (error.name === 'ValidationError') {
//             const messages = Object.values(error.errors).map((val: any) => val.message);
//             res.status(400).json({
//                 success: false,
//                 message: 'Validation Error',
//                 error: messages,
//             });
//             return;
//         }
//         res.status(500).json({
//             success: false,
//             message: error.message || 'Failed to update patient',
//         });
//     }
// };

export const updatePatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const patientData = req.body;

    const updatedPatient = await updatePatientById(id, patientData);

    if (!updatedPatient) {
      res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Patient updated successfully',
      data: updatedPatient,
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
      message: error.message || 'Failed to update patient',
    });
  }
};

export const getPatients = async (req: Request, res: Response): Promise<void> => {
    try {
        const patients = await getAllPatients();
        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch patients',
            error: error.message,
        });
    }
};

export const getPatient = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const patient = await getPatientById(id as string);
        if (!patient) {
            res.status(404).json({
                success: false,
                message: 'Patient not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: patient,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch patient',
            error: error.message,
        });
    }
};

export const removePatient = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const patient = await deletePatient(id as string);
        if (!patient) {
            res.status(404).json({
                success: false,
                message: 'Patient not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Patient deleted successfully',
            data: patient,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete patient',
            error: error.message,
        });
    }
};
