"use client";

import React from 'react';

interface AddressFormProps {
  onSubmit: (formData: any) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const capitalizeFirstLetter = (str: string) => {
      return str.replace(/\b\w/g, (match) => match.toUpperCase());
    };

    const streetAddress = capitalizeFirstLetter((document.getElementById('streetAddress') as HTMLInputElement).value);
    const city = capitalizeFirstLetter((document.getElementById('city') as HTMLInputElement).value);
    const state = (document.getElementById('state') as HTMLInputElement).value.toUpperCase();
    const zipcode = (document.getElementById('zipcode') as HTMLInputElement).value;

    const fullAddress = `${streetAddress}, ${city}, ${state} ${zipcode}`;

    onSubmit({ streetAddress, city, state, zipcode, fullAddress });
  };

  return (
    <div className="form-container mx-5 p-6 -mt-10 mb-10 z-10 bg-white rounded-xl shadow-xl w-full sm:w-6/12">
      <form id="addressForm" onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
            Street Address:
          </label>
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            required
            autoComplete="address-line1"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="form-group">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              autoComplete="address-level2"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State:
            </label>
            <input
              type="text"
              id="state"
              name="state"
              required
              autoComplete="address-level1"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
              Zipcode:
            </label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              required
              autoComplete="postal-code"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            id="submit-btn"
            className="px-4 py-2 rounded-xl bg-cyan-500 text-white font-semibold shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Search Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
