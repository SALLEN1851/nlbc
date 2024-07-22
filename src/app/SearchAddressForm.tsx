"use client"; // Mark this file as a client component

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as turf from '@turf/turf';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsbGVuMTg1MSIsImEiOiJjbHlzMTZta2kwZDBzMmxvZ2NlaWMwN2l4In0.CjvkSuei_KsmEkVs6-CgcA';


const SearchAddressForm: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const capitalizeFirstLetter = (str: string) => {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const streetAddress = capitalizeFirstLetter((document.getElementById('streetAddress') as HTMLInputElement).value);
    const city = capitalizeFirstLetter((document.getElementById('city') as HTMLInputElement).value);
    const state = (document.getElementById('state') as HTMLInputElement).value.toUpperCase();
    const zipcode = (document.getElementById('zipcode') as HTMLInputElement).value;

    const fullAddress = `${streetAddress}, ${city}, ${state} ${zipcode}`;

    console.log(fullAddress); // Check if fullAddress is capitalized correctly

    try {
      // Convert the address to geocoordinates using Mapbox Geocoding API
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(fullAddress)}.json?access_token=${mapboxgl.accessToken}`);
      console.log("geocoordines translation");
      if (!response.ok) {
        throw new Error('Failed to geocode address');
      }
      const data = await response.json();

      // Retrieve the coordinates from the geocoding response
      const coordinates = data.features[0].geometry.coordinates;
      console.log(coordinates); // Check the coordinates

      // Fly to the new marker's location
      mapRef.current?.flyTo({
        center: coordinates,
        zoom: 15, // You can adjust the zoom level as needed
        speed: 1.5, // Animation speed
      });

      // Place a marker at the address location
      new mapboxgl.Marker({
        color: "#05B4DF" // Hex code for yellow
      })
        .setLngLat(coordinates)
        .addTo(mapRef.current);

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

      // Determine which polygon the point is in and display a unique message
      let message;
      if (isInsideMeekRd) {
        message = `<h2 class="section-heading">You're Qualified!</h2><p><strong>${fullAddress}</strong> is qualified for fiber optic internet service.</p>
                   <p>If you would like fiber optic internet service at your residence, please click the sign up now button and you can fill out the residential service agreement.</p>
                   <div>
                       <a href="https://nlbcnltc.eversign.com/embedded/552f574523c247f0821d4b984484ea65" class="button-link">Sign up now</a>
                   </div>
                   <p>If you are interested in a commercial internet service or would like to speak with a representative, 
                       <a href="https://share.hsforms.com/1IXoUM1AlTMClAEYjqMJr7w473vr" id="form-link">please click here to fill out our contact form to have a representative reach out to you.</a> </p>`;
      } else if (isInsideWhiteWater) {
        message = `<h2 class="section-heading">You're Qualified!</h2><p><strong>${fullAddress}</strong> is qualified for fiber optic internet service.</p> <p>If you would like fiber optic internet service at your residence, please click the sign up now button and you can fill out the residential service agreement.</p> <div>
                       <a href="https://nlbcnltc.eversign.com/embedded/552f574523c247f0821d4b984484ea65" class="button-link">Sign up now</a>
                   </div>
                   <p>If you are interested in a commercial internet service or would like to speak with a representative, 
                       <a href="https://share.hsforms.com/1IXoUM1AlTMClAEYjqMJr7w473vr" id="form-link">please click here to fill out our contact form to have a representative reach out to you.</a> </p>`;
      } else if (isInsideSunSetArea) {
        message = `<h2 class="section-heading">You're Qualified!</h2><p><strong>${fullAddress}</strong> is qualified for fiber optic internet service.</p> <p>If you would like fiber optic internet service at your residence, please click the sign up now button and you can fill out the residential service agreement.</p> <div>
                       <a href="https://nlbcnltc.eversign.com/embedded/552f574523c247f0821d4b984484ea65" class="button-link">Sign up now</a>
                   </div>
                   <p>If you are interested in a commercial internet service or would like to speak with a representative, 
                       <a href="https://share.hsforms.com/1IXoUM1AlTMClAEYjqMJr7w473vr" id="form-link">please click here to fill out our contact form to have a representative reach out to you.</a> </p>`;
      } else if (isInsideLeadLine) {
        message = `<h2 class="section-heading">Area of Interest</h2><p><strong>${fullAddress}</strong> falls into an area that we are considering for near future fiber deployment.</p>
                   <p>We must reach a set number of commitments before construction can begin in this area.<br>
                   If you would like to receive fiber optic internet service at this address, please fill out the information below and click the submit button.</p> <div id="message-section">
                       <form id="LeadLineInterest">
                           <div class="form-group">
                               <label for="firstName">First Name:</label>
                               <input type="text" id="firstName" name="firstName" required />
                           </div>
                           <div class="form-group">
                               <label for="lastName">Last Name:</label>
                               <input type="text" id="lastName" name="lastName" required />
                           </div>
                           <div class="form-group">
                               <label for="streetAddress">Address:</label>
                               <input type="text" id="streetAddress" name="streetAddress" required />
                           </div>
                           <div class="form-group">
                               <label for="city">City:</label>
                               <input type="text" id="city" name="city" required />
                           </div>
                           <div class="form-group">
                               <label for="state">State:</label>
                               <input type="text" id="state" name="state" required />
                           </div>
                           <div class="form-group">
                               <label for="postalCode">Postal Code:</label>
                               <input type="text" id="postalCode" name="postalCode" required />
                           </div>
                           <div class="form-group">
                               <label for="email">Email:</label>
                               <input type="email" id="email" name="email" required />
                           </div>
                           <div class="form-group">
                               <label for="phone">Phone Number:</label>
                               <input type="tel" id="phone" name="phone" required />
                           </div>
                           <div>
                               <button type="submit">Submit</button>
                           </div>
                       </form>
                   </div>`;
      } else if (isInsideRDOF) {
        message = `<h2 class="section-heading">Pre-Construction</h2><p><strong>${fullAddress}</strong> is an area that is currently in the pre-construction phase which means that we will soon begin placing fiber optic internet service in your area.<br>
                   If you would like to pre-order your residential internet service, please click the sign up now button and you can fill out the agreement for service.<p/><div>
                       <a href="https://nlbcnltc.eversign.com/embedded/552f574523c247f0821d4b984484ea65" class="button-link">Sign up now</a>
                   </div>
                   <p>If you are interested in a commercial internet service or would like to speak with a representative, 
                       <a href="https://share.hsforms.com/1IXoUM1AlTMClAEYjqMJr7w473vr" id="form-link">please click here to fill out our contact form to have a representative reach out to you.</a> </p>`;
      } else if (isInsideMattieHarris) {
        message = `<h2 class="section-heading">You're Qualified!</h2><p><strong>${fullAddress}</strong> is qualified for fiber optic internet service.</p> <p>If you would like fiber optic internet service at your residence, please click the sign up now button and you can fill out the residential service agreement.</p><div>
                       <a href="https://nlbcnltc.eversign.com/embedded/552f574523c247f0821d4b984484ea65" class="button-link">Sign up now</a>
                   </div>
                   <p>If you are interested in a commercial internet service or would like to speak with a representative, 
                       <a href="https://share.hsforms.com/1IXoUM1AlTMClAEYjqMJr7w473vr" id="form-link">please click here to fill out our contact form to have a representative reach out to you.</a> </p>`;
      } else {
        window.location.href = 'https://nlbc.com/check-service-area/';
        message = `Contact us to confirm service availability at <strong>${fullAddress}</strong>.`;
      }

      // Update the notification based on whether the marker is inside any of the polygons
      if (notificationRef.current) {
        notificationRef.current.innerHTML = message;
        notificationRef.current.style.display = 'block';
      }

      const formData = {
        streetAddress,
        city,
        state,
        zipcode,
        coordinates: {
          type: "Point", // As defined in your schema
          coordinates: [coordinates[0], coordinates[1]] // [longitude, latitude]
        }
      };

      const backendResponse = await fetch('https://service-production-1fef.up.railway.app/api/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (backendResponse.ok) {
        console.log('Address submitted successfully');
        // Optionally, you can redirect or display a success message here
      } else {
        console.error('Failed to submit address to backend:', backendResponse.statusText);
        // Handle the error (e.g., display an error message)
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle the error (e.g., display an error message)
    }
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9
    },);
    mapRef.current = map;

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    console.log('Geocoder initialized.');

    map.addControl(geocoder);

    console.log('Geocoder added to the HTML.');

     // Add the Mapbox Search script
     const script = document.createElement('script');
     script.id = 'search-js';
     script.defer = true;
     script.src = 'https://api.mapbox.com/search-js/v1.0.0-beta.18/web.js';
     document.body.appendChild(script);
 
     script.onload = () => {
       (window as any).mapboxsearch.autofill({
         accessToken: 'pk.eyJ1Ijoic2FsbGVuMTg1MSIsImEiOiJjbHlzMTZta2kwZDBzMmxvZ2NlaWMwN2l4In0.CjvkSuei_KsmEkVs6-CgcA'
       });
     };

    return () => {
      map.remove();
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
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
      <div id="notification" ref={notificationRef} className="hidden"></div>
      <div id="map-container" ref={mapContainerRef} className="h-0 w-0"></div>
    </div>
  );
};

export default SearchAddressForm;
