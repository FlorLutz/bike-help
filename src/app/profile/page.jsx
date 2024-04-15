import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProfilePage() {
  // const {
  //   data: userData,
  //   error,
  //   isLoading,
  // } = useSWR("/api/auth/text", fetcher);

  // if (!userData) {
  //   return;
  // }

  // console.log("userData", userData);

  return (
    <Layout>
      <h1>Profile</h1>
      <h2>Log-in</h2>
      <Link href="/">use Google</Link>
      {/* link to next auth */}
      <p>Not a user yet?</p>
      <Link href="/">Register here</Link>
      {/* link to next auth */}
    </Layout>
  );
}
