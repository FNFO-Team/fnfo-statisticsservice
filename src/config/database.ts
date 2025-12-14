// src/config/database.ts
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export const connectDatabase = async () => {
  if (!MONGO_URI) {
    throw new Error("MongoDB URI is missing in .env");
  }

  try {
    await mongoose.connect(MONGO_URI);

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
};
