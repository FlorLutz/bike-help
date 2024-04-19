"use client";
import React from "react";
import RequestDetails from "@/components/RequestDetails/RequestDetails";
import useSWR from "swr";
import { useRouter } from "next/navigation";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Request({ params }) {
  const router = useRouter();

  console.log(params.id);
  const {
    data: openRequestData,
    error,
    isLoading,
  } = useSWR(`/api/requests/byrequestid/${params.id}`, fetcher);

  if (error) {
    console.log(error);
    router.push("/request");
  }
  if (isLoading) {
    return <p>ISLOADING</p>;
  }
  console.log(openRequestData);
  if (openRequestData.length === 0) {
    router.push("/request");
  }
  if (openRequestData.length > 0) {
    return <RequestDetails requestData={openRequestData[0]} />;
  }
}
