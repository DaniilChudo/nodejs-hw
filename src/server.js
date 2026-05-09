import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectMongoDB from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const setupServer = async () => {
  const app = express();

  // Middleware
  app.use(logger);
  app.use(cors());
  app.use(express.json());

  // Routes (Placeholders for now)
  app.get('/notes', (req, res) => {
    res.status(200).json({
      message: 'Retrieved all notes',
    });
  });

  app.get('/notes/:noteId', (req, res) => {
    const { noteId } = req.params;
    res.status(200).json({
      message: `Retrieved note with ID: ${noteId}`,
    });
  });

  // 404 & Error Handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  // Connect to MongoDB before starting the server
  await connectMongoDB();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

setupServer();
