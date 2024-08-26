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
  polygon166,
  polygon182,
  polygon214,
  polygon230,
  polygon22,
  polygon246,
  polygon266,
  polygon282,
  polygon302,
  polygon318,
  polygon350,
  polygon366,
  polygon38,
  polygon382,
  polygon398,
  polygon442,
  polygon411Coordinates,
  indianTrailCoordinates,
  indianTrail2Coordinates
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
    isInsideNLTC: false,
    isInsideIndianTrail: false,
    isInsideIndianTrail2: false,
    areaType: '',
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
        addPolygon(map, MeekRdCoordinates, 'meek-rd', '#05B4DF');
        addPolygon(map, LeadLineCoordinates, 'lead-line', '#371F76');
        addPolygon(map, RDOFCoordinates, 'rdof', '#DEA731');
        addPolygon(map, NLTC, 'nltc', '#05B4DF');
        addPolygon(map, polygon110, 'polygon-110', '#05B4DF');
        addPolygon(map, polygon126, 'polygon-126', '#05B4DF');
        addPolygon(map, polygon166, 'polygon-166', '#05B4DF');
        addPolygon(map, polygon182, 'polygon-182', '#05B4DF');
        addPolygon(map, polygon214, 'polygon-214', '#05B4DF');
        addPolygon(map, polygon230, 'polygon-230', '#05B4DF');
        addPolygon(map, polygon22, 'polygon-22', '#05B4DF');
        addPolygon(map, polygon246, 'polygon-246', '#05B4DF');
        addPolygon(map, polygon266, 'polygon-266', '#05B4DF');
        addPolygon(map, polygon282, 'polygon-282', '#05B4DF');
        addPolygon(map, polygon302, 'polygon-302', '#05B4DF');
        addPolygon(map, polygon318, 'polygon-318', '#05B4DF');
        addPolygon(map, polygon350, 'polygon-350', '#05B4DF');
        addPolygon(map, polygon366, 'polygon-366', '#05B4DF');
        addPolygon(map, polygon38, 'polygon-38', '#05B4DF');
        addPolygon(map, polygon382, 'polygon-382', '#05B4DF');
        addPolygon(map, polygon398, 'polygon-398', '#05B4DF');
        addPolygon(map, polygon442, 'polygon-442', '#05B4DF');
        addPolygon(map, polygon411Coordinates, 'polygon-411', '#05B4DF');
        addPolygon(map, indianTrailCoordinates, 'indianTrail', '#05B4DF');
        addPolygon(map, indianTrail2Coordinates, 'indianTrail2', '#05B4DF');
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
        const polygonNLTC = turf.polygon([NLTC]);
        const polygon411 = turf.polygon([polygon411Coordinates]);
        const indianTrail = turf.polygon([indianTrailCoordinates]);
        const indianTrail2 = turf.polygon([indianTrail2Coordinates]);
        const polygon110 = turf.polygon([polygon110Coordinates]);
        const polygon126 = turf.polygon([polygon126Coordinates]);
        const polygon166 = turf.polygon([polygon166Coordinates]);
        const polygon182 = turf.polygon([polygon182Coordinates]);
        const polygon214 = turf.polygon([polygon214Coordinates]);
        const polygon230 = turf.polygon([polygon230Coordinates]);
        const polygon22 = turf.polygon([polygon22Coordinates]);
        const polygon246 = turf.polygon([polygon246Coordinates]);
        const polygon266 = turf.polygon([polygon266Coordinates]);
        const polygon282 = turf.polygon([polygon282Coordinates]);
        const polygon302 = turf.polygon([polygon302Coordinates]);
        const polygon318 = turf.polygon([polygon318Coordinates]);
        const polygon350 = turf.polygon([polygon350Coordinates]);
        const polygon366 = turf.polygon([polygon366Coordinates]);
        const polygon38 = turf.polygon([polygon38Coordinates]);
        const polygon382 = turf.polygon([polygon382Coordinates]);
        const polygon398 = turf.polygon([polygon398Coordinates]);
        const polygon442 = turf.polygon([polygon442Coordinates]);



        const isInsideMeekRd = turf.booleanPointInPolygon(point, polygonMeekRd);
        const isInsideWhiteWater = turf.booleanPointInPolygon(point, polygonWhiteWater);
        const isInsideSunSetArea = turf.booleanPointInPolygon(point, polygonSunSetArea);
        const isInsideLeadLine = turf.booleanPointInPolygon(point, polygonLeadLine);
        const isInsideRDOF = turf.booleanPointInPolygon(point, polygonRDOF);
        const isInsideMattieHarris = turf.booleanPointInPolygon(point, mattieHarrisPolygon);
        const isInsideNLTC = turf.booleanPointInPolygon(point, polygonNLTC);
        const isInsidePolygon411 = turf.booleanPointInPolygon(point, polygon411); 
        const isInsideIndianTrail = turf.booleanPointInPolygon(point, indianTrail);
        const isInsideIndianTrail2 = turf.booleanPointInPolygon(point, indianTrail2);
        const isInsidePolygon110 = turf.booleanPointInPolygon(point, polygon110);
        const isInsidePolygon126 = turf.booleanPointInPolygon(point, polygon126);
        const isInsidePolygon166 = turf.booleanPointInPolygon(point, polygon166);
        const isInsidePolygon182 = turf.booleanPointInPolygon(point, polygon182);
        const isInsidePolygon214 = turf.booleanPointInPolygon(point, polygon214);
        const isInsidePolygon230 = turf.booleanPointInPolygon(point, polygon230);
        const isInsidePolygon22 = turf.booleanPointInPolygon(point, polygon22);
        const isInsidePolygon246 = turf.booleanPointInPolygon(point, polygon246);
        const isInsidePolygon266 = turf.booleanPointInPolygon(point, polygon266);
        const isInsidePolygon282 = turf.booleanPointInPolygon(point, polygon282);
        const isInsidePolygon302 = turf.booleanPointInPolygon(point, polygon302);
        const isInsidePolygon318 = turf.booleanPointInPolygon(point, polygon318);
        const isInsidePolygon350 = turf.booleanPointInPolygon(point, polygon350);
        const isInsidePolygon366 = turf.booleanPointInPolygon(point, polygon366);
        const isInsidePolygon38 = turf.booleanPointInPolygon(point, polygon38);
        const isInsidePolygon382 = turf.booleanPointInPolygon(point, polygon382);
        const isInsidePolygon398 = turf.booleanPointInPolygon(point, polygon398);
        const isInsidePolygon442 = turf.booleanPointInPolygon(point, polygon442);



        let areaType = '';

        if (isInsideMeekRd) {
        areaType = 'MeekRd';
      } else if (isInsideWhiteWater) {
        areaType = 'WhiteWater';
      } else if (isInsideSunSetArea) {
        areaType = 'SunSetArea';
      } else if (isInsideLeadLine) {
        areaType = 'LeadLine';
      } else if (isInsideRDOF) {
        areaType = 'RDOF';
      } else if (isInsideMattieHarris) {
        areaType = 'MattieHarris';
      } else if (isInsideNLTC) {
        areaType = 'NLTC';
      } else if (isInsidePolygon411) {
        areaType = 'Polygon411';
      } else if (isInsideIndianTrail) {
        areaType = 'IndianTrail';
      } else if (isInsideIndianTrail2) {
        areaType = 'IndianTrail2';
      } else if (isInsidePolygon110) {
        areaType = 'Polygon110';
      } else if (isInsidePolygon126) {
        areaType = 'Polygon126';
      } else if (isInsidePolygon166) {
        areaType = 'Polygon166';
      } else if (isInsidePolygon182) {
        areaType = 'Polygon182';
      } else if (isInsidePolygon214) {
        areaType = 'Polygon214';
      } else if (isInsidePolygon230) {
        areaType = 'Polygon230';
      } else if (isInsidePolygon22) {
        areaType = 'Polygon22';
      } else if (isInsidePolygon246) {
        areaType = 'Polygon246';
      } else if (isInsidePolygon266) {
        areaType = 'Polygon266';
      } else if (isInsidePolygon282) {
        areaType = 'Polygon282';
      } else if (isInsidePolygon302) {
        areaType = 'Polygon302';
      } else if (isInsidePolygon318) {
        areaType = 'Polygon318';
      } else if (isInsidePolygon350) {
        areaType = 'Polygon350';
      } else if (isInsidePolygon366) {
        areaType = 'Polygon366';
      } else if (isInsidePolygon38) {
        areaType = 'Polygon38';
      } else if (isInsidePolygon382) {
        areaType = 'Polygon382';
      } else if (isInsidePolygon398) {
        areaType = 'Polygon398';
      } else if (isInsidePolygon442) {
        areaType = 'Polygon442';
      }

      if (
        !isInsideMeekRd &&
        !isInsideWhiteWater &&
        !isInsideSunSetArea &&
        !isInsideLeadLine &&
        !isInsideRDOF &&
        !isInsideMattieHarris &&
        !isInsideNLTC &&
        !isInsidePolygon411 &&
        !isInsideIndianTrail &&
        !isInsideIndianTrail2 &&
        !isInsidePolygon110 &&
        !isInsidePolygon126 &&
        !isInsidePolygon166 &&
        !isInsidePolygon182 &&
        !isInsidePolygon214 &&
        !isInsidePolygon230 &&
        !isInsidePolygon22 &&
        !isInsidePolygon246 &&
        !isInsidePolygon266 &&
        !isInsidePolygon282 &&
        !isInsidePolygon302 &&
        !isInsidePolygon318 &&
        !isInsidePolygon350 &&
        !isInsidePolygon366 &&
        !isInsidePolygon38 &&
        !isInsidePolygon382 &&
        !isInsidePolygon398 &&
        !isInsidePolygon442
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
          isInsideNLTC,
          isInsidePolygon411,
          isInsideIndianTrail,
          isInsideIndianTrail2,
          areaType,
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
