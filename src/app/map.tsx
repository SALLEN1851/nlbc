"use client"; // Mark this file as a client component

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as turf from '@turf/turf';
import {
  polygonCoordinates,
  MeekRdCoordinates,
  WhiteWaterCoordinates,
  SunSetAreaCoordinates,
  LeadLineCoordinates,
  RDOFCoordinates,
  MattieHarrisCoordinates,
} from './coordinates'; // Import the coordinates

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const addPolygon = (map: mapboxgl.Map, coordinates: number[][], id: string, fillColor: string) => {
    map.addSource(id, {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates],
        },
      },
    });

    map.addLayer({
      id: id,
      type: 'fill',
      source: id,
      layout: {},
      paint: {
        'fill-color': fillColor,
        'fill-opacity': 0.3,
        // 'fill-outline-color': '#088',
      },
    });
  };

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-85.2913559, 39.8089351],
        zoom: 10,
      });

      map.on('load', () => {
        mapRef.current = map;

        // Adding polygons
        addPolygon(map, SunSetAreaCoordinates, 'sunset-area', '#05B4DF');
        addPolygon(map, WhiteWaterCoordinates, 'white-water', '#05B4DF');
        addPolygon(map, MeekRdCoordinates, 'meek-rd', '#05B4DF');
        addPolygon(map, LeadLineCoordinates, 'lead-line', '#371F76');
        addPolygon(map, RDOFCoordinates, 'rdof', '#DEA731');
        addPolygon(map, MattieHarrisCoordinates, 'mattie-harris', '#05B4DF');
      });

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      });

      document.getElementById('geocoder')?.appendChild(geocoder.onAdd(map));

      

      return () => map.remove();
    }
  }, []);

  useEffect(() => {
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', submitAddress);
    }
  }, []);

  const capitalizeFirstLetter = (str: string) => {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  };

  const submitAddress = async () => {
    const streetAddress = capitalizeFirstLetter((document.getElementById('streetAddress') as HTMLInputElement).value);
    const city = capitalizeFirstLetter((document.getElementById('city') as HTMLInputElement).value);
    const state = (document.getElementById('state') as HTMLInputElement).value.toUpperCase();
    const zipcode = (document.getElementById('zipcode') as HTMLInputElement).value;

    const fullAddress = `${streetAddress}, ${city}, ${state} ${zipcode}`;
    console.log(fullAddress);

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(fullAddress)}.json?access_token=${mapboxgl.accessToken}`
      );

      if (!response.ok) {
        throw new Error('Failed to geocode address');
      }

      const data = await response.json();
      const coordinates = data.features[0].geometry.coordinates;
      console.log(coordinates);

      const map = mapRef.current;
      if (map) {
        map.flyTo({
          center: coordinates,
          zoom: 15,
          speed: 1.5,
        });

        new mapboxgl.Marker({ color: '#05B4DF' }).setLngLat(coordinates).addTo(map);

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
        const isInsidePolygon =
          isInsideMeekRd || isInsideWhiteWater || isInsideSunSetArea || isInsideLeadLine || isInsideRDOF || isInsideMattieHarris;

        let message;
        if (isInsideMeekRd) {
          message = `You're Qualified! <strong>${fullAddress}</strong> is qualified for fiber optic internet service.`;
        } else if (isInsideWhiteWater) {
          message = `You're Qualified! <strong>${fullAddress}</strong> is qualified for fiber optic internet service.`;
        } else if (isInsideSunSetArea) {
          message = `You're Qualified! <strong>${fullAddress}</strong> is qualified for fiber optic internet service.`;
        } else if (isInsideLeadLine) {
          message = `Area of Interest <strong>${fullAddress}</strong> falls into an area that we are considering for near future fiber deployment.`;
        } else if (isInsideRDOF) {
          message = `Pre-Construction <strong>${fullAddress}</strong> is an area that is currently in the pre-construction phase.`;
        } else if (isInsideMattieHarris) {
          message = `You're Qualified! <strong>${fullAddress}</strong> is qualified for fiber optic internet service.`;
        } else {
          window.location.href = 'https://nlbc.com/check-service-area/';
          message = `Contact us to confirm service availability at <strong>${fullAddress}</strong>.`;
        }

        const notification = document.getElementById('notification');
        if (notification) {
          notification.innerHTML = message;
          notification.style.display = 'block';
        }

        const formData = {
          streetAddress: streetAddress,
          city: city,
          state: state,
          zipcode: zipcode,
          coordinates: {
            type: 'Point',
            coordinates: [coordinates[0], coordinates[1]],
          },
        };

        const backendResponse = await fetch('https://service-production-1fef.up.railway.app/api/address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!backendResponse.ok) {
          console.error('Failed to submit address to backend:', backendResponse.statusText);
        } else {
          console.log('Address submitted successfully');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  return (
    <>
      <div ref={mapContainerRef} className="h-96 w-full" id="map" />
      {/* <div id="geocoder" /> */}
      <div id="notification" style={{ display: 'none' }} />
    </>
  );
};

export default Map;
