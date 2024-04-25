"use client";
import React from "react";
import RequestDetails from "@/components/RequestDetails/RequestDetails";
import useSWR from "swr";
import { redirectServer } from "../../../lib/serverActions";

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
    return <p>request details are loading</p>;
  }
  if (!requestData) {
    redirectServer("/request");
  }
  return <RequestDetails requestData={requestData} />;
}
