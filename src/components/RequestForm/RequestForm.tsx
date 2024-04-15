"use client";
import React, { useState } from "react";
import InteractiveBikeMap from "../InteractiveMap/InteractiveBikeMap";
import type { MarkerDragEvent, lngLat } from "react-map-gl";

export default function RequestForm() {
  function handleSubmit(event: any) {
    event.preventDefault();
    if (!marker.longitude) {
      alert("Please set a location on the map first");
      return;
    }
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const { longitude, latitude } = marker;
    console.log("formdata", { ...data, longitude, latitude });
  }

  const [marker, setMarker] = useState({});

  function handleMapClick({ lngLat }) {
    const { lng, lat } = lngLat;
    setMarker({ longitude: lng, latitude: lat });
  }

  //   function handleLngLatRead() {
  //     console.log("marker in handleLngLatRead", marker);
  //     return marker;
  //   }

  function handleDragEnd(event: MarkerDragEvent) {
    console.log("dragendevent", event.lngLat);
    const { lng, lat } = event.lngLat;
    setMarker({ longitude: lng, latitude: lat });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* <label htmlFor="problem">What part is broken/not working:*</label>
      <input
        type="text"
        name="problem"
        id="problem"
        required
        maxLength={30}
        placeholder="e.g. flat tire"
      ></input> */}
      <label htmlFor="problem">What part is broken/not working:*</label>
      <input
        type="text"
        name="problem"
        id="problem"
        list="problemlist"
        required
        maxLength={40}
        placeholder="type problem or view suggestions👇"
      />
      <datalist id="problemlist">
        <option>flat tire</option>
        <option>torn bowden wire</option>
        <option>twisted handlebars</option>
        <option>breaks stopped working</option>
        <option>shifters stopped working</option>
      </datalist>
      <InteractiveBikeMap
        handleMapClick={handleMapClick}
        handleDragEnd={handleDragEnd}
        marker={marker}
      />
      <label htmlFor="locationdetails">location details (optional):</label>
      <input
        type="text"
        name="locationdetails"
        id="locationdetails"
        maxLength={40}
        placeholder="e.g. I stand next to the big tree, opposite from a bank"
      />
      <label htmlFor="description">additional description (optional):</label>
      <textarea
        name="description"
        id="description"
        rows={3}
        cols={20}
        maxLength={100}
        placeholder='e.g. got a 28" bike, front tire is down, probably a little hole in the tube'
      />
      <label htmlFor="tools">tools needed (optional):</label>
      <input
        type="text"
        name="tools"
        id="tools"
        maxLength={40}
        placeholder='e.g. tire levers, patch and glue or a new 28" race tube'
      />
      <button type="submit">Request help</button>
    </form>
  );
}
