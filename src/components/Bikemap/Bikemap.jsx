"use client";
import React, { useEffect } from "react";
import Map, { NavigationControl, GeolocateControl } from "react-map-gl";
import { useState } from "react";
import MarkerPOI from "../MarkerPOI/MarkerPOI";
import MarkerRequest from "../MarkerRequest/MarkerRequest";
import PopupMarker from "../PopupMarker/PopupMarker";
import useSWR from "swr";
import { RotatingLines } from "react-loader-spinner";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Bikemap() {
  //map center on location
  const [initialViewState, setInitialViewState] = useState({});
  function getViewstate() {
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
    getViewstate();
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
      // userId: markerData.userId,
    });
  }

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
      {(poiIsLoading || openRequestsIsLoading) ?? (
        <div className="absolute top-1/4 left-1/4">
          <RotatingLines
            visible={true}
            width="300"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      )}
      {/* {openRequestsIsLoading && <p>Waiting for Request data</p>} */}
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
