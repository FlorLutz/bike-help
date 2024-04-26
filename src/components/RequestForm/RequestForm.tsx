"use client";
import React, { useEffect, useState } from "react";
import InteractiveBikeMap from "../InteractiveBikeMap/InteractiveBikeMap";
import type { MarkerDragEvent } from "react-map-gl";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { redirectServer } from "@/lib/serverActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faHandshakeSimple } from "@fortawesome/free-solid-svg-icons";

export default function RequestForm({
  userId,
  editMode,
  existingRequestData,
  handleSaveEdit,
}: {
  userId: string;
  editMode: boolean | undefined;
  existingRequestData: any | undefined;
  handleSaveEdit: Function | null;
}) {
  //when creating a new request link it to the user too (by adding its id to the array of requests)
  const router = useRouter();
  async function handleSubmit(event: any) {
    event.preventDefault();
    if (!marker.longitude) {
      toast.error("Please set a location on the map first");
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
    if (!editMode) {
      const response = await fetch("api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(helpRequestData),
      });
      if (response.ok) {
        toast.success(
          "You have successfully created a new request. You can view, edit and delete it on this page."
        );
        router.refresh();
      }
    } else {
      handleSaveEdit && handleSaveEdit();
      const response = await fetch(
        `../api/requests/byrequestid/${existingRequestData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(helpRequestData),
        }
      );
      if (response.ok) {
        toast.success(
          "You have successfully updated this request. You can still view, edit and delete it on this page."
        );
        redirectServer(`/request`);
      }
    }
  }

  interface Marker {
    longitude: number | undefined;
    latitude: number | undefined;
  }
  const [marker, setMarker]: [Marker | any, Function] = useState({});

  interface LngLat {
    lngLat: { lng: number; lat: number };
  }

  function handleMapClick({ lngLat }: LngLat) {
    const { lng, lat } = lngLat;
    setMarker({ longitude: lng, latitude: lat });
  }

  function handleDragEnd(event: MarkerDragEvent) {
    const { lng, lat } = event.lngLat;
    setMarker({ longitude: lng, latitude: lat });
  }

  useEffect(() => {
    editMode &&
      setMarker({
        longitude: existingRequestData.longitude,
        latitude: existingRequestData.latitude,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="px-4 mx-4 my-8 flex flex-col items-center gap-4 text-lg">
      <h1 className="font-bold text-2xl mb-6 font-serif">
        {editMode ? "Edit Request" : "New Request"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="problem">What part is broken/not working:*</label>
        <input
          className="mb-2 px-2 py-1 rounded"
          defaultValue={existingRequestData?.problem}
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
        <label htmlFor="phonenumber">your phone number:*</label>
        <input
          className="mb-2 px-2 py-1 rounded"
          defaultValue={existingRequestData?.phonenumber}
          type="text"
          name="phonenumber"
          id="phonennumber"
          required
          minLength={10}
          maxLength={40}
          placeholder="e.g. 0049-1234 567890"
        />
        <InteractiveBikeMap
          handleMapClick={handleMapClick}
          handleDragEnd={handleDragEnd}
          marker={marker}
        />
        <label htmlFor="locationdetails">location details (optional):</label>
        <input
          className="mb-2 px-2 py-1 rounded"
          defaultValue={existingRequestData?.locationdetails}
          type="text"
          name="locationdetails"
          id="locationdetails"
          maxLength={40}
          placeholder="e.g. I stand in front of the big bank"
        />
        <label htmlFor="description">additional description (optional):</label>
        <textarea
          className="mb-2 px-2 py-1 rounded"
          defaultValue={existingRequestData?.description}
          name="description"
          id="description"
          rows={3}
          cols={20}
          maxLength={100}
          placeholder='e.g. got a 28" bike, front tire is down, probably a little hole in the tube'
        />
        <label htmlFor="tools">tools needed (optional):</label>
        <input
          className="mb-4 px-2 py-1 rounded"
          defaultValue={existingRequestData?.tools}
          type="text"
          name="tools"
          id="tools"
          maxLength={40}
          placeholder="e.g. tire levers, patch and glue"
        />

        <button
          type="submit"
          className="border-4 border-emerald-950 py-2 px-4 rounded bg-emerald-500 font-semibold grow flex flex-row flex-wrap justify-center gap-2"
          // className="border-4 border-emerald-950 p-2 rounded bg-emerald-500 font-semibold"
        >
          {editMode ? (
            <>
              <FontAwesomeIcon icon={faSave} className="pt-0.5" />
              save edit
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faHandshakeSimple} className="pt-0.5" />
              request help
            </>
          )}
        </button>
      </form>
    </section>
  );
}
