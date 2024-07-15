"use client"; // Mark this file as a client component

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  polygonCoordinates,
  MeekRdCoordinates,
  WhiteWaterCoordinates,
  SunSetAreaCoordinates,
  LeadLineCoordinates,
  RDOFCoordinates,
  MattieHarrisCoordinates,
} from './coordinates'; // Import the coordinates

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsbGVuMTA2IiwiYSI6ImNscXlham03ZzBubGcya3BveXJveWRtaTQifQ.l4TqDA9Ht87uHzHR-e-Vmg';

const Map: React.FC = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-85.2913559, 39.8089351],
      zoom: 10,
    });

    map.on('load', () => {
      const addPolygon = (coordinates: number[][], id: string) => {
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
            'fill-color': '#888888',
            'fill-opacity': 0.5,
          },
        });

        map.addLayer({
          id: `${id}-outline`,
          type: 'line',
          source: id,
          layout: {},
          paint: {
            'line-color': '#000000',
            'line-width': 2,
          },
        });
      };

      addPolygon(polygonCoordinates[0], 'polygon1');
      addPolygon(MeekRdCoordinates, 'MeekRd');
      addPolygon(WhiteWaterCoordinates, 'WhiteWater');
      addPolygon(SunSetAreaCoordinates, 'SunSetArea');
      addPolygon(LeadLineCoordinates, 'LeadLine');
      addPolygon(RDOFCoordinates, 'RDOF');
      addPolygon(MattieHarrisCoordinates, 'MattieHarris');
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} className="h-96 w-full" id="map" />;
};

export default Map;
