"use client";
import React, { useEffect } from "react";
import Map, { NavigationControl, GeolocateControl, Marker } from "react-map-gl";
import { useState } from "react";
import MarkerPOI from "../MarkerPOI/MarkerPOI";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function Bikemap() {
  const { data, error, isLoading } = useSWR("/api/pointsofinterest", fetcher);
  const [viewport, setViewport] = useState([]);
  function getViewport() {
    if (typeof window !== "undefined") {
      const currentViewport = [window.innerWidth, window.innerHeight];
      setViewport(currentViewport);
    }
  }
  useEffect(() => {
    getViewport();
  }, []);
  if (!data) {
    return;
  }
  console.log(data);
  //   console.log("viewport", getViewport());

  //API-REQUEST FOR POI-MARKERS:
  // const { data, isLoading } = useSWR("api/pointsofinterest");
  // if (!data) {
  //   return;
  // }
  // console.log("POIs", data);

  //   DEBOUNCERFUNCTION mit Timeout, damit abgewartet wird bis viewportchange abgeschlossen ist
  // too many rerenderings for this function (and requests to the api):
  // window.visualViewport.addEventListener("resize", () => {
  //   console.log("resizing");
  //   setViewport(getViewport());
  // });

  return (
    <>
      {/* {isLoading && <p>Waiting for data</p>} */}
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          latitude: 52.502, //currentlocation can be found with with GeolocateControl, for now, this is close to Spiced
          longitude: 13.411,
          zoom: 16,
        }}
        style={{ width: viewport[0], height: viewport[1] - 95 }} // adjusts to screensize
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <MarkerPOI
          latitude={52.502}
          longitude={13.411}
          title="Rückenwind"
          description="Selbsthilfe"
          adress="Lenaustr. 3, Berlin"
          openingHours="Mo-Fr, 10-18"
          url="https://rueckenwind.berlin/"
        />
        <NavigationControl />
        <GeolocateControl />
      </Map>
    </>
  );
}
