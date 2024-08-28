"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import * as turf from "@turf/turf";
import {
  MeekRdCoordinates,
  // WhiteWaterCoordinates,
  // SunSetAreaCoordinates,
  LeadLineCoordinates,
  RDOFCoordinates,
  // MattieHarrisCoordinates,
  NLTC,
  polygon110Coordinates,
  polygon126Coordinates,
  polygon166Coordinates,
  polygon182Coordinates,
  polygon214Coordinates,
  polygon230Coordinates,
  polygon22Coordinates,
  polygon246Coordinates,
  polygon266Coordinates,
  polygon282Coordinates,
  polygon302Coordinates,
  polygon318Coordinates,
  polygon350Coordinates,
  polygon366Coordinates,
  polygon38Coordinates,
  polygon382Coordinates,
  polygon398Coordinates,
  polygon442Coordinates,
  polygon411Coordinates,
  indianTrailCoordinates,
  indianTrail2Coordinates,
  RDOF3Coordinates,
  RDOF4Coordinates,
  RDOF5Coordinates,
} from "./coordinates";
import PolygonMessage from "./PolygonMessage";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [polygonProps, setPolygonProps] = useState({
    fullAddress: "",
    areaType: "",
  });

  const polygons = [
    { name: "MeekRd", coordinates: MeekRdCoordinates, color: "#05B4DF" },
    // { name: "WhiteWater", coordinates: WhiteWaterCoordinates, color: "#05B4DF" },
    // { name: "SunSetArea", coordinates: SunSetAreaCoordinates, color: "#05B4DF" },
    { name: "LeadLine", coordinates: LeadLineCoordinates, color: "#371F76" },
    // { name: "RDOF", coordinates: RDOFCoordinates, color: "#DEA731" },
    // { name: "MattieHarris", coordinates: MattieHarrisCoordinates, color: "#05B4DF" },
    { name: "NLTC", coordinates: NLTC, color: "#05B4DF" },
    { name: "Polygon110", coordinates: polygon110Coordinates, color: "#05B4DF" },
    { name: "Polygon126", coordinates: polygon126Coordinates, color: "#05B4DF" },
    { name: "Polygon166", coordinates: polygon166Coordinates, color: "#05B4DF" },
    { name: "Polygon182", coordinates: polygon182Coordinates, color: "#05B4DF" },
    { name: "Polygon214", coordinates: polygon214Coordinates, color: "#05B4DF" },
    { name: "Polygon230", coordinates: polygon230Coordinates, color: "#05B4DF" },
    { name: "Polygon22", coordinates: polygon22Coordinates, color: "#05B4DF" },
    { name: "Polygon246", coordinates: polygon246Coordinates, color: "#05B4DF" },
    { name: "Polygon266", coordinates: polygon266Coordinates, color: "#05B4DF" },
    { name: "Polygon282", coordinates: polygon282Coordinates, color: "#05B4DF" },
    { name: "Polygon302", coordinates: polygon302Coordinates, color: "#05B4DF" },
    { name: "Polygon318", coordinates: polygon318Coordinates, color: "#05B4DF" },
    { name: "Polygon350", coordinates: polygon350Coordinates, color: "#05B4DF" },
    { name: "Polygon366", coordinates: polygon366Coordinates, color: "#05B4DF" },
    { name: "Polygon38", coordinates: polygon38Coordinates, color: "#05B4DF" },
    { name: "Polygon382", coordinates: polygon382Coordinates, color: "#05B4DF" },
    { name: "Polygon398", coordinates: polygon398Coordinates, color: "#05B4DF" },
    { name: "Polygon442", coordinates: polygon442Coordinates, color: "#05B4DF" },
    { name: "Polygon411", coordinates: polygon411Coordinates, color: "#05B4DF" },
    { name: "IndianTrail", coordinates: indianTrailCoordinates, color: "#05B4DF" },
    { name: "IndianTrail2", coordinates: indianTrail2Coordinates, color: "#05B4DF" },
    { name: "RDOF3", coordinates: RDOF3Coordinates, color: "#05B4DF" },
    // { name: "RDOF4", coordinates: RDOF4Coordinates, color: "#FF0000" },
    { name: "RDOF5", coordinates: RDOF5Coordinates, color: "#DEA731" },
  ];

  const addPolygon = (map: mapboxgl.Map, coordinates: number[][], id: string, fillColor: string) => {
    map.addSource(id, {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [coordinates],
        },
        properties: {},
      },
    });

    map.addLayer({
      id: id,
      type: "fill",
      source: id,
      layout: {},
      paint: {
        "fill-color": fillColor,
        "fill-opacity": 0.3,
      },
    });
  };

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/light-v10",
        center: [-85.157944, 39.910799],
        zoom: 10,
      });

map.on('load', function () {
  map.addSource('RDOF5Coordinates', {
    'type': 'geojson',
    'data': RDOF5Coordinates
  });

  map.addLayer({
    'id': 'RDOF5',
    'type': 'fill',
    'source': 'RDOF5Coordinates',
    'layout': {},
    'paint': {
      'fill-color': "#DEA731",
      'fill-opacity': 0.8
    }
  });
});


      map.on("load", () => {
        mapRef.current = map;

        // Add all polygons
        polygons.forEach((polygon) => {
          addPolygon(map, polygon.coordinates, polygon.name, polygon.color);
        });
      });

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      });

      document.getElementById("geocoder")?.appendChild(geocoder.onAdd(map));

      return () => map.remove();
    }
  }, []);

  useEffect(() => {
    const submitBtn = document.getElementById("submit-btn");
    if (submitBtn) {
      submitBtn.addEventListener("click", submitAddress);
    }
  }, []);

  const capitalizeFirstLetter = (str: string) => {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  };

const submitAddress = async () => {
  const streetAddress = capitalizeFirstLetter((document.getElementById("streetAddress") as HTMLInputElement).value);
  const city = capitalizeFirstLetter((document.getElementById("city") as HTMLInputElement).value);
  const state = (document.getElementById("state") as HTMLInputElement).value.toUpperCase();
  const zipcode = (document.getElementById("zipcode") as HTMLInputElement).value;

  const fullAddress = `${streetAddress}, ${city}, ${state} ${zipcode}`;
  console.log(fullAddress);

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(fullAddress)}.json?access_token=${mapboxgl.accessToken}`
    );

    if (!response.ok) {
      throw new Error("Failed to geocode address");
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

      new mapboxgl.Marker({ color: "#05B4DF" }).setLngLat(coordinates).addTo(map);

      const point = turf.point(coordinates);

      // Determine which polygon the point is inside
      const foundPolygon = polygons.find((polygon) =>
        turf.booleanPointInPolygon(point, turf.polygon([polygon.coordinates]))
      );

      if (!foundPolygon) {
        window.location.href = "https://nlbc.com/check-service-area/";
        return;
      }

      console.log('Found polygon:', foundPolygon.name);

      // Update state with the found polygon's name
      setPolygonProps({
        fullAddress,
        areaType: foundPolygon.name,
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};


  return (
    <>
      <div ref={mapContainerRef} className="h-[60vh] w-full" id="map" />
      {/* <PolygonMessage {...polygonProps} /> */}
    </>
  );
};

export default Map;
