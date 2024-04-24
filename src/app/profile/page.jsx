import React from "react";
import Image from "next/image";
import LinkButton from "@/components/LinkButton/LinkButton";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import ProfileHistory from "../../components/ProfileHistory/ProfileHistory";

export default async function ProfilePage() {
  const session = await getServerSession(options);

  return (
    <main className="m-4">
      <h1 className="font-bold text-xl mb-6 font-serif">Profile</h1>
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
          <LinkButton href="api/auth/signout" text="SignOut here" />
          <ProfileHistory />
        </>
      ) : (
        <>
          <p className="mb-4">You are not signed in.</p>
          <LinkButton href="api/auth/signin" text="Please SignIn here" />
        </>
      )}
    </main>
  );
}
