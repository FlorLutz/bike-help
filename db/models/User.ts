import mongoose from "mongoose";

const { Schema } = mongoose;
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: false },
  description: { type: String, required: false },
  requests: { type: Array, required: false },
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
