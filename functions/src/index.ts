import * as functions from 'firebase-functions';
import express from 'express';
import { userRoutes, taskRoutes } from './routes';
import './config/firebase';

const app = express();

// app.use(cors({ origin: true }));
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Node.js, TypeScript, Firebase CRUD API is running!');
});

export const api = functions.https.onRequest({
  // Optional: specify region explicitly if you want to be sure
  // region: 'us-central1',
  // Optional: specify runtime explicitly if you want to be sure
  // runtime: 'nodejs20',
}, app);
