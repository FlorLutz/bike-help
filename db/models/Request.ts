import mongoose from "mongoose";

const { Schema } = mongoose;
const RequestSchema = new Schema({
  problem: { type: String, required: true },
  description: { type: String, required: false },
  tools: { type: String, required: false },
});
const Request =
  mongoose.models.Request || mongoose.model("Request", RequestSchema);
export default Request;
