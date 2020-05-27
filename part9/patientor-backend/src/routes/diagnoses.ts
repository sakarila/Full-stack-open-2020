import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();
const entries = diagnoseService.getEntries();

router.get('/', (_req, res) => {
  res.send(entries);
});

export default router;