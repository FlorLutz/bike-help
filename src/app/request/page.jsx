import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
// import { useSession } from "next-auth/react";
import Layout from "@/components/Layout/Layout";
import RequestForm from "@/components/RequestForm/RequestForm";
import LinkButton from "@/components/LinkButton/LinkButton";
import RequestDetails from "@/components/RequestDetails/RequestDetails";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default async function RequestPage() {
  const session = await getServerSession(options);
  const userId = session.user.userId;

  async function getOpenRequestForUser(userId) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/requests/byuser/${userId}`
      );
      const openRequestData = await response.json();
      return openRequestData;
    } catch (error) {
      console.error(error);
    }
  }

  let openRequestData = [];
  if (session) {
    openRequestData = await getOpenRequestForUser(userId);
  }
  console.log("openRequestData", openRequestData);
  // make a GET request to the Database, get the user data an look in the requestarray for isOpen=true
  // const {
  //   data: openHelpRequest,
  //   error,
  //   isLoading,
  // } = useSWR("/api/requests", fetcher);
  // console.log("openHelpRequest", openHelpRequest);

  return (
    <Layout>
      <main className="m-4">
        {session && openRequestData.length > 0 && (
          <RequestDetails requestData={openRequestData[0]} />
        )}
        {session && openRequestData.length === 0 && (
          <RequestForm userId={userId} />
        )}
        {!session && (
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
