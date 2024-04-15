import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export default async function ProfilePage() {
  const session = await getServerSession(options);

  console.log(session);

  return (
    <Layout>
      <h1>Profile</h1>
      {session ? (
        <>
          <p>
            You are signed in as <strong>{session?.user.name}</strong>.
          </p>
          <Link href="api/auth/signout">Sign-out here</Link>
        </>
      ) : (
        <Link href="api/auth/signin">Please Sign-in here</Link>
      )}
    </Layout>
  );
}
