"use client";

import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import AddressForm from './AddressForm';
import PolygonMessage from './PolygonMessage';
import {
  WhiteWaterCoordinates,
  MeekRdCoordinates,
  LeadLineCoordinates,
  RDOFCoordinates,
  MattieHarrisCoordinates,
  NLTC,
  SunSetAreaCoordinates,
  polygon411Coordinates,
} from './coordinates';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

interface FormData {
  fullAddress: string;
}

const SearchAddressForm: React.FC = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [areaType, setAreaType] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [fullAddress, setFullAddress] = useState<string | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (!document.getElementById('search-js')) {
        const script = document.createElement('script');
        script.id = 'search-js';
        script.defer = true;
        script.src = 'https://api.mapbox.com/search-js/v1.0.0-beta.18/web.js';
        document.body.appendChild(script);

        script.onload = () => {
          (window as any).mapboxsearch.autofill({
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
          });
        };
      }
    }
  }, []);

  const submitAddress = async (fullFormData: any) => {
    try {
      const response = await fetch('/api/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullFormData),
      });

      if (!response.ok) {
        console.error('Failed to submit address:', response.statusText);
      } else {
        console.log('Address submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting address:', error);
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          formData.fullAddress
        )}.json?access_token=${mapboxgl.accessToken}`
      );
      if (!response.ok) {
        throw new Error('Failed to geocode address');
      }
      const data = await response.json();
      const coordinates = data.features[0].geometry.coordinates;
      console.log('Coordinates:', coordinates);
      setShowForm(false);
      setFullAddress(formData.fullAddress); // Store the full address in state
      const map = mapRef.current;
      if (map) {
        map.flyTo({
          center: coordinates,
          zoom: 15,
          speed: 1.5,
        });

        new mapboxgl.Marker({
          color: '#05B4DF',
        })
          .setLngLat(coordinates)
          .addTo(map);
      }

      const point = turf.point(coordinates);
      const polygons = [
        { type: 'qualified', polygon: turf.polygon([MeekRdCoordinates]) },
        { type: 'qualified', polygon: turf.polygon([WhiteWaterCoordinates]) },
        { type: 'qualified', polygon: turf.polygon([SunSetAreaCoordinates]) },
        { type: 'leadLine', polygon: turf.polygon([LeadLineCoordinates]) },
        { type: 'rdof', polygon: turf.polygon([RDOFCoordinates]) },
        { type: 'qualified', polygon: turf.polygon([MattieHarrisCoordinates]) },
        { type: 'nltc', polygon: turf.polygon([NLTC]) },
        { type: 'qualified', polygon: turf.polygon([polygon411Coordinates]) },
      ];

      const foundArea = polygons.find(({ polygon }) =>
        turf.booleanPointInPolygon(point, polygon)
      );

      setAreaType(foundArea?.type || null);
      setHasSearched(true);

      // Submit address data
      const fullFormData = {
        fullAddress: formData.fullAddress,
        streetAddress: formData.fullAddress.split(',')[0],
        city: formData.fullAddress.split(',')[1].trim(),
        state: formData.fullAddress.split(',')[2].trim().split(' ')[0],
        zipcode: formData.fullAddress.split(',')[2].trim().split(' ')[1],
        coordinates: {
          type: 'Point',
          coordinates: coordinates,
        },
      };

      await submitAddress(fullFormData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleResetForm = () => {
    setShowForm(true);
    setAreaType(null);
    setHasSearched(false);
    setFullAddress(null);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {showForm && <AddressForm onSubmit={handleFormSubmit} />}
      {!showForm && (
        <div className="m-10 text-xl">
          {fullAddress && (
            <PolygonMessage
              fullAddress={fullAddress}
              areaType={areaType}
              hasSearched={hasSearched}
            />
          )}
          <button
            onClick={handleResetForm}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
          >
            Reset Form
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchAddressForm;
