"use client";
import React from "react";
import RequestDetails from "@/components/RequestDetails/RequestDetails";
import useSWR from "swr";
import { redirectServer } from "../../../lib/serverActions";
import { RotatingLines } from "react-loader-spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const fetcher = (args: string) => fetch(args).then((res) => res.json());

interface Params {
  params: {
    id: string;
  };
}

export default function Request({ params }: Params) {
  const session = useSession();
  console.log(session);
  // const router = useRouter();
  if (session.status === "unauthenticated") {
    // router.push("/request");
    redirectServer("/request");
  }

  const {
    data: requestData,
    error,
    isLoading,
  } = useSWR(`/api/requests/byrequestid/${params.id}`, fetcher);

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
  if (!requestData) {
    redirectServer("/request");
  }
  return <RequestDetails requestData={requestData} />;
}
