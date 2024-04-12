"use client";
import React from "react";
import Map, { NavigationControl, GeolocateControl, Marker } from "react-map-gl";
import { useState } from "react";
import MarkerPOI from "../MarkerPOI/MarkerPOI";

export default function Bikemap() {
  function getViewport(): number[] {
    const viewport = [window.innerWidth, window.innerHeight];
    return viewport;
  }
  console.log("viewport", getViewport());
  const [viewport, setViewport] = useState(getViewport());

  //   DEBOUNCERFUNCTION mit Timeout, damit abgewartet wird bis viewportchange abgeschlossen ist
  // useEffect(() => {
  //   function getViewport() {
  //     const viewPort = [window.innerWidth, window.innerHeight];
  //     return viewPort;
  //   }
  //   setViewport(getViewport());
  // }, []);

  // Add zoom and rotation controls to the map.
  // too many rerenderings for this function (and requests to the api):
  // window.visualViewport.addEventListener("resize", () => {
  //   console.log("resizing");
  //   setViewport(getViewport());
  // });

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      mapLib={import("mapbox-gl")}
      initialViewState={{
        longitude: 13.411, //currentlocation can be found with with GeolocateControl, this is close to Spiced
        latitude: 52.502,
        zoom: 16,
      }}
      style={{ width: viewport[0], height: viewport[1] - 95 }} // adjusts to screensize
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <MarkerPOI
        longitude={13.411}
        latitude={52.502}
        title="Rückenwind"
        description="Selbsthilfe"
        openingHours="Mo-Fr, 10-18"
        url="https://rueckenwind.berlin/"
      />
      <NavigationControl />
      <GeolocateControl />
    </Map>
  );
}
