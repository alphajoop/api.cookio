import mongoose from "npm:mongoose@8.10.1";

export const connectDB = async () => {
  try {
    const mongoUri = Deno.env.get("MONGODB_URI");
    if (!mongoUri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unexpected error occurred";
    console.error("MongoDB connection error:", errorMessage);
    Deno.exit(1);
  }
};
