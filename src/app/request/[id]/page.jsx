"use client";
import React from "react";
import RequestDetails from "@/components/RequestDetails/RequestDetails";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Request({ params }) {
  console.log(params.id);
  const {
    data: openRequestData,
    error,
    isLoading,
  } = useSWR(`/api/requests/byrequestid/${params.id}`, fetcher);

  if (!openRequestData) {
    return;
  }

  console.log("OPENREQEUSTDATATATATT", openRequestData);
  return <RequestDetails requestData={openRequestData[0]} />;
}
