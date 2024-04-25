import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
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
  interface IInitialViewState {
    latitude: number | undefined;
    longitude: number | undefined;
    zoom: number | undefined;
  }

  //viewport adjustment to windowsize
  const [viewport, setViewport]: [number[] | any, Function] = useState([]);

  function getViewport() {
    if (typeof window !== "undefined") {
      const currentViewport = [window.innerWidth, window.innerHeight];
      setViewport(currentViewport);
    }
  }
  useEffect(() => {
    getViewport();
  }, []);

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
            zoom: 17,
          });
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!initialViewState.latitude) {
    return;
  }

  return (
    <InteractiveMap
      onClick={handleMapClick}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      mapLib={import("mapbox-gl")}
      initialViewState={initialViewState}
      style={{
        width: Math.min(viewport[0], viewport[1], 616) - 50,
        height: Math.min(viewport[0], viewport[1], 616) - 50,
      }} // adjusts to screensize
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {marker.longitude && (
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          draggable
          onDragEnd={handleDragEnd}
          anchor="center"
        >
          <div className="flex flex-col items-center text-orange-700">
            <strong>HELP!</strong>
            <FontAwesomeIcon
              icon={faScrewdriverWrench}
              className="text-2xl"
            ></FontAwesomeIcon>
          </div>
        </Marker>
      )}
      <NavigationControl />
      <GeolocateControl />
    </InteractiveMap>
  );
}
