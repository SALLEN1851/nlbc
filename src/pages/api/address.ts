"use server";
import { neon } from "@neondatabase/serverless";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("API route /api/address called");
  if (req.method === 'POST') {
    const { fullAddress, streetAddress, city, state, zipcode, coordinates } = req.body;

    // Basic field validation
    if (!fullAddress || !streetAddress || !city || !state || !zipcode || !coordinates || !coordinates.type || !coordinates.coordinates) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate coordinates format
    if (!Array.isArray(coordinates.coordinates) || coordinates.coordinates.length !== 2 || 
        typeof coordinates.coordinates[0] !== 'number' || typeof coordinates.coordinates[1] !== 'number') {
      return res.status(400).json({ message: 'Invalid coordinates format' });
    }

    try {
      const sql = neon(process.env.DATABASE_URL!);
      console.log('Database URL:', process.env.DATABASE_URL);

     // Test the database connection with a simple query
     const connectionTest = await sql`SELECT 1 AS connected`;
     console.log('Database connection test result:', connectionTest);

     if (connectionTest[0].connected !== 1) {
       throw new Error('Database connection failed');
     }


      // Insert form data into NeonDB
      await sql`
        INSERT INTO nlbc
        (street_address, city, state, zipcode, coordinates)
        VALUES (${streetAddress}, ${city}, ${state}, ${zipcode}, ${coordinates})
      `;

          // Success response
          res.status(200).json({ success: true, message: 'Form data saved successfully' });
        } catch (error) {
            // Use type assertion or type guard to handle the error safely
            if (error instanceof Error) {
                console.error('Error inserting data into NeonDB:', error.message);
                res.status(500).json({ error: 'Internal Server Error', details: error.message });
            } else {
                console.error('Unknown error occurred:', error);
                res.status(500).json({ error: 'Internal Server Error', details: 'An unknown error occurred' });
            }
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}