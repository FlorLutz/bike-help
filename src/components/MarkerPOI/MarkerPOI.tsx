import React from "react";
import { Marker } from "react-map-gl";
import Image from "next/image";
import locationMarker from "../../public/location.png";
import Link from "next/link";

export default function MarkerPOI({
  longitude,
  latitude,
  title,
  description,
  openingHours,
  url,
}) {
  return (
    <Marker longitude={longitude} latitude={latitude} anchor="bottom">
      <Image src={locationMarker} alt="location" width={40} height={40} />
      <i className="fa-solid fa-map 2xl"></i>
      <section>
        <h1>Point of interest</h1>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>{openingHours}</p>
        <Link href={url}>Website</Link>
      </section>
    </Marker>
  );
}
