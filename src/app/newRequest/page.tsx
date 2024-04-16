import Layout from "@/components/Layout/Layout";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import RequestForm from "@/components/RequestForm/RequestForm";
import LinkButton from "@/components/LinkButton/LinkButton";

export default async function RequestPage() {
  const session = await getServerSession(options);
  const userId = session?.user.userId;
  return (
    <Layout>
      <main className="m-4">
        <h1 className="font-bold text-xl mb-6">New Request</h1>
        {session ? (
          <RequestForm userId={userId} />
        ) : (
          <section>
            <p className="mb-4">You are not signed in.</p>
            <LinkButton
              href="api/auth/signin"
              text="Please SignIn here to create a request"
            />
          </section>
        )}
      </main>
    </Layout>
  );
}
