import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Layout from "@/components/Layout/Layout";
import RequestForm from "@/components/RequestForm/RequestForm";
import LinkButton from "@/components/LinkButton/LinkButton";
import dbConnect from "../../../db/connect";
import { redirect } from "next/navigation";

import Helprequest from "../../../db/models/Helprequest";

export default async function RequestPage() {
  const session = await getServerSession(options);
  const userId = session.user.userId;

  let openRequestData = [];

  if (session) {
    try {
      await dbConnect();

      openRequestData = await Helprequest.find({
        isOpen: true,
        userId: userId,
      });
      openRequestData[0]._id && redirect(`/request/${openRequestData[0]._id}`);
    } catch (error) {
      console.error(error);
    }
  }

  console.log("openRequestData", openRequestData);

  return (
    <Layout>
      <main className="m-4">
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