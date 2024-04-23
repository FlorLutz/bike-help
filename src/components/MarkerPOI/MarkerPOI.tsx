import React from "react";
import { Marker } from "react-map-gl";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faShop } from "@fortawesome/free-solid-svg-icons";

interface MarkerPOIProps {
  poiData: {
    id: string;
    longitude: number;
    latitude: number;
    title: string;
    description: string;
    adress: string;
    openingHours: string;
    url: string;
  };
  type: string;
  handleAdditionalInfo: Function;
}

export default function MarkerPOI({
  poiData,
  type,
  handleAdditionalInfo,
}: MarkerPOIProps) {
  return (
    <>
      <Marker
        longitude={poiData.longitude}
        latitude={poiData.latitude}
        anchor="center"
      >
        <section
          onClick={(e) => {
            e.stopPropagation();
            handleAdditionalInfo(poiData, type);
          }}
          className="flex flex-col items-center"
        >
          <strong>POI</strong>
          <FontAwesomeIcon
            icon={faShop}
            className="text-2xl -z-1"
          ></FontAwesomeIcon>
        </section>
      </Marker>
    </>
  );
}
