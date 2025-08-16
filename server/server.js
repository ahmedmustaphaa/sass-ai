// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import AiRouter from './route/AiRoute.js';
import { connectedCloudinary } from './config/cloudinary.js';
import userRouter from './route/userroute.js';
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(clerkMiddleware());
app.use(requireAuth());
app.use(express.json());

// Routes

app.use('/api/ai',AiRouter)
app.use('/api/user',userRouter)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// مثال على راوت POST
app.post('/api/data', (req, res) => {
  const data = req.body;
  res.json({ message: 'Data received', data });
});


connectedCloudinary()
// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
