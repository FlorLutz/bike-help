"use server";
import { redirect } from "next/navigation";

export async function redirectServer(url) {
  redirect(url);
}
