import React, { useEffect, useState } from "react";
import InteractiveMap, {
  NavigationControl,
  GeolocateControl,
  Marker,
  MapLayerMouseEvent,
  MarkerDragEvent,
} from "react-map-gl";

interface IInteractiveBikeMapProps {
  handleDragEnd: ((e: MarkerDragEvent) => void) | undefined;
  handleMapClick: ((e: MapLayerMouseEvent) => void) | undefined;
  marker: { longitude: number; latitude: number };
}

export default function InteractiveBikeMap({
  handleMapClick,
  handleDragEnd,
  marker,
}: IInteractiveBikeMapProps) {
  console.log("marker in InteractiveBikeMap", marker);

  interface IInitialViewState {
    latitude: number | undefined;
    longitude: number | undefined;
    zoom: number | undefined;
  }

  const [initialViewState, setInitialViewState]: [IInitialViewState, Function] =
    useState({ latitude: undefined, longitude: undefined, zoom: undefined });
  useEffect(() => {
    if (marker.longitude) {
      setInitialViewState({
        latitude: marker.latitude,
        longitude: marker.longitude,
        zoom: 16,
      });
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setInitialViewState({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            zoom: 16,
          });
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("NEW initialViewState", initialViewState);

  if (!initialViewState.latitude) {
    return;
  }

  return (
    <InteractiveMap
      onClick={handleMapClick}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      mapLib={import("mapbox-gl")}
      initialViewState={initialViewState}
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
