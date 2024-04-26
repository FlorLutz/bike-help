"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faCircleCheck,
  faScrewdriverWrench,
  faLightbulb,
  faCopy,
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
import { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";

const fetcher = (args: any) => fetch(args).then((res) => res.json());

export default function RequestDetails({
  requestData: requestDetailsData,
}: any) {
  const session: any = useSession();
  const userId = session?.data?.user?.userId;

  const [editMode, setEditMode] = useState(false);

  //viewport adjustment to windowsize
  const [viewport, setViewport]: [number[] | any, Function] = useState([]);
  function getViewport() {
    if (typeof window !== "undefined") {
      const currentViewport = [window.innerWidth, window.innerHeight];
      setViewport(currentViewport);
    }
  }
  useEffect(() => {
    getViewport();
  }, []);

  // console.log("viewport in reDetPage", viewport);

  const {
    data: userData,
    error,
    isLoading,
  } = useSWR(`/api/user/${requestDetailsData.userId}`, fetcher);

  if (error) {
    console.error(error);
  }
  if (isLoading) {
    return (
      <div className="w-[300] m-auto -translate-x-1/2 flex flex-col justify-center">
        <RotatingLines
          visible={true}
          width="100"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
        <p>loading ...</p>
      </div>
    );
  }
  if (!userData || viewport.length === 0 || !requestDetailsData) {
    return <p>loaging elements</p>;
  }

  async function handleDelete(id: string, userId: string) {
    const response = await fetch(`/../api/requests/byrequestid/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userId),
    });
    if (response.ok) {
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
      toast.success(
        "You have marked the request as resolved. It will now be shown in the request history in your profile page. You can create a new request on this page."
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
    <section className="px-4 mx-4 my-8 flex flex-col items-center gap-4 text-lg">
      <h1 className="font-bold text-2xl mb-6 font-serif">Request Details</h1>
      {!requestDetailsData.isOpen && (
        <button
          onClick={() => redirectServer("/request")}
          className="w-[400px] px-4 flex gap-4 border-4 rounded border-emerald-950 bg-emerald-500 mb-8"
        >
          <FontAwesomeIcon icon={faLightbulb} className="text-2xl mt-2" />
          This request has been solved. <br />
          Click here to create a new one
        </button>
      )}
      <div className="flex flex-col items-center max-w-xl sm:flex-row-reverse flex-wrap">
        <Image
          src={userData.image}
          alt="profile foto"
          width={200}
          height={200}
          className="rounded-full self-start mb-4"
        />
        <div className="flex flex-col max-w-[300px] gap-4 mb-4">
          <div>
            <p className="font-bold">Created by user:</p>
            <p>{userData.name}</p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(requestDetailsData.phonenumber);
            }}
          >
            <p className="font-bold text-left">phone number:</p>
            <p className="text-left">
              {requestDetailsData.phonenumber}
              <FontAwesomeIcon icon={faCopy} className="ml-2" />
            </p>
          </button>
          <div>
            <p className="font-bold">Last changed:</p>
            <p>{getMyDateString(requestDetailsData.date)}</p>
          </div>
          <div>
            <p className="font-bold">What part is broken/not working:</p>
            <p>{requestDetailsData.problem}</p>
          </div>

          {requestDetailsData.locationdetails && (
            <div>
              <p className="font-bold">location details:</p>
              <p>{requestDetailsData.locationdetails}</p>
            </div>
          )}

          {requestDetailsData.description && (
            <div>
              <p className="font-bold">additional description:</p>
              <p>{requestDetailsData.description}</p>
            </div>
          )}

          {requestDetailsData.tools && (
            <div>
              <p className="font-bold">tools needed:</p>
              <p>{requestDetailsData.tools}</p>
            </div>
          )}
        </div>
      </div>

      <InteractiveMap
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          latitude: requestDetailsData.latitude,
          longitude: requestDetailsData.longitude,
          zoom: 17,
        }}
        style={{
          width: Math.min(viewport[0], viewport[1], 626) - 50,
          height: Math.min(viewport[0], viewport[1], 626) - 50,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          longitude={requestDetailsData.longitude}
          latitude={requestDetailsData.latitude}
          anchor="center"
        >
          <div className="flex flex-col items-center text-orange-900">
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
          <div className="max-w-xl px-4 flex gap-4 border-4 rounded border-emerald-950 my-4">
            <FontAwesomeIcon icon={faLightbulb} className="text-2xl mt-2" />
            <p>
              This is your current open request. If you want to create a new
              one, please delete this one or mark it as resolved first!
            </p>
          </div>
          <div className="flex place-content-between max-w-xl gap-8">
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="border-4 border-emerald-950 py-2 px-4 rounded bg-emerald-500 font-semibold grow flex flex-row flex-wrap justify-center gap-2"
            >
              <FontAwesomeIcon icon={faPenToSquare} className="pt-0.5" />
              edit
            </button>
            <button
              type="button"
              onClick={() => {
                handleDelete(requestDetailsData._id, requestDetailsData.userId);
                redirectServer("/request");
              }}
              className="border-4 border-emerald-950 py-2 px-4 rounded bg-emerald-500 font-semibold grow flex flex-row flex-wrap justify-center gap-2"
            >
              <FontAwesomeIcon icon={faTrash} className="pt-0.5" />
              delete
            </button>
            <button
              type="button"
              onClick={() => {
                handleResolved(requestDetailsData._id);
                redirectServer(`/request/`);
              }}
              className="border-4 border-emerald-950 py-2 px-4 rounded bg-emerald-500 font-semibold grow flex flex-row flex-wrap justify-center gap-2"
            >
              <FontAwesomeIcon icon={faCircleCheck} className="pt-0.5" />
              resolved
            </button>
          </div>
        </>
      )}
    </section>
  );
}
