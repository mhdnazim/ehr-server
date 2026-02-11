import { Router } from 'express';
import { addMedicalRecord, getMedicalRecord, updateRecord, removeMedicalRecord } from '../controllers/medical-record.controller';

const router = Router();

router.post('/', addMedicalRecord);
router.get('/:id', getMedicalRecord);
router.put('/:id', updateRecord);
router.delete('/:id', removeMedicalRecord);

export default router;
