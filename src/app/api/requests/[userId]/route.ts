import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../db/connect";
import Helprequest from "../../../../../db/models/Helprequest";

export async function GET(request: NextRequest, { params }: any) {
  await dbConnect();
  console.log("PARAMSSESSION", params.userId);

  const helprequests = await Helprequest.find({
    isOpen: true,
    userId: params.userId,
  });
  if (helprequests) {
    return new NextResponse(JSON.stringify(helprequests), { status: 200 });
  } else {
    return new NextResponse(JSON.stringify({ message: "Bad request" }), {
      status: 400,
    });
  }
}

// export async function GET(request: NextRequest, response: NextResponse) {
//   await dbConnect();
//   const pointsOfInterst = await PointOfInterest.find();
//   if (pointsOfInterst) {
//     return new NextResponse(JSON.stringify(pointsOfInterst), { status: 200 });
//   } else {
//     return new NextResponse(JSON.stringify({ message: "Bad request" }), {
//       status: 400,
//     });
//   }
// }
