import { connect} from "mongoose";

export async function runMongoConnection() {
  try {
    const mongoConnection = await connect(process.env.MONGO_URI!);
    console.log("✅ Successfully connected to MongoDB");
  } catch (error) {
    console.error("❌ Connection to MongoDB failed:", error);
  }
}