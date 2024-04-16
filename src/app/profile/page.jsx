import React from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import LinkButton from "@/components/LinkButton/LinkButton";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import ProfileDetails from "@/components/ProfileDetails/ProfileDetails";

export default async function ProfilePage() {
  const session = await getServerSession(options);
  console.log(session);

  if (session) {
    //find user by email in database, if it is there return id of user in db
    //if it isn't there, create an entry and return id of user in db
  }
  return (
    <Layout>
      <main className="m-4">
        <h1 className="font-bold text-xl mb-6">Profile</h1>
        {session ? (
          <>
            <Image
              src={session?.user.image}
              alt="profile foto"
              width={150}
              height={150}
              className="rounded-full"
            />
            <p className="mb-4">
              You are signed in as <strong>{session?.user.name}</strong>.
            </p>
            {/* <ProfileDetails /> optional for more details, component already exists and is imported*/}
            <LinkButton href="api/auth/signout" text="SignOut here" />
          </>
        ) : (
          <>
            <p className="mb-4">You are not signed in.</p>
            <LinkButton href="api/auth/signin" text="Please SignIn here" />
          </>
        )}
      </main>
    </Layout>
  );
}
