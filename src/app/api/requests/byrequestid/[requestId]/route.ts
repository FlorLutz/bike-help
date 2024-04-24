import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../../db/connect";
import Helprequest from "../../../../../../db/models/Helprequest";
import User from "../../../../../../db/models/User";

export async function GET(request: NextRequest, { params }: any) {
  await dbConnect();

  const helprequest = await Helprequest.findById(params.requestId);

  if (helprequest) {
    return new NextResponse(JSON.stringify(helprequest), { status: 200 });
  } else {
    return new NextResponse(JSON.stringify({ message: "Bad request" }), {
      status: 400,
    });
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  await dbConnect();
  try {
    const helprequest = await Helprequest.findByIdAndDelete(params.requestId);
    const requestData = await request.json();

    await User.findByIdAndUpdate(requestData, {
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

export async function PUT(request: NextRequest, { params }: any) {
  await dbConnect();

  try {
    const requestData = await request.json();
    const helprequest = await Helprequest.findByIdAndUpdate(
      params.requestId,
      requestData
    );
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
