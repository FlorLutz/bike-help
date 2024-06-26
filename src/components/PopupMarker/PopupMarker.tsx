"use client";
import React from "react";
import { Popup } from "react-map-gl";
import { getTimeDifference } from "../../lib/clientActions";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faWrench,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface PopupInfo {
  longitude: number;
  latitude: number;
  type: string;
  date: string;
  title: string;
  problem: string;
  description: string;
  adress: string;
  openingHours: string;
  url: string;
  locationDetails: string;
  tools: string;
  requestId: string;
  userId: string;
}

interface PopupMarkerProps {
  popupInfo: PopupInfo;
  setPopupInfo: Function;
}

export default function PopupMarker({
  popupInfo,
  setPopupInfo,
}: PopupMarkerProps) {
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
    // userId,
  } = popupInfo;

  const session = useSession();

  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      anchor="bottom"
      offset={20}
      onClose={() => {
        setPopupInfo(null);
      }}
    >
      <section className="text-lg font-sans text-emerald-950 flex flex-col justify-center gap-1">
        {title && <h2 className="font-bold text-xl text-center">{title}</h2>}
        <h2 className="font-bold text-lg text-center">{problem}</h2>
        <Image
          className="rounded-full self-center"
          src={
            title
              ? description.includes("DIY")
                ? "/diy.jpg"
                : "/repair-station.jpg"
              : "/broken-bike.jpg"
          }
          width={150}
          height={150}
          alt="foto to ilustrate marker type"
        />
        <p>
          {type === "Point of Interest" ? "*get help here" : "*help request"}
        </p>
        {date && (
          <>
            <FontAwesomeIcon icon={faClock} />
            <p>{`created: ${getTimeDifference(date)}`}</p>
          </>
        )}
        <p>{description}</p>
        {adress && (
          <>
            <FontAwesomeIcon icon={faLocationDot} />
            <p>{adress}</p>
          </>
        )}
        {openingHours && (
          <>
            <FontAwesomeIcon icon={faClock} />
            <p>{openingHours}</p>
          </>
        )}
        {url && (
          <Link
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            className="text-emerald-500 font-bold text-center"
          >
            view website
          </Link>
        )}
        {locationDetails && (
          <>
            <FontAwesomeIcon icon={faLocationDot} />
            <p>{locationDetails}</p>
          </>
        )}
        {tools && (
          <>
            <FontAwesomeIcon icon={faWrench} />
            <p>{tools}</p>
          </>
        )}
        {problem && (
          <Link
            href={
              session.status === "unauthenticated"
                ? "/request"
                : `/request/${requestId}`
            }
            className="text-emerald-500 font-bold text-center"
          >
            see details
          </Link>
        )}
      </section>
    </Popup>
  );
}
