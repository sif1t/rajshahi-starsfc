// src/models/User.ts
// Mongoose schema for Rajshahi Stars FC user accounts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;      // Undefined for OAuth-only accounts
  image?: string;         // Profile picture (from Google or upload)
  provider: "credentials" | "google"; // Auth method used
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [60, "Name cannot exceed 60 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      // Not required — Google OAuth users won't have a password
      select: false, // Never return password in queries by default
    },
    image: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt + updatedAt
  }
);

// Prevent re-compiling the model during hot-reload in development
const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);

export default User;
