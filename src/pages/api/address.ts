import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../utils/db';
import mongoose from 'mongoose';

const formDataSchema = new mongoose.Schema({
  fullAddress: { type: String, required: true },
});

const FormData = mongoose.models.FormData || mongoose.model('FormData', formDataSchema);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Connecting to MongoDB...');
  await connectDB();
  console.log('Connected to MongoDB');

  if (req.method === 'POST') {
    console.log('Received POST request');
    console.log('Request body:', req.body);

    try {
      const newFormData = new FormData(req.body);
      await newFormData.save();
      console.log('Form data saved successfully:', newFormData);

      res.status(200).json({ message: 'Form data saved successfully' });
    } catch (error) {
      console.error('Error saving form data:', error);
      res.status(500).json({ message: 'Error saving form data', error });
    }
  } else {
    console.log('Received non-POST request, method not allowed');
    res.status(405).json({ message: 'Method not allowed' });
  }
};
