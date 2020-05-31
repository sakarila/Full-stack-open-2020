import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';
import patients from '../../data/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  const entries = patientService.getFilteredPatients();
  res.send(entries);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);
  res.send(patient);
});

router.post('/', (req, res) => {
  const newPatient = toNewPatient(req.body);
  const newPatientEntry = patientService.createPatient(newPatient);

  res.json(newPatientEntry);
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const entry = patientService.createEntry(req.body);

  patients.find(patient => patient.id === id)?.entries.push(entry);
  res.json(entry);
});

export default router;