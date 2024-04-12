import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../db/connect";
import PointOfInterest from "../../../../db/models/Point-of-interest";

export async function GET(request: NextRequest) {
  await dbConnect();
  const pointsOfInterst = await PointOfInterest.find();
  if (pointsOfInterst) {
    return new NextResponse(JSON.stringify(pointsOfInterst), { status: 200 });
  } else {
    return new NextResponse(JSON.stringify({ message: "Bad request" }), {
      status: 400,
    });
  }
}
//   if (request.method === "POST") {
//     try {
//       const placeData = request.body;
//       await Place.create(placeData);
//       // const place = new Place(placeData);
//       // console.log(place);
//       // await place.create();
//       return response.status(201).json({ status: "Place created" });
//     } catch (error) {
//       return response.status(400).json({ error: error.message });
//     }
//   }
