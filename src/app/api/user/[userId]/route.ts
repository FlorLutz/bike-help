import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../db/connect";
import User from "../../../../../db/models/User";

export async function GET(request: NextRequest, { params }: any) {
  await dbConnect();

  const user = await User.findById(params.userId);
  if (user) {
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } else {
    return new NextResponse(JSON.stringify({ message: "Bad request" }), {
      status: 400,
    });
  }
}
