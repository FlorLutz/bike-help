import Layout from "../components/Layout/Layout";
import React, { useEffect } from "react";
import Bikemap from "@/components/Bikemap/Bikemap";

export default function Home() {
  return (
    <Layout>
      <Bikemap />
    </Layout>
  );
}
