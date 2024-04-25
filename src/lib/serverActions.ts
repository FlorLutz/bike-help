"use server";
import { redirect } from "next/navigation";

export async function redirectServer(url: string) {
  redirect(url);
}
