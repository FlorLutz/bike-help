"use client";
import React, { useEffect } from "react";
import Map, { NavigationControl, GeolocateControl } from "react-map-gl";
import { useState } from "react";
import MarkerPOI from "../MarkerPOI/MarkerPOI";
import MarkerRequest from "../MarkerRequest/MarkerRequest";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Bikemap() {
  const [initialViewState, setInitialViewState] = useState({
    longitude: 12,
    latitude: 51,
    zoom: 16,
  });
  useEffect(() => {
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
  }, []);

  const {
    data: poiData,
    error: poiError,
    isLoading: poiIsLoading,
  } = useSWR("/api/pointsofinterest", fetcher);

  const {
    data: openRequestsData,
    error: openRequestsError,
    isLoading: openRequestsIsLoading,
  } = useSWR("/api/requests", fetcher);

  //conditional showing of additional information on click
  const [showAdditionalInfo, setShowAdditionalInfo] = useState();
  function handleAdditionalInfo(poiId) {
    // console.log("showAdditionalInfo", showAdditionalInfo);
    if (showAdditionalInfo === poiId) {
      setShowAdditionalInfo();
    } else {
      setShowAdditionalInfo(poiId);
    }
  }
  //viewport adjustment to windowsize
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

  if (!openRequestsData || !poiData) {
    return;
  }
  // console.log(poiData);
  //   console.log("viewport", getViewport());

  //   DEBOUNCERFUNCTION mit Timeout, damit abgewartet wird bis viewportchange abgeschlossen ist
  // too many rerenderings for this function (and requests to the api):
  // window.visualViewport.addEventListener("resize", () => {
  //   console.log("resizing");
  //   setViewport(getViewport());
  // });

  return (
    <>
      {poiIsLoading && <p>Waiting for POIdata</p>}
      {openRequestsIsLoading && <p>Waiting for data</p>}
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={initialViewState}
        style={{ width: viewport[0], height: viewport[1] - 95 }} // adjusts to screensize
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <MarkerPOI
          id="blabliblub"
          latitude={52.502}
          longitude={13.411}
          title="Spiced TEST POI"
          description="Academy"
          adress="Ritterstr., Kreuzberg"
          openingHours="Mo-Fr, 9-18"
          url="https://www.spiced-academy.com/"
          handleAdditionalInfo={handleAdditionalInfo}
          showAdditionalInfo={showAdditionalInfo}
        />
        {openRequestsData.map((openRequest) => (
          <MarkerRequest
            key={openRequest._id}
            id={openRequest._id}
            latitude={openRequest.latitude}
            longitude={openRequest.longitude}
            problem={openRequest.problem}
            description={openRequest.description}
            locationDetails={openRequest.locationDetails}
            tools={openRequest.tools}
            date={openRequest.date}
            // handleAdditionalInfo={handleAdditionalInfo}
            // showAdditionalInfo={showAdditionalInfo}
          />
        ))}
        {poiData.map((poi) => (
          <MarkerPOI
            key={poi._id}
            id={poi._id}
            latitude={poi.latitude}
            longitude={poi.longitude}
            title={poi.title}
            description={poi.description}
            adress={poi.adress}
            openingHours={poi.openingHours}
            url={poi.url}
            handleAdditionalInfo={handleAdditionalInfo}
            showAdditionalInfo={showAdditionalInfo}
          />
        ))}
        <NavigationControl />
        <GeolocateControl />
      </Map>
    </>
  );
}
