import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../../db/connect";
import Helprequest from "../../../../../../db/models/Helprequest";
import User from "../../../../../../db/models/User";

export async function GET(request: NextRequest, { params }: any) {
  await dbConnect();
  console.log("PARAMSSESSION", params.requestId);

  const helprequests = await Helprequest.find({
    isOpen: true,
    _id: params.requestId,
  });
  if (helprequests) {
    return new NextResponse(JSON.stringify(helprequests), { status: 200 });
  } else {
    return new NextResponse(JSON.stringify({ message: "Bad request" }), {
      status: 400,
    });
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  await dbConnect();
  console.log("PARAMSSESSION", params);
  try {
    const helprequest = await Helprequest.findByIdAndDelete(params.requestId);
    const requestData = await request.json();
    await User.findByIdAndUpdate(requestData.userId, {
      $pull: { requests: helprequest._id },
    });
    return new NextResponse(
      JSON.stringify({ message: "helprequest deleted" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Bad request" }), {
      status: 400,
    });
  }
}

export async function PATCH(request: NextRequest, { params }: any) {
  await dbConnect();
  console.log("PARAMSSESSION", params);

  try {
    const helprequest = await Helprequest.findByIdAndUpdate(params.requestId, {
      $set: { isOpen: false },
    });
    return new NextResponse(
      JSON.stringify({ message: "helprequest updated" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Bad request" }), {
      status: 400,
    });
  }
}
