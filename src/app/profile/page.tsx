import React from "react";
import Image from "next/image";
import LinkButton from "@/components/LinkButton/LinkButton";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import ProfileHistory from "../../components/ProfileHistory/ProfileHistory";
import { Session } from "@/lib/interfaces";
import { RotatingLines } from "react-loader-spinner";

export default async function ProfilePage() {
  const session: Session | null | undefined = await getServerSession(options);

  return (
    <main className="mx-4 my-8 flex flex-col items-center gap-4 text-lg">
      <h1 className="font-bold text-2xl mb-6 font-serif">Profile</h1>

      {session ? (
        <>
          <div className="flex flex-col gap-4 items-center sm:flex-row sm:gap-8">
            <Image
              src={session.user.image}
              alt="profile foto"
              width={150}
              height={150}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <p>You are signed in as</p>
              <strong className="mb-2 text-center">{session.user.name}</strong>
              <LinkButton href="api/auth/signout" text="SignOut here" />
            </div>
          </div>
          <ProfileHistory />
        </>
      ) : (
        <>
          <p className="mb-2">You are currently not signed in.</p>
          <LinkButton href="api/auth/signin" text="Please sign in here" />
        </>
      )}
    </main>
  );
}
