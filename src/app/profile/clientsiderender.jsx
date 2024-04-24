"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

export default function ProfilePage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("api/auth/signin?callbackURL=/client");
    },
  });
  console.log(session);

  return (
    <>
      <h1>Profile</h1>
      <h2>Log-in</h2>
      <Link href="/">use Google</Link>
      {/* link to next auth */}
      <p>Not a user yet?</p>
      <Link href="/">Register here</Link>
      {/* link to next auth */}
    </>
  );
}
