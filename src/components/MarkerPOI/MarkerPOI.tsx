import React from "react";
import { Marker } from "react-map-gl";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faShop } from "@fortawesome/free-solid-svg-icons";

interface MarkerPOIProps {
  id: string;
  longitude: number;
  latitude: number;
  title: string;
  description: string;
  adress: string;
  openingHours: string;
  url: string;
  handleAdditionalInfo: Function;
  showAdditionalInfo: string;
}

export default function MarkerPOI({
  id,
  longitude,
  latitude,
  title,
  description,
  adress,
  openingHours,
  url,
  handleAdditionalInfo,
  showAdditionalInfo,
}: MarkerPOIProps) {
  return (
    <Marker longitude={longitude} latitude={latitude} anchor="bottom">
      {showAdditionalInfo === id && (
        <section className="bg-white z-10 p-2 rounded">
          <h1>Point of interest</h1>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{adress}</p>
          <p>{openingHours}</p>
          <Link href={url}>Website</Link>
        </section>
      )}
      <section
        onClick={() => handleAdditionalInfo(id)}
        className="flex flex-col items-center z-0"
      >
        <strong>POI</strong>
        <FontAwesomeIcon icon={faShop} className="text-2xl"></FontAwesomeIcon>
      </section>
    </Marker>
  );
}
