"use client";

import React, { useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import AddressForm from './AddressForm';
import Notification from './Notification';
import PolygonMessage from './PolygonMessage';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const SearchAddressForm: React.FC = () => {
  const [notificationMessage, setNotificationMessage] = useState<React.ReactNode>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const submitAddress = async (formData: any) => {
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
        // Optionally, you can redirect or display a success message here
      } else {
        console.error('Failed to submit address:', response.statusText);
        // Handle the error (e.g., display an error message)
      }
    } catch (error) {
      console.error('Error submitting address:', error);
      // Handle the error (e.g., display an error message)
    }
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      // Convert the address to geocoordinates using Mapbox Geocoding API
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(formData.fullAddress)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`);
      if (!response.ok) {
        throw new Error('Failed to geocode address');
      }
      const data = await response.json();

      // Retrieve the coordinates from the geocoding response
      const coordinates = data.features[0].geometry.coordinates;

      // Fly to the new marker's location
      const map = mapRef.current;
      if (map) {
        map.flyTo({
          center: coordinates,
          zoom: 15,
          speed: 1.5,
        });

        // Place a marker at the address location
        new mapboxgl.Marker({
          color: "#05B4DF"
        })
          .setLngLat(coordinates)
          .addTo(map);
      }

      const point = turf.point(coordinates);

      // Define your polygons here
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
      const isInsidePolygon = isInsideMeekRd || isInsideWhiteWater || isInsideSunSetArea || isInsideLeadLine || isInsideRDOF || isInsideMattieHarris;

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

      // Submit the address data to the backend
      await submitAddress(formData);

    } catch (error) {
      console.error('Error:', error);
      // Handle the error (e.g., display an error message)
    }
  };

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

  return (
    <div className="flex flex-col justify-center items-center">
      <AddressForm onSubmit={handleFormSubmit} />
      <Notification message={notificationMessage} />
      {/* <Map onGeocoderResult={(result) => console.log(result)} /> */}
    </div>
  );
};

export default SearchAddressForm;
