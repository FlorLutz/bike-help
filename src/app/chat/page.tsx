import React from "react";
import { db } from "../../../db/redisdb/db";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import LinkButton from "@/components/LinkButton/LinkButton";
import Chat from "@/components/Chat/Chat";

export default async function ChatPage() {
  const session = await getServerSession(options);
  return (
    <Layout>
      <main className="m-4">
        <h1 className="font-bold text-xl mb-6">Bike Chat</h1>
        {session ? (
          <>
            <section className="flex w-[400px] gap-4">
              <Image
                src={session?.user?.image || ""}
                alt="profile foto"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p className="mb-4">
                  You are signed in as <strong>{session?.user?.name}</strong>.
                </p>
                <LinkButton href="api/auth/signout" text="SignOut here" />
              </div>
            </section>
            <Chat
            // chatId={chatId}
            />
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
