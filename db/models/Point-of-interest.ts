import mongoose from "mongoose";

const { Schema } = mongoose;
const pointOfInterestSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  title: { type: String, required: true },
  adress: { type: String, required: true },
  description: { type: String, required: true },
  openingHours: { type: String, required: true },
  url: { type: String, required: true },
});
const PointOfInterest =
  mongoose.models.PointOfInterest ||
  mongoose.model(
    "PointOfInterest",
    pointOfInterestSchema,
    "points-of-interest"
  );
export default PointOfInterest;
