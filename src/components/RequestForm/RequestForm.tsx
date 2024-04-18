"use client";
import React, { useEffect, useState } from "react";
import InteractiveBikeMap from "../InteractiveMap/InteractiveBikeMap";
import type { MarkerDragEvent } from "react-map-gl";

import { useRouter } from "next/navigation";

export default function RequestForm({
  userId,
  editMode,
  existingRequestData,
}: {
  userId: string;
  editMode: boolean | undefined;
  existingRequestData: any;
}) {
  //when creating a new request link it to the user too (by adding its id to the array of requests)
  const router = useRouter();
  async function handleSubmit(event: any) {
    event.preventDefault();
    if (!marker.longitude) {
      alert("Please set a location on the map first");
      return;
    }
    const formData = new FormData(event.target);
    let data = Object.fromEntries(formData);
    const { longitude, latitude } = marker;
    const date = new Date();
    const helpRequestData = {
      ...data,
      isOpen: true,
      date: date,
      longitude,
      latitude,
      userId: userId,
    };
    console.log("helpRequestData", helpRequestData);
    const response = await fetch("api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(helpRequestData),
    });
    if (response.ok) {
      console.log("response ok");
      alert(
        "You have successfully created a new request. You can view, edit and delete it on this page."
      );

      router.refresh(); // eventually push back to new request site or mutate
    }
  }

  interface IMarker {
    longitude: number | undefined;
    latitude: number | undefined;
  }
  const [marker, setMarker]: [IMarker | any, Function] = useState({
    longitude: 50,
    latitude: 20,
  });

  interface IlngLat {
    lngLat: { lng: number; lat: number };
  }

  function handleMapClick({ lngLat }: IlngLat) {
    const { lng, lat } = lngLat;
    setMarker({ longitude: lng, latitude: lat });
  }

  function handleDragEnd(event: MarkerDragEvent) {
    console.log("dragendevent", event.lngLat);
    const { lng, lat } = event.lngLat;
    setMarker({ longitude: lng, latitude: lat });
  }

  // console.log("exlong", existingRequestData.longitude);

  useEffect(() => {
    editMode &&
      setMarker({
        longitude: existingRequestData.longitude,
        latitude: existingRequestData.latitude,
      });
  }, []);

  return (
    <section>
      {editMode ? (
        <h1 className="font-bold text-xl mb-6">Edit Request</h1>
      ) : (
        <h1 className="font-bold text-xl mb-6">New Request</h1>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="problem">What part is broken/not working:*</label>
        <input
          value={existingRequestData?.problem}
          type="text"
          name="problem"
          id="problem"
          list="problemlist"
          required
          maxLength={40}
          placeholder="type in problem or view suggestions👇"
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
          value={existingRequestData?.locationdetails}
          type="text"
          name="locationdetails"
          id="locationdetails"
          maxLength={40}
          placeholder="e.g. I stand next to the big tree, opposite from a bank"
        />
        <label htmlFor="description">additional description (optional):</label>
        <textarea
          value={existingRequestData?.description}
          name="description"
          id="description"
          rows={3}
          cols={20}
          maxLength={100}
          placeholder='e.g. got a 28" bike, front tire is down, probably a little hole in the tube'
        />
        <label htmlFor="tools">tools needed (optional):</label>
        <input
          value={existingRequestData?.tools}
          type="text"
          name="tools"
          id="tools"
          maxLength={40}
          placeholder='e.g. tire levers, patch and glue or a new 28" race tube'
        />
        <button
          type="submit"
          className="border-4 border-emerald-950 p-2 rounded bg-emerald-500"
        >
          {editMode ? "Edit request" : "Request help"}
        </button>
      </form>
    </section>
  );
}
