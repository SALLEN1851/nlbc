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
    type: {
      type: String, enum: ['Point'], required: true
    },
    coordinates: {
      type: [Number], required: true, validate: {
        validator: function (arr: number[]) {
          return arr.length === 2;
        },
        message: (props: { value: number[] }) => `${props.value} is not a valid coordinates array!`
      }
    },
  },
}, { timestamps: true });

const FormData = mongoose.models.FormData || mongoose.model('FormData', formDataSchema);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('API called');
  
  await connectDB();

  if (req.method === 'POST') {
    try {
      console.log('Request body:', req.body); // Log the request body to verify received data
      
      // Extract and validate fields
      const { fullAddress, streetAddress, city, state, zipcode, coordinates } = req.body;
      
      if (!fullAddress || !streetAddress || !city || !state || !zipcode || !coordinates || !coordinates.type || !coordinates.coordinates) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Ensure coordinates are correctly formatted
      if (!Array.isArray(coordinates.coordinates) || coordinates.coordinates.length !== 2 || typeof coordinates.coordinates[0] !== 'number' || typeof coordinates.coordinates[1] !== 'number') {
        return res.status(400).json({ message: 'Invalid coordinates format' });
      }

      // Create a new document
      const newFormData = new FormData(req.body);
      await newFormData.save();
  
      console.log('Form data saved successfully:', newFormData);
      res.status(200).json({ message: 'Form data saved successfully' });

    } catch (error) {
      console.error('Error saving form data:', error);
  
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ message: 'Validation error', error: error.errors });
      } else if (error instanceof Error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error', error: 'An unknown error occurred' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
