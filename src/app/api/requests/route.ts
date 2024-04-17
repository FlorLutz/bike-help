import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../db/connect";
import Helprequest from "../../../../db/models/Helprequest";
import User from "../../../../db/models/User";

export async function POST(request: NextRequest, response: NextResponse) {
  await dbConnect();
  try {
    const requestData = await request.json();
    console.log("REQUEST", requestData);
    const helpRequest = await Request.create(requestData);
    console.log("helpRequest", helpRequest);

    await User.findByIdAndUpdate(
      requestData.userId,
      {
        $push: { requests: helpRequest._id },
      },
      { new: true }
    );
    return NextResponse.json(
      {
        message: "New Request created and linked to user",
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

export async function GET(request: NextRequest) {
  await dbConnect();
  const helprequests = await Helprequest.find();
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
