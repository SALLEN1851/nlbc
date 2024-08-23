"use client";

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as turf from '@turf/turf';
import {
  MeekRdCoordinates,
  WhiteWaterCoordinates,
  SunSetAreaCoordinates,
  LeadLineCoordinates,
  RDOFCoordinates,
  MattieHarrisCoordinates,
  NLTC,
  polygon110,
  polygon126,
  polygon142,
  polygon166,
  polygon182,
  polygon198,
  polygon214,
  polygon230,
  polygon22,
  polygon246,
  polygon266,
  polygon282,
  polygon302,
  polygon318,
  polygon334,
  polygon350,
  polygon366,
  polygon38,
  polygon382,
  polygon398,
  polygon442,
  RDOF2,
  polygon411Coordinates,
} from './coordinates';
import PolygonMessage from './PolygonMessage';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [polygonProps, setPolygonProps] = useState({
    fullAddress: '',
    isInsideMeekRd: false,
    isInsideWhiteWater: false,
    isInsideSunSetArea: false,
    isInsideLeadLine: false,
    isInsideRDOF: false,
    isInsideMattieHarris: false,
    isInsidePolygon411: false,
    showMessage: false,
    hasSearched: false,
  });

  const addPolygon = (map: mapboxgl.Map, coordinates: number[][], id: string, fillColor: string) => {
    map.addSource(id, {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates],
        },
        properties: {},
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
      },
    });
  };

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-85.157944, 39.910799],
        zoom: 10,
      });

      map.on('load', () => {
        mapRef.current = map;

        // Adding polygons
        // addPolygon(map, SunSetAreaCoordinates, 'sunset-area', '#05B4DF');
        // addPolygon(map, WhiteWaterCoordinates, 'white-water', '#05B4DF');
        addPolygon(map, MeekRdCoordinates, 'meek-rd', '#05B4DF');
        addPolygon(map, LeadLineCoordinates, 'lead-line', '#371F76');
        // addPolygon(map, RDOFCoordinates, 'rdof', '#DEA731');
        // addPolygon(map, MattieHarrisCoordinates, 'mattie-harris', '#05B4DF');
        addPolygon(map, NLTC, 'nltc', '#05B4DF');
        addPolygon(map, polygon110, 'polygon-110', '#05B4DF');
        addPolygon(map, polygon126, 'polygon-126', '#05B4DF');
        addPolygon(map, polygon142, 'polygon-142', '#05B4DF');
        addPolygon(map, polygon166, 'polygon-166', '#05B4DF');
        addPolygon(map, polygon182, 'polygon-182', '#05B4DF');
        addPolygon(map, polygon198, 'polygon-198', '#05B4DF');
        addPolygon(map, polygon214, 'polygon-214', '#05B4DF');
        addPolygon(map, polygon230, 'polygon-230', '#05B4DF');
        addPolygon(map, polygon22, 'polygon-22', '#05B4DF');
        addPolygon(map, polygon246, 'polygon-246', '#05B4DF');
        addPolygon(map, polygon266, 'polygon-266', '#05B4DF');
        addPolygon(map, polygon282, 'polygon-282', '#05B4DF');
        addPolygon(map, polygon302, 'polygon-302', '#05B4DF');
        addPolygon(map, polygon318, 'polygon-318', '#05B4DF');
        addPolygon(map, polygon334, 'polygon-334', '#05B4DF');
        addPolygon(map, polygon350, 'polygon-350', '#05B4DF');
        addPolygon(map, polygon366, 'polygon-366', '#05B4DF');
        addPolygon(map, polygon38, 'polygon-38', '#05B4DF');
        addPolygon(map, polygon382, 'polygon-382', '#05B4DF');
        addPolygon(map, polygon398, 'polygon-398', '#05B4DF');
        addPolygon(map, polygon442, 'polygon-442', '#05B4DF');
        addPolygon(map, polygon411Coordinates, 'polygon-411', '#05B4DF');
        addPolygon(map, RDOF2, 'rdof2', '#05B4DF');
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
        const polygon411 = turf.polygon([polygon411Coordinates]);

        const isInsideMeekRd = turf.booleanPointInPolygon(point, polygonMeekRd);
        const isInsideWhiteWater = turf.booleanPointInPolygon(point, polygonWhiteWater);
        const isInsideSunSetArea = turf.booleanPointInPolygon(point, polygonSunSetArea);
        const isInsideLeadLine = turf.booleanPointInPolygon(point, polygonLeadLine);
        const isInsideRDOF = turf.booleanPointInPolygon(point, polygonRDOF);
        const isInsideMattieHarris = turf.booleanPointInPolygon(point, mattieHarrisPolygon);
        const isInsidePolygon411 = turf.booleanPointInPolygon(point, polygon411); 

        if (
          !isInsideMeekRd &&
          !isInsideWhiteWater &&
          !isInsideSunSetArea &&
          !isInsideLeadLine &&
          !isInsideRDOF &&
          !isInsideMattieHarris &&
          !isInsidePolygon411
        ) {
          window.location.href = 'https://nlbc.com/check-service-area/';
          return;
        }

        setPolygonProps({
          fullAddress,
          isInsideMeekRd,
          isInsideWhiteWater,
          isInsideSunSetArea,
          isInsideLeadLine,
          isInsideRDOF,
          isInsideMattieHarris,
          isInsidePolygon411,
          showMessage: true,
          hasSearched: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div ref={mapContainerRef} className="h-[60vh] w-full" id="map" />
      <PolygonMessage {...polygonProps} />
    </>
  );
};

export default Map;
