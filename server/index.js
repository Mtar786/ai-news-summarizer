import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import newsRouter from './routes/news.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', newsRouter);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'AI News Summarizer API is running' });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});