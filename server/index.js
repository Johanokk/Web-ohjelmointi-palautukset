import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './helper/db.js';
import todoRouter from './routers/todoRouter.js';

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', todoRouter);

// Virheiden käsittely middleware
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      message: err.message,
      status: statusCode
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
