import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import RequestForm from "@/components/RequestForm/RequestForm";
import LinkButton from "@/components/LinkButton/LinkButton";
import dbConnect from "../../../db/connect";
import { redirect } from "next/navigation";

import Helprequest from "../../../db/models/Helprequest";
export const revalidate = 0.5;

export default async function RequestPage() {
  const session: any = await getServerSession(options);
  const userId = session?.user.userId;

  let openRequestData = [];

  if (session) {
    try {
      await dbConnect();
      openRequestData = await Helprequest.find({
        isOpen: true,
        userId: userId,
      });
    } catch (error) {
      console.error(error);
    }
  }
  openRequestData[0] && redirect(`/request/${openRequestData[0].id}`);

  return (
    <main className="m-4">
      {session ? (
        <RequestForm
          userId={userId}
          editMode={false}
          existingRequestData={undefined}
          handleSaveEdit={null}
        />
      ) : (
        <section className="flex flex-col gap-4 items-center">
          <p className="mt-12 mb-4 text-center">
            You are currently not signed in.
          </p>
          <LinkButton
            href="api/auth/signin"
            text="Please sign in here to view or create requests"
          />
        </section>
      )}
    </main>
  );
}
