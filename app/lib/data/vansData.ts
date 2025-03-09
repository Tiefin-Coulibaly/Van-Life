import { connect, Types } from "mongoose";
import { VanModel } from "@/mongoose/models/vanModel";
import { IVan } from "@/types/van";

async function runMongoConnection() {
  try {
    const mongoConnection = await connect(process.env.MONGO_URI!);
    console.log("✅ Successfully connected to MongoDB");
  } catch (error) {
    console.error("❌ Connection to MongoDB failed:", error);
  }
}

// Run the connection
runMongoConnection();

export const fetchAllVans = async (): Promise<
  (IVan & { _id: Types.ObjectId })[]
> => {
  try {
    const vans: (IVan & { _id: Types.ObjectId })[] = await VanModel.find();
    console.log(vans);
    return vans;
  } catch (error) {
    console.log(`Failed to fetch all vans: ${error}`);
    throw new Error("Failed to fetch vans");
  }
};

export const fetchVansFilter = async (vansTypes: string[] | string) => {
  try {
    let filteredVans: (IVan & { _id: Types.ObjectId })[];
    if (typeof vansTypes === "string") {
      filteredVans = await VanModel.find({ type: vansTypes });
    } else {
      filteredVans = await VanModel.find({ type: { $in: vansTypes } });
    }
    console.log(filteredVans)
    return filteredVans;
  } catch (error) {
    console.log(error);
  }
};
