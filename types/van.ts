import { Document, Types } from "mongoose";

export interface IVan extends Document {
    name: string;
    price: number;
    description: string;
    images: string[];
    type: "simple" | "rugged" | "luxury";
    available: boolean;
    bookedDates: Date[];
    location: {
      city: string;
      country: string;
      latitude: number;
      longitude: number;
    };
    rating?: number;
    reviewsId?: Types.ObjectId[];
    features?: {
      seats: number;
      sleepingCapacity: number;
      hasKitchen: boolean;
      hasToilet: boolean;
      hasAC: boolean;
      hasHeating: boolean;
      petFriendly: boolean;
    };
    fuelType: "gasoline" | "diesel" | "electric";
    mileage: number;
    insuranceIncluded: boolean;
    depositAmount?: number;
    ownerId: Types.ObjectId
  }
  