"use client";

import Layout from "../components/Layout/Layout";
import React from "react";
import Map from "react-map-gl/dist/esm/components/map";

export default function Home() {
  return (
    <Layout>
      <main>
        MAP PLACEHOLDER
        {/* <Map
          mapboxAccessToken="<Mapbox access token>"
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 14,
          }}
          style={{ width: 600, height: 400 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        /> */}
      </main>
    </Layout>
  );
}
