import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'dotenv/config';
import connectMongoDB from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';

const setupServer = async () => {
  const app = express();

  // Middleware
  app.use(logger);
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use(notesRouter);

  // 404 & Error Handlers
  app.use(notFoundHandler);
  app.use(errors());
  app.use(errorHandler);

  // Connect to MongoDB before starting the server
  await connectMongoDB();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

setupServer();
