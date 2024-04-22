import React from "react";
import { Marker } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
// import { getMyTimeString } from "../../lib/clientActions";

interface IMarkerRequestProps {
  id: string;
  longitude: number;
  latitude: number;
  problem: string;
  description: string;
  locationDetails: string;
  tools: string;
  date: Date;
  handleAdditionalRequestInfo: Function;
  userId: string;
  // showAdditionalInfo: string;
}

export default function MarkerRequest({
  // id,
  // latitude,
  // longitude,
  // problem,
  // description,
  // locationDetails,
  // tools,
  // date,
  // userId,
  requestData,
  handleAdditionalInfo,
  type,
}: // showAdditionalInfo,
IMarkerRequestProps) {
  return (
    <Marker
      longitude={requestData.longitude}
      latitude={requestData.latitude}
      anchor="bottom"
    >
      {/* {showAdditionalInfo === id && (
        <section className="bg-white z-10 p-2 rounded">
          <h1>Help needed</h1>
          <h2>{problem}</h2>
          <p>{`created: ${getMyTimeString(date)}`}</p>
          <p>{description}</p>
          <p>{locationDetails}</p>
          <p>{tools}</p>
        </section>
      )} */}
      <section
        onClick={(e) => {
          e.stopPropagation();
          handleAdditionalInfo(requestData, type);
        }}
        className="flex flex-col items-center z-10"
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
