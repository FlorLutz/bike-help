import React from "react";
import { Marker } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

interface IMarkerRequestProps {
  id: string;
  longitude: number;
  latitude: number;
  problem: string;
  description: string;
  locationDetails: string;
  tools: string;
  date: Date;
  //   handleAdditionalInfo: Function;
  //   showAdditionalInfo: string;
}

export default function MarkerRequest({
  id,
  latitude,
  longitude,
  problem,
  description,
  locationDetails,
  tools,
  date,
}: //   handleAdditionalInfo,
//   showAdditionalInfo,
IMarkerRequestProps) {
  console.log(date);

  return (
    <Marker longitude={longitude} latitude={latitude} anchor="bottom">
      {/* {showAdditionalInfo === id && ( */}
      <section className="bg-white z-10 p-2 rounded">
        <h1>Help needed</h1>
        <h2>{problem}</h2>
        {/* <p>{`created: ${date.getHours()}:${date.getMinutes()}`}</p> */}
        <p>{description}</p>
        <p>{locationDetails}</p>
        <p>{tools}</p>
      </section>
      {/* )} */}
      <section
        // onClick={() => handleAdditionalInfo(id)}
        className="flex flex-col items-center z-0"
      >
        <strong>HELP!</strong>
        <FontAwesomeIcon
          icon={faScrewdriverWrench}
          className="text-2xl"
        ></FontAwesomeIcon>
      </section>
    </Marker>
  );
}
