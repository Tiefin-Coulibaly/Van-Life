import { connect, Types } from "mongoose";
import { VanModel } from "@/mongoose/models/vanModel";
import { IVan } from "@/types/van";
import { ISearchParams } from "@/types/searchParams";

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

export const fetchVansFilter = async (searchParams: ISearchParams) => {
  try {
    const query = {};

    for (let param in searchParams) {
      if (param === "type") {
        if (typeof param === "string") {
          query[param] = searchParams[param];
        } else query["type"] = { $in: searchParams[param] };
      } else if (param === "min") {
        query["price"] = { $gte: parseInt(searchParams[param] ?? "0") };
      } else if (param === "max") {
        query["price"] = { $lte: parseInt(searchParams[param] ?? "0") };
      } else if (param === "date") {
        query["bookedDates"] = {
          $not: { $elemMatch: { $gte: searchParams[param] } },
        };
      } else query[param] = searchParams[param];
    }
    // extract the keys
    // extract the values

    // let filteredVans: (IVan & { _id: Types.ObjectId })[];
    // if (typeof vansTypes === "string") {
    //   filteredVans = await VanModel.find({ type: vansTypes });
    // } else {
    //   filteredVans = await VanModel.find({ type: { $in: vansTypes } });
    // }
    // console.log(filteredVans)
    // return filteredVans;
  } catch (error) {
    console.log(error);
  }
};
