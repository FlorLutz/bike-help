"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faCircleCheck,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import InteractiveMap, {
  NavigationControl,
  GeolocateControl,
  Marker,
} from "react-map-gl";

export default function RequestDetails(requestData) {
  console.log("REQUEST IN REG DET", requestData.requestData);
  const data = requestData.requestData;

  return (
    <section>
      <h1 className="font-bold text-xl mb-6">Details for your open Request</h1>
      <p className="font-bold">What part is broken/not working:*</p>
      <p>{data.problem}</p>

      {data.locationdetais && (
        <>
          <p className="font-bold">location details (optional):</p>
          <p>{data.locationdetails}</p>
        </>
      )}

      {data.locationdetais && (
        <>
          <p className="font-bold">additional description (optional):</p>
          <p>{data.description}</p>
        </>
      )}

      {data.locationdetais && (
        <>
          <p className="font-bold">tools needed (optional):</p>
          <p>{data.tools}</p>
        </>
      )}
      <p className="font-bold">your location:</p>

      <InteractiveMap
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          latitude: data.latitude,
          longitude: data.longitude,
          zoom: 16,
        }}
        style={{ width: 400, height: 400 }} // adjusts to screensize
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          longitude={data.longitude}
          latitude={data.latitude}
          anchor="bottom"
        >
          <div className="flex flex-col items-center">
            <strong>HELP!</strong>
            <FontAwesomeIcon
              icon={faScrewdriverWrench}
              className="text-2xl"
            ></FontAwesomeIcon>
          </div>
        </Marker>
        <NavigationControl />
        <GeolocateControl />
      </InteractiveMap>

      <button
        type="button"
        className="border-4 border-emerald-950 p-2 rounded bg-emerald-500"
      >
        <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
        edit
      </button>
      <button
        type="button"
        className="border-4 border-emerald-950 p-2 rounded bg-emerald-500"
      >
        <FontAwesomeIcon icon={faTrash} className="mr-2" />
        delete
      </button>
      <button
        type="button"
        className="border-4 border-emerald-950 p-2 rounded bg-emerald-500"
      >
        <FontAwesomeIcon icon={faCircleCheck} className="mr-2" />
        mark as resolved
      </button>
    </section>
  );
}
