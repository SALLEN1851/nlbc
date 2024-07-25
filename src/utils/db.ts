import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  if (!process.env.MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
  }

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log('Connected to MongoDB');
};

export default connectDB;
