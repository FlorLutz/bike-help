import React from "react";
import { Popup } from "react-map-gl";
import { getMyTimeString } from "../../lib/clientActions";
import Link from "next/link";

export default function PopupMarker({ popupInfo, setPopupInfo }) {
  const {
    longitude,
    latitude,
    type,
    title,
    problem,
    date,
    description,
    adress,
    openingHours,
    url,
    locationDetails,
    tools,
    requestId,
    userId,
  } = popupInfo;
  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      anchor="bottom"
      onClose={() => {
        setPopupInfo(null);
      }}
    >
      <section
      //   className="bg-white z-10 p-2 rounded"
      >
        <h1 className="font-bold text-xl">{type}</h1>
        <h2 className="font-bold text-lg">{title}</h2>
        <h2 className="font-bold text-lg">{problem}</h2>
        <p>{`created: ${getMyTimeString(date)} by user with id: ${userId}`}</p>
        <p>{description}</p>
        <p>{adress}</p>
        <p>{openingHours}</p>
        {url && <Link href={url}>Website</Link>}
        <p>{locationDetails}</p>
        <p>{tools}</p>
        {requestId && <Link href={`/request/${requestId}`}>Show details</Link>}
      </section>
    </Popup>
  );
}

// longitude, latitude, type, title/problem, date?, description, adress, openingHours, url, locationDetails, tools, requestId, user?
