"use client";
import React, { useEffect } from "react";
import Map, { NavigationControl, GeolocateControl, Marker } from "react-map-gl";
import { useState } from "react";
import MarkerPOI from "../MarkerPOI/MarkerPOI";

export default function Bikemap() {
  const [viewport, setViewport] = useState([]);
  function getViewport() {
    if (typeof window !== "undefined") {
      const currentViewport = [window.innerWidth, window.innerHeight];
      setViewport(currentViewport);
    }
  }
  //   console.log("viewport", getViewport());
  useEffect(() => {
    getViewport();
  }, []);

  //   DEBOUNCERFUNCTION mit Timeout, damit abgewartet wird bis viewportchange abgeschlossen ist
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
        longitude: 13.411, //currentlocation can be found with with GeolocateControl, for now, this is close to Spiced
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
