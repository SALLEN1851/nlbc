"use client";

import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import AddressForm from './AddressForm';
import Notification from './Notification';
import PolygonMessage from './PolygonMessage';
import { WhiteWaterCoordinates } from './coordinates';
import { MeekRdCoordinates } from './coordinates';
import { LeadLineCoordinates } from './coordinates';
import { RDOFCoordinates } from './coordinates';
import { MattieHarrisCoordinates } from './coordinates';
import { SunSetAreaCoordinates } from './coordinates';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

interface FormData {
  fullAddress: string;
}

const SearchAddressForm: React.FC = () => {
  const [notificationMessage, setNotificationMessage] = useState<React.ReactNode>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    // Ensure the script is added only on the client side
    if (typeof document !== 'undefined') {
      // Check if the script already exists before adding
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

      const isInsideMeekRd = turf.booleanPointInPolygon(point, polygonMeekRd);
      const isInsideWhiteWater = turf.booleanPointInPolygon(point, polygonWhiteWater);
      const isInsideSunSetArea = turf.booleanPointInPolygon(point, polygonSunSetArea);
      const isInsideLeadLine = turf.booleanPointInPolygon(point, polygonLeadLine);
      const isInsideRDOF = turf.booleanPointInPolygon(point, polygonRDOF);
      const isInsideMattieHarris = turf.booleanPointInPolygon(point, mattieHarrisPolygon);

      setNotificationMessage(
        <PolygonMessage
          fullAddress={formData.fullAddress}
          isInsideMeekRd={isInsideMeekRd}
          isInsideWhiteWater={isInsideWhiteWater}
          isInsideSunSetArea={isInsideSunSetArea}
          isInsideLeadLine={isInsideLeadLine}
          isInsideRDOF={isInsideRDOF}
          isInsideMattieHarris={isInsideMattieHarris}
        />
      );

      await submitAddress(formData);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <AddressForm onSubmit={handleFormSubmit} />
      <Notification message={notificationMessage} />
    </div>
  );
};

export default SearchAddressForm;
