"use client";

import Layout from "../components/Layout/Layout";
import React, { useEffect } from "react";
import Bikemap from "@/components/Bikemap/Bikemap";
import { useState } from "react";
import { log } from "console";

export default function Home() {
  const [isShowDetails, setIsShowDetails] = useState(false);
  function handleShowDetails() {
    console.log("handelShowDetails triggered");
    setIsShowDetails(!isShowDetails);
  }

  return (
    <Layout>
      <Bikemap />
    </Layout>
  );
}
