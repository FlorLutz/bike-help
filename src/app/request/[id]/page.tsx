"use client";
import React from "react";
import RequestDetails from "@/components/RequestDetails/RequestDetails";
import useSWR from "swr";
import { redirectServer } from "../../../lib/serverActions";
import { RotatingLines } from "react-loader-spinner";

const fetcher = (args: string) => fetch(args).then((res) => res.json());

interface Params {
  params: {
    id: string;
  };
}

export default function Request({ params }: Params) {
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
      <div className="w-[300px] m-auto -translate-x-1/4">
        <RotatingLines
          visible={true}
          width="300"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }
  if (!requestData) {
    redirectServer("/request");
  }
  return <RequestDetails requestData={requestData} />;
}
