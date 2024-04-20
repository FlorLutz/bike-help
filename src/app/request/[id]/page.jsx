"use client";
import React from "react";
import RequestDetails from "@/components/RequestDetails/RequestDetails";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { redirectServer } from "../../../lib/serverActions";
import Layout from "@/components/Layout/Layout";

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
  }
  if (isLoading) {
    return <p>ISLOADING</p>;
  }
  if (openRequestData.length === 0) {
    redirectServer("/request");
  }
  if (openRequestData.length > 0) {
    return (
      <Layout>
        <RequestDetails requestData={openRequestData[0]} />
      </Layout>
    );
  }
}
