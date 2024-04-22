"use client";
import React, { useEffect } from "react";
import Map, { NavigationControl, GeolocateControl } from "react-map-gl";
import { useState } from "react";
import MarkerPOI from "../MarkerPOI/MarkerPOI";
import MarkerRequest from "../MarkerRequest/MarkerRequest";
import PopupMarker from "../PopupMarker/PopupMarker";
import useSWR from "swr";
import { useRouter } from "next/navigation";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Bikemap() {
  const router = useRouter();
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

  //conditional showing of additional information on click
  // const [showAdditionalInfo, setShowAdditionalInfo] = useState();
  // function handleAdditionalInfo(poiId) {
  // console.log("showAdditionalInfo", showAdditionalInfo);
  // if (showAdditionalInfo === poiId) {
  // setShowAdditionalInfo();
  // } else {
  // setShowAdditionalInfo(poiId);
  // }
  // }
  const [popupInfo, setPopupInfo] = useState(
    null // latitude: 52.48986,
    // longitude: 13.42512,
    // title: "Rückenwind",
    // adress: "Lenaustr. 3, 12047 Berlin",
    // description: "self-help workshop, NGO for refugees",
    // openingHours: "Friday 10-18",
    // url: "https://rueckenwind.berlin/",
  );
  function handleAdditionalInfo(markerData, type) {
    console.log("setting popupinfo to:", markerData);
    setPopupInfo({
      longitude: markerData.longitude,
      latitude: markerData.latitude,
      type: type,
      title: markerData.title,
      title: markerData.problem,
      description: markerData.description,
      adress: markerData.adress,
      openingHours: markerData.openingHours,
      url: markerData.url,
      locationDetails: markerData.locationDetails,
      tools: markerData.tools,
      requestId: markerData.id,
      userId: markerData.userId,
    });
    // router.refresh();
  }
  console.log("set popupinfo to:", popupInfo);
  // useEffect(() => {
  //   if (popupInfo == !null)
  // }, [popupInfo]);

  // function handleAdditionalRequestInfo() {
  //   setPopupInfo({
  //     longitude: longitude,
  //     latitude: latitude,
  //     type: "please HELP",
  //     title: problem,
  //     date: date,
  //     description: description,
  //     locationDetails: locationDetails,
  //     tools: tools,
  //     requestId: id,
  //     userId,
  //   });
  // }

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
        {/* <MarkerPOI
          id="blabliblub"
          latitude={52.502}
          longitude={13.411}
          title="Spiced TEST POI"
          description="Academy"
          adress="Ritterstr., Kreuzberg"
          openingHours="Mo-Fr, 9-18"
          url="https://www.spiced-academy.com/"
          type="Point of Interest"
          handleAdditionalInfo={handleAdditionalInfo}
          // showAdditionalInfo={showAdditionalInfo}
        /> */}
        {openRequestsData.map((openRequest) => (
          <MarkerRequest
            key={openRequest._id}
            requestData={openRequest}
            // id={openRequest._id}
            // latitude={openRequest.latitude}
            // longitude={openRequest.longitude}
            // problem={openRequest.problem}
            // description={openRequest.description}
            // locationDetails={openRequest.locationDetails}
            // tools={openRequest.tools}
            // date={openRequest.date}
            // userId={openRequest.userId}
            type="Point of Interest"
            handleAdditionalInfo={handleAdditionalInfo}
            // showAdditionalInfo={showAdditionalInfo}
          />
        ))}
        {poiData.map((poi) => (
          <MarkerPOI
            key={poi._id}
            poiData={poi}
            // latitude={poi.latitude}
            // longitude={poi.longitude}
            // title={poi.title}
            // description={poi.description}
            // adress={poi.adress}
            // openingHours={poi.openingHours}
            // url={poi.url}
            type="please HELP"
            handleAdditionalInfo={handleAdditionalInfo}
            // showAdditionalInfo={showAdditionalInfo}
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
