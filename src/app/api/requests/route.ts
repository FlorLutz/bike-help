import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../db/connect";
import Request from "../../../../db/models/Request";

export async function POST(request: NextRequest, response: NextResponse) {
  await dbConnect();
  try {
    const requestData = await request.json();
    console.log("REQUEST", requestData);

    await Request.create(requestData);
    return NextResponse.json(
      {
        message: "New Request created",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "not working" },
      {
        status: 400,
      }
    );
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
