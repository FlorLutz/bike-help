import React from "react";
import { getServerSession } from "next-auth";
import dbConnect from "../../../db/connect";
import Helprequest from "../../../db/models/Helprequest";
import { options } from "../../app/api/auth/[...nextauth]/options";
import LinkButton from "../LinkButton/LinkButton";
import { getMyDateString } from "../../lib/clientActions";
import { Session } from "@/lib/interfaces";

export default async function ProfileHistory() {
  const session: Session | null | undefined = await getServerSession(options);

  let solvedRequests: any;
  try {
    await dbConnect();
    solvedRequests = await Helprequest.find({
      isOpen: false,
      userId: session?.user.userId,
    });
  } catch (error) {
    console.error(error);
  }

  return solvedRequests.length === 0 ? (
    <p className="mt-8">You have no solved requests so far.</p>
  ) : (
    <section className="mt-8 mb-4">
      <h2 className="font-bold text-xl mb-4 text-center">Your History</h2>
      <section>
        <p className="text-center m-4">{`You have ${solvedRequests.length} past request(s):`}</p>
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          {solvedRequests.map((solvedRequest: any) => (
            <section
              key={solvedRequest._id}
              className="p-4 w-[220px] border-4 border-emerald-950 rounded"
            >
              <p className="font-bold">problem</p>
              <p>{solvedRequest.problem}</p>
              <p className="font-bold">created/modified</p>
              <p className="mb-4">{getMyDateString(solvedRequest.date)}</p>
              <LinkButton
                href={`/request/${solvedRequest._id}`}
                text={`See details here`}
              />
            </section>
          ))}
        </div>
      </section>
    </section>
  );
}
