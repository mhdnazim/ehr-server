import { Router } from 'express';
import patientRoutes from './patient.routes';
import medicalRecordRoutes from './medical-record.routes';

const router = Router();

router.use('/patients', patientRoutes);
router.use('/medical-records', medicalRecordRoutes);

export default router;
