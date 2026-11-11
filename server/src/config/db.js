
import mongoose from "mongoose";
import env from "./env.js";

async function connectDB() {
  const uri = env.MONGO_URI;

  if (!uri) {
    throw new Error(
      "MONGO_URI is not set. Copy .env.example to .env first."
    );
  }

  // autoIndex: false means Mongoose will not automatically build indexes.
  await mongoose.connect(uri, {
    autoIndex: false,
  });

  console.log(
    `MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`
  );
}

export default connectDB;
