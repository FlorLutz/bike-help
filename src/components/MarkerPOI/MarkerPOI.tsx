import React from "react";
import { Marker } from "react-map-gl";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faShop } from "@fortawesome/free-solid-svg-icons";

interface MarkerPOIProps {
  longitude: number;
  latitude: number;
  title: string;
  description: string;
  adress: string;
  openingHours: string;
  url: string;
}

export default function MarkerPOI({
  longitude,
  latitude,
  title,
  description,
  adress,
  openingHours,
  url,
}: MarkerPOIProps) {
  return (
    <Marker longitude={longitude} latitude={latitude} anchor="bottom">
      {/* <Image src={locationMarker} alt="location" width={40} height={40} /> */}
      {/* {isShowDetails && (
        <section>
          <h1>Point of interest</h1>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{adress}</p>
          <p>{openingHours}</p>
          <Link href={url}>Website</Link>
        </section>
      )} */}
      <section className="flex flex-col items-center">
        <strong>POI</strong>
        <FontAwesomeIcon
          icon={faShop}
          // onClick={() => {
          //   handleShowDetails;
          // }}
          className="text-2xl"
        ></FontAwesomeIcon>
      </section>
    </Marker>
  );
}
