import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';

const app = express();
dotenv.config();

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to db!');
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  res
    .status(status)
    .json({ 
      success: false,
      status,
      message
     });
});

app.listen(8800, () => {
  connectDB();
  console.log('Server is running on port 8800');
});