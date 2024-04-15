import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import ProfileDetails from "@/components/ProfileDetails/ProfileDetails";

export default async function ProfilePage() {
  const session = await getServerSession(options);

  return (
    <Layout>
      <h1>Profile</h1>
      {session ? (
        <>
          <p>
            You are signed in as <strong>{session?.user.name}</strong>.
          </p>
          {/* <ProfileDetails /> optional for more details, component already exists and is imported*/}
          <Link href="api/auth/signout">Sign-out here</Link>
        </>
      ) : (
        <>
          <p>You are not signed in.</p>
          <Link href="api/auth/signin">Please Sign-in here</Link>
        </>
      )}
    </Layout>
  );
}
