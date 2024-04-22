import React from "react";
import { Popup } from "react-map-gl";
import { getMyDateString } from "../../lib/clientActions";
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
      <section>
        <h1 className="font-bold text-xl">{type}</h1>
        {title && <h2 className="font-bold text-lg">{title}</h2>}
        <h2 className="font-bold text-lg">{problem}</h2>
        {date && (
          <p>{`created: ${getMyDateString(
            date
          )} by user with id: ${userId}`}</p>
        )}
        <p>{description}</p>
        {adress && <p>{adress}</p>}
        {openingHours && <p>{openingHours}</p>}
        {url && (
          <Link href={url} className="text-emerald-500">
            {" "}
            got to website
          </Link>
        )}
        {locationDetails && <p>{locationDetails}</p>}
        {tools && <p>{tools}</p>}
        {requestId && (
          <Link href={`/request/${requestId}`} className="text-emerald-500">
            Show details
          </Link>
        )}
      </section>
    </Popup>
  );
}

// longitude, latitude, type, title/problem, date?, description, adress, openingHours, url, locationDetails, tools, requestId, user?
