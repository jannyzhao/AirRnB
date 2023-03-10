import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./GoogleMaps.css";
import { useSelector } from "react-redux";
import { getListing } from "../../store/listings";
import { useParams } from "react-router-dom";

export default function GoogleMaps() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const { listingId } = useParams();
  const listing = useSelector(getListing(listingId));
  const center = { lat: listing.latitude, lng: listing.longitude };

  return (
    <GoogleMap zoom={12} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}
