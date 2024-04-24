import React from "react";
import Image from "next/image";
import LinkButton from "@/components/LinkButton/LinkButton";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import ProfileHistory from "../../components/ProfileHistory/ProfileHistory";

export default async function ProfilePage() {
  const session = await getServerSession(options);

  return (
    <main className="mx-4 my-8 flex flex-col items-center gap-4 text-lg">
      <h1 className="font-bold text-2xl mb-6 font-serif">Profile</h1>
      {session ? (
        <>
          <Image
            src={session?.user.image}
            alt="profile foto"
            width={150}
            height={150}
            className="rounded-full"
          />
          <p>You are signed in as</p>
          <strong className="mb-2">{session?.user.name}</strong>
          <LinkButton href="api/auth/signout" text="SignOut here" />
          <ProfileHistory />
        </>
      ) : (
        <>
          <p className="mb-2">You are not signed in.</p>
          <LinkButton href="api/auth/signin" text="Please SignIn here" />
        </>
      )}
    </main>
  );
}
