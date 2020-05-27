import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

interface Body { 
  daily_exercises: Array<number>,
  target: number
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) ||isNaN(weight)) {
        res.send({error: 'malformatted parameters'}).status(400);
    }
    const bmi = calculateBmi(height, weight);
    res.send({
        weight,
        height,
        bmi
    });
});

app.post('/exercises', (req, res) => {
    const body = req.body as Body;
    const daily_exercises= body.daily_exercises;
    const target= body.target;
    const param= [target, ...daily_exercises];
    if(param.length < 2) {
      res.send({error: 'parameters missing'}).status(400);
    }
    for (let i = 0; i < param.length; i++) {
      const num = Number(param[i]);
      if(isNaN(num)) {
        res.send({error: 'malformatted parameters'}).status(400);
      }
    }
    const stats = calculateExercises(param);
    res.send(stats);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});