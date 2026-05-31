import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import 'dotenv/config';
import connectMongoDB from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const setupServer = async () => {
  const app = express();

  // Middleware
  app.use(logger);
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  // Routes
  app.use(notesRouter);
  app.use(authRouter);
  app.use(userRouter);

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
