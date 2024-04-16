import React, { useState } from "react";
import InteractiveMap, {
  NavigationControl,
  GeolocateControl,
  Marker,
  MapLayerMouseEvent,
  MarkerDragEvent,
} from "react-map-gl";

interface InteractiveBikeMapProps {
  handleDragEnd: ((e: MarkerDragEvent) => void) | undefined;
  handleMapClick: ((e: MapLayerMouseEvent) => void) | undefined;
  marker: { longitude: number; latitude: number };
}

export default function InteractiveBikeMap({
  handleMapClick,
  handleDragEnd,
  marker,
}: InteractiveBikeMapProps) {
  console.log("marker in InteractiveBikeMap", marker);

  return (
    <InteractiveMap
      onClick={handleMapClick}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      mapLib={import("mapbox-gl")}
      initialViewState={{
        latitude: 52.502, //currentlocation can be found with with GeolocateControl, for now, this is close to Spiced
        longitude: 13.411,
        zoom: 16,
      }}
      style={{ width: 400, height: 400 }} // adjusts to screensize
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {marker.longitude && (
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          draggable
          onDragEnd={handleDragEnd}
        />
      )}
      <NavigationControl />
      <GeolocateControl />
    </InteractiveMap>
  );
}
