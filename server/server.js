import express from 'express';
import dotenv from 'dotenv';
import { connectedDb } from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import { ClerkWebhooks } from './controller/clerckWebHooks.js';

dotenv.config(); // ✅ Load .env early

const app = express();

app.use(express.json()); // ✅ parse JSON first

// ✅ Clerk webhook route (NO middleware here)
app.use('/api/webhook', ClerkWebhooks);

// ✅ Normal protected routes go after middleware
app.use(clerkMiddleware());

// Example protected route
app.get('/', (req, res) => {
  res.end('server is running');
});

// ✅ Connect to DB
connectedDb();

// ✅ Start server
app.listen(4000, () => {
  console.log('server is running on port 4000');
});
