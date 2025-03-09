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

export const fetchVansFilter = async (
  searchParams: ISearchParams,
): Promise<(IVan & { _id: Types.ObjectId }[]) | any[]> => {
  try {
    const query: Record<string, any> = {}; // Define flexible query object
    const orConditions: any[] = []; // Array to store OR conditions

    for (let param in searchParams) {
      const value = searchParams[param];

      if (param === "type") {
        if (typeof value === "string") {
          query[param] = value;
        } else {
          query["type"] = { $in: value };
        }
      } else if (param === "min") {
        query["price"] = { $gte: parseInt(value ?? "0") };
      } else if (param === "max") {
        query["price"] = { $lte: parseInt(value ?? "0") };
      } else if (param === "date") {
        query["bookedDates"] = {
          $not: { $elemMatch: { $gte: value } },
        };
      } else if (param === "city" || param === "country") {
        // Add each condition to the OR array
        orConditions.push({
          [`location.${param}`]: { $regex: new RegExp(value, "i") },
        });
      }
    }

    // If there are city or country filters, add $or to the query
    if (orConditions.length > 0) {
      query.$or = orConditions;
    }

    console.log("Generated Query:", query); // Debugging
    const vans = await VanModel.find(query);
    return vans;
  } catch (error) {
    console.error("Error fetching vans:", error);
    return [];
  }
};
