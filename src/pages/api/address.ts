import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../utils/db';
import mongoose from 'mongoose';

const formDataSchema = new mongoose.Schema({
  fullAddress: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },
  coordinates: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
}, { timestamps: true });

const FormData = mongoose.models.FormData || mongoose.model('FormData', formDataSchema);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('API called');
  
  await connectDB();

  if (req.method === 'POST') {
    try {
      console.log('Request body:', req.body); // Log the request body to verify received data
      const newFormData = new FormData(req.body);
      await newFormData.save();
      console.log('Form data saved successfully:', newFormData);
      res.status(200).json({ message: 'Form data saved successfully' });
    } catch (error) {
      console.error('Error saving form data:', error);
      res.status(500).json({ message: 'Error saving form data', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
