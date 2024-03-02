import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  // Add any other fields you need
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Define other fields as needed
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
