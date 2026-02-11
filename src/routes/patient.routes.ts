import { Router } from 'express';
import { addPatient, getPatients, getPatient, removePatient, updatePatient } from '../controllers/patient.controller';
import { getPatientHistory } from '../controllers/medical-record.controller';
import { validateCreatePatient } from '../validations/patient.validation';

const router = Router();

router.post('/', validateCreatePatient, addPatient);
router.put('/:id', validateCreatePatient, updatePatient);
router.get('/', getPatients);
router.get('/:id', getPatient);
router.delete('/:id', removePatient);
router.get('/:id/medical-records', getPatientHistory);

export default router;
