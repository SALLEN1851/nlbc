// import mongoose from 'mongoose';

// let isConnected = false;

// const connectDB = async () => {
//   if (isConnected) {
//     return;
//   }
//   if (!process.env.MONGO_URI) {
//     throw new Error('Please define the MONGO_URI environment variable inside .env.local');
//   }

//   await mongoose.connect(process.env.MONGO_URI);
//   isConnected = true;
//   console.log('Connected to MongoDB');
// };

// export default connectDB;


import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

const connectDB = async () => {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
    });

    isConnected = connection.connections[0].readyState === 1;
    if (isConnected) {
      console.log('Connected to MongoDB');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectDB;
