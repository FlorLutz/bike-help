import mongoose from "mongoose";

const { Schema } = mongoose;
const RequestSchema = new Schema({
  problem: { type: String, required: true },
  description: { type: String, required: false },
  locationdetails: { type: String, required: false },
  tools: { type: String, required: false },
  date: { type: Date, required: true },
  isOpen: { type: Boolean, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
});
const Request =
  mongoose.models.Request || mongoose.model("Request", RequestSchema);
export default Request;
