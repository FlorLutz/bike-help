import mongoose from "mongoose";

const { Schema } = mongoose;
const UserSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: false },
  requests: { type: Array, required: false },
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
