import Layout from "@/components/Layout/Layout";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import RequestForm from "@/components/RequestForm/RequestForm";

export default async function ProfilePage() {
  const session = await getServerSession(options);

  console.log(session);
  return (
    <Layout>
      <h1>New Request</h1>
      {session ? (
        <RequestForm />
      ) : (
        <section>
          <p>You are not signed in.</p>
          <Link href="api/auth/signin">
            Please Sign-in here to create a request.
          </Link>
        </section>
      )}
    </Layout>
  );
}
