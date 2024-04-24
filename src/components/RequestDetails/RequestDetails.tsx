"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faCircleCheck,
  faScrewdriverWrench,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import InteractiveMap, {
  NavigationControl,
  GeolocateControl,
  Marker,
} from "react-map-gl";
import { useState } from "react";
import RequestForm from "../RequestForm/RequestForm";
import { getMyDateString } from "../../lib/clientActions";
import { useSession } from "next-auth/react";
import { redirectServer } from "../../lib/serverActions";
import useSWR from "swr";
import Image from "next/image";
import { toast } from "react-hot-toast";

const fetcher = (args: any) => fetch(args).then((res) => res.json());

export default function RequestDetails({
  requestData: requestDetailsData,
}: any) {
  const session: any = useSession();
  const userId = session?.data?.user?.userId;

  const [editMode, setEditMode] = useState(false);

  const {
    data: userData,
    error,
    isLoading,
  } = useSWR(`/api/user/${requestDetailsData.userId}`, fetcher);

  if (error) {
    console.log(error);
  }
  if (isLoading) {
    return <p>USERDATA IS LOADING</p>;
  }
  if (!userData) {
    return;
  }

  console.log("USERDATA IN REQDETAILS", userData);

  async function handleDelete(id: string, userId: string) {
    console.log("deleting");

    const response = await fetch(`/../api/requests/byrequestid/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userId),
    });
    if (response.ok) {
      console.log("response ok");
      toast.success(
        "You have successfully deleted the request. You can now create a new one on this page."
      );
    }
  }

  async function handleResolved(id: string) {
    const response = await fetch(`/../api/requests/byrequestid/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("response ok");
      toast.success(
        "You have marked the request as resolved. It will now be shown in the request history in your profile page. You can create a new one on this page."
      );
    }
  }

  return editMode ? (
    <RequestForm
      userId={requestDetailsData.userId}
      editMode={true}
      existingRequestData={requestDetailsData}
      handleSaveEdit={() => {
        setEditMode(false);
      }}
    />
  ) : (
    <section className="m-4">
      <h1 className="font-bold text-xl mt-4 mb-6 font-serif">
        Request Details
      </h1>

      <p className="font-bold">Created by user:</p>
      <p>{userData.name}</p>

      <Image
        src={userData.image}
        alt="profile foto"
        width={150}
        height={150}
        className="rounded-full"
      />

      {!requestDetailsData.isOpen && (
        <button
          onClick={() => redirectServer("/request")}
          className="w-[400px] px-4 flex gap-4 border-4 rounded border-emerald-950 bg-emerald-500"
        >
          <FontAwesomeIcon icon={faLightbulb} className="text-2xl mt-2" />
          This request has been solved. <br />
          Click here to create a new one
        </button>
      )}

      <p className="font-bold">phone number:</p>
      <p>{requestDetailsData.phonenumber}</p>

      <p className="font-bold">Last changed:</p>
      <p>{getMyDateString(requestDetailsData.date)}</p>

      <p className="font-bold">What part is broken/not working:</p>
      <p>{requestDetailsData.problem}</p>

      {requestDetailsData.locationdetais && (
        <>
          <p className="font-bold">location details (optional):</p>
          <p>{requestDetailsData.locationdetails}</p>
        </>
      )}

      {requestDetailsData.description && (
        <>
          <p className="font-bold">additional description (optional):</p>
          <p>{requestDetailsData.description}</p>
        </>
      )}

      {requestDetailsData.tools && (
        <>
          <p className="font-bold">tools needed (optional):</p>
          <p>{requestDetailsData.tools}</p>
        </>
      )}
      <p className="font-bold">your location:</p>

      <InteractiveMap
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          latitude: requestDetailsData.latitude,
          longitude: requestDetailsData.longitude,
          zoom: 16,
        }}
        style={{ width: 400, height: 400 }} // adjusts to screensize
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          longitude={requestDetailsData.longitude}
          latitude={requestDetailsData.latitude}
          anchor="bottom"
        >
          <div className="flex flex-col items-center">
            <strong>HELP!</strong>
            <FontAwesomeIcon
              icon={faScrewdriverWrench}
              className="text-2xl"
            ></FontAwesomeIcon>
          </div>
        </Marker>
        <NavigationControl />
        <GeolocateControl />
      </InteractiveMap>
      {requestDetailsData.isOpen && requestDetailsData.userId === userId && (
        <>
          <div className="w-[400px] px-4 flex gap-4 border-4 rounded border-emerald-950">
            <FontAwesomeIcon icon={faLightbulb} className="text-2xl mt-2" />
            <p>
              This is your current open request. If you want to create a new
              one, please delete this one or mark it as resolved first!
            </p>
          </div>
          <div className="mt-4 flex place-content-between w-[400px]">
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="border-4 border-emerald-950 p-2 rounded bg-emerald-500 font-semibold"
            >
              <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
              edit
            </button>
            <button
              type="button"
              onClick={() => {
                handleDelete(requestDetailsData._id, requestDetailsData.userId);
                redirectServer("/request");
              }}
              className="border-4 border-emerald-950 p-2 rounded bg-emerald-500 font-semibold"
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              delete
            </button>
            <button
              type="button"
              onClick={() => handleResolved(requestDetailsData._id)}
              className="border-4 border-emerald-950 p-2 rounded bg-emerald-500 font-semibold"
            >
              <FontAwesomeIcon icon={faCircleCheck} className="mr-2" />
              mark as resolved
            </button>
          </div>
        </>
      )}
    </section>
  );
}
