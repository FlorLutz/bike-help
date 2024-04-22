"use client";
import React, { useEffect } from "react";
import Map, { NavigationControl, GeolocateControl } from "react-map-gl";
import { useState } from "react";
import MarkerPOI from "../MarkerPOI/MarkerPOI";
import MarkerRequest from "../MarkerRequest/MarkerRequest";
import PopupMarker from "../PopupMarker/PopupMarker";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Bikemap() {
  const [initialViewState, setInitialViewState] = useState({});
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

  const [popupInfo, setPopupInfo] = useState(null);
  function handleAdditionalInfo(markerData, type) {
    console.log("setting popupinfo to:", markerData);
    setPopupInfo({
      longitude: markerData.longitude,
      latitude: markerData.latitude,
      type: type,
      date: markerData.date,
      title: markerData.title,
      problem: markerData.problem,
      description: markerData.description,
      adress: markerData.adress,
      openingHours: markerData.openingHours,
      url: markerData.url,
      locationDetails: markerData.locationDetails,
      tools: markerData.tools,
      requestId: markerData._id,
      userId: markerData.userId,
    });
  }
  console.log("set popupinfo to:", popupInfo);

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

  if (!openRequestsData || !poiData || !initialViewState.latitude) {
    return;
  }

  //   DEBOUNCERFUNCTION mit Timeout, damit abgewartet wird bis viewportchange abgeschlossen ist
  // too many rerenderings for this function (and requests to the api):
  // window.visualViewport.addEventListener("resize", () => {
  //   console.log("resizing");
  //   setViewport(getViewport());
  // });

  return (
    <>
      {poiIsLoading && <p>Waiting for POI data</p>}
      {openRequestsIsLoading && <p>Waiting for Request data</p>}
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={initialViewState}
        style={{ width: viewport[0], height: viewport[1] - 144 }} // adjusts to screensize
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {openRequestsData.map((openRequest) => (
          <MarkerRequest
            key={openRequest._id}
            requestData={openRequest}
            type="please HELP"
            handleAdditionalInfo={handleAdditionalInfo}
          />
        ))}
        {poiData.map((poi) => (
          <MarkerPOI
            key={poi._id}
            poiData={poi}
            type="Point of Interest"
            handleAdditionalInfo={handleAdditionalInfo}
          />
        ))}
        {popupInfo && (
          <PopupMarker popupInfo={popupInfo} setPopupInfo={setPopupInfo} />
        )}
        <NavigationControl />
        <GeolocateControl />
      </Map>
    </>
  );
}
