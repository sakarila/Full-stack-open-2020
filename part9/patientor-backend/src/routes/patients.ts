import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const entries = patientService.getFilteredPatientEntries();
  res.send(entries);
});

router.post('/', (req, res) => {
  const newPatient = toNewPatientEntry(req.body);
  const newPatientEntry = patientService.createPatientEntry(newPatient);

  res.json(newPatientEntry);
});

export default router;