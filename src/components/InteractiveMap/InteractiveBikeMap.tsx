import React, { useEffect, useState } from "react";
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

  //currentlocation can be found with with GeolocateControl, for now, this is close to Spiced
  // let lat = 52.502;
  // let long = 13.411;

  // if (marker) {
  //   lat = marker.latitude;
  //   long = marker.longitude;
  // }

  // const [center, setCenter] = useState({ latitude: null, longitude: null });
  // useEffect(() => {
  //   marker &&
  //     setCenter({ longitude: marker.longitude, latitude: marker.latitude });
  // }, []);

  if (!marker.longitude) {
    return;
  }

  return (
    <InteractiveMap
      onClick={handleMapClick}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      mapLib={import("mapbox-gl")}
      initialViewState={{
        latitude: marker.latitude,
        longitude: marker.longitude,
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
