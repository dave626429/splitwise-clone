import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    const { MONGO_CONNECTION_URI } = process.env;

    if (!MONGO_CONNECTION_URI) {
      throw new Error(`MONGO_CONNECTION_URI : ${MONGO_CONNECTION_URI}`);
    }

    // Set up connection events before connecting
    mongoose.connection.on("connected", () => {
      console.log(`MongoDB connected: ${mongoose.connection.host}`);
    });

    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    const conn = await mongoose.connect(MONGO_CONNECTION_URI);
  } catch (error) {
    console.log(error);
  }
}
