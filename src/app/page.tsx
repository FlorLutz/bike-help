"use client";
import Layout from "../components/Layout/Layout";
import React from "react";
import Bikemap from "../components/Bikemap/Bikemap";
import { useState } from "react";

export default function Home() {
  return (
    <Layout>
      <Bikemap />
    </Layout>
  );
}
