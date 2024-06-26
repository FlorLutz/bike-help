import React from "react";
import { Marker } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

interface MarkerRequestProps {
  requestData: {
    _id: string;
    longitude: number;
    latitude: number;
    problem: string;
    description: string;
    locationDetails: string;
    tools: string;
    date: Date;
    handleAdditionalRequestInfo: Function;
    userId: string;
  };
  type: string;
  handleAdditionalInfo: Function;
}

export default function MarkerRequest({
  requestData,
  handleAdditionalInfo,
  type,
}: MarkerRequestProps) {
  return (
    <Marker
      longitude={requestData.longitude}
      latitude={requestData.latitude}
      anchor="center"
    >
      <section
        onClick={(e) => {
          e.stopPropagation();
          handleAdditionalInfo(requestData, type);
        }}
        className="flex flex-col items-center z-10 text-orange-900"
      >
        <strong>HELP!</strong>
        <FontAwesomeIcon
          icon={faScrewdriverWrench}
          className="text-2xl -z-1"
        ></FontAwesomeIcon>
      </section>
    </Marker>
  );
}
