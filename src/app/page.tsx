"use client";

import Layout from "../components/Layout/Layout";
import React, { useEffect } from "react";
import Map, { NavigationControl, GeolocateControl, Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { useState } from "react";
import Image from "next/image";
import locationMarker from "../../public/location.png";

export default function Home() {
  const [viewport, setViewport] = useState(getViewport);
  function getViewport() {
    const viewPort = [window.innerWidth, window.innerHeight];
    return viewPort;
  }
  console.log("viewport", getViewport());

  // useEffect(() => {
  //   function getViewport() {
  //     const viewPort = [window.innerWidth, window.innerHeight];
  //     return viewPort;
  //   }
  //   setViewport(getViewport());
  // }, []);

  // Add zoom and rotation controls to the map.
  // too many rerenderings for this function (and requests to the api):
  // window.visualViewport.addEventListener("resize", () => {
  //   console.log("resizing");
  //   setViewport(getViewport());
  // });

  return (
    <Layout>
      <main>
        <Map
          mapboxAccessToken="pk.eyJ1IjoiZmxsdXR6IiwiYSI6ImNsdXV2b2FxazBkM2cycnJ5YzQ2bHBydTMifQ.BFRAMdMH46Rppo1rkFKx0A"
          mapLib={import("mapbox-gl")}
          initialViewState={{
            longitude: 13.411, //currentlocation can be found with with GeolocateControl
            latitude: 52.502,
            zoom: 16,
          }}
          style={{ width: viewport[0], height: viewport[1] - 100 }} // adjusts to screensize
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Marker longitude={52.50186} latitude={13.41149} anchor="bottom">
            {/* <strong>SPICED</strong> */}
            {/* <i className="fa-solid fa-map 2xl"></i> */}
            <Image src={locationMarker} alt="location" width={40} height={40} />
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
            </svg> */}
          </Marker>
          <NavigationControl />
          <GeolocateControl />
        </Map>
      </main>
    </Layout>
  );
}
