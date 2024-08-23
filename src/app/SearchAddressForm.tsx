"use client";

import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import AddressForm from './AddressForm';
import PolygonMessage from './PolygonMessage';
import { WhiteWaterCoordinates } from './coordinates';
import { MeekRdCoordinates } from './coordinates';
import { LeadLineCoordinates } from './coordinates';
import { RDOFCoordinates } from './coordinates';
import { MattieHarrisCoordinates } from './coordinates';
import { SunSetAreaCoordinates } from './coordinates';
import { polygon411Coordinates } from './coordinates';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

interface FormData {
  fullAddress: string;
}

const SearchAddressForm: React.FC = () => {
  // const [notificationMessage, setNotificationMessage] = useState<React.ReactNode>(null);
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

  const submitAddress = async (formData: FormData) => {
    try {
      const response = await fetch('/api/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Address submitted successfully');
      } else {
        console.error('Failed to submit address:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting address:', error);
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(formData.fullAddress)}.json?access_token=${mapboxgl.accessToken}`);
      if (!response.ok) {
        throw new Error('Failed to geocode address');
      }
      const data = await response.json();
      const coordinates = data.features[0].geometry.coordinates;
      console.log('Coordinates:', coordinates);

      const map = mapRef.current;
      if (map) {
        map.flyTo({
          center: coordinates,
          zoom: 15,
          speed: 1.5,
        });

        new mapboxgl.Marker({
          color: "#05B4DF"
        })
          .setLngLat(coordinates)
          .addTo(map);
      }

      const point = turf.point(coordinates);
      const polygonMeekRd = turf.polygon([MeekRdCoordinates]);
      const polygonWhiteWater = turf.polygon([WhiteWaterCoordinates]);
      const polygonSunSetArea = turf.polygon([SunSetAreaCoordinates]);
      const polygonLeadLine = turf.polygon([LeadLineCoordinates]);
      const polygonRDOF = turf.polygon([RDOFCoordinates]);
      const mattieHarrisPolygon = turf.polygon([MattieHarrisCoordinates]);
      const polygon411 = turf.polygon([polygon411Coordinates]);

      const isInsideMeekRd = turf.booleanPointInPolygon(point, polygonMeekRd);
      const isInsideWhiteWater = turf.booleanPointInPolygon(point, polygonWhiteWater);
      const isInsideSunSetArea = turf.booleanPointInPolygon(point, polygonSunSetArea);
      const isInsideLeadLine = turf.booleanPointInPolygon(point, polygonLeadLine);
      const isInsideRDOF = turf.booleanPointInPolygon(point, polygonRDOF);
      const isInsideMattieHarris = turf.booleanPointInPolygon(point, mattieHarrisPolygon);
      const isInsidePolygon411 = turf.booleanPointInPolygon(point, polygon411); 

      setNotificationMessage(
        <PolygonMessage
          fullAddress={formData.fullAddress}
          isInsideMeekRd={isInsideMeekRd}
          isInsideWhiteWater={isInsideWhiteWater}
          isInsideSunSetArea={isInsideSunSetArea}
          isInsideLeadLine={isInsideLeadLine}
          isInsideRDOF={isInsideRDOF}
          isInsideMattieHarris={isInsideMattieHarris}
          isInsidePolygon411={isInsidePolygon411}
        />
      );

          // Construct the full form data object
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

  return (
    <div className="flex flex-col justify-center items-center">
      <AddressForm onSubmit={handleFormSubmit} />
      <div className="m-10 text-xl" id="notification" style={{ display: 'none' }} />
    </div>
  );
};

export default SearchAddressForm;
