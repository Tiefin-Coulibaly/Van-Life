import { Schema, Types} from 'mongoose';
import { IVan } from '@/types/van';

export const VanSchema: Schema = new Schema<IVan>({
    name: { 
      type: String, 
      required: [true, "Van name is required"], 
      trim: true 
    },
    price: { 
      type: Number, 
      required: [true, "Price is required"], 
      min: [1, "Price must be greater than 0"]
    },
    description: { 
      type: String, 
      required: [true, "Description is required"], 
      minlength: [20, "Description must be at least 20 characters long"]
    },
    images: { 
      type: [String], 
      required: [true, "At least one image is required"]
    },
    type: { 
      type: String, 
      enum: {
        values: ["simple", "rugged", "luxury"],
        message: "Type must be either 'simple', 'rugged', or 'luxury'"
      },
      required: [true, "Van type is required"]
    },
    available: { 
      type: Boolean, 
      required: [true, "Availability status is required"]
    },
    bookedDates: { 
      type: [Date], 
      default: [] 
    },
    location: {
      city: { type: String, required: [true, "City is required"] },
      country: { type: String, required: [true, "Country is required"] },
      latitude: { 
        type: Number, 
        required: [true, "Latitude is required"], 
        min: [-90, "Latitude must be between -90 and 90"], 
        max: [90, "Latitude must be between -90 and 90"] 
      },
      longitude: { 
        type: Number, 
        required: [true, "Longitude is required"], 
        min: [-180, "Longitude must be between -180 and 180"], 
        max: [180, "Longitude must be between -180 and 180"] 
      }
    },
    rating: { 
      type: Number, 
      min: [1, "Rating must be at least 1"], 
      max: [5, "Rating must be at most 5"], 
      default: 0 
    },
    reviewsId: { 
      type: [Schema.Types.ObjectId], 
      ref: "Review",
      default: []
    },
    features: {
      seats: { type: Number, min: [1, "Seats must be at least 1"] },
      sleepingCapacity: { type: Number, min: [1, "Sleeping capacity must be at least 1"] },
      hasKitchen: { type: Boolean, default: false },
      hasToilet: { type: Boolean, default: false },
      hasAC: { type: Boolean, default: false },
      hasHeating: { type: Boolean, default: false },
      petFriendly: { type: Boolean, default: false }
    },
    fuelType: { 
      type: String, 
      enum: {
        values: ["gasoline", "diesel", "electric"],
        message: "Fuel type must be 'gasoline', 'diesel', or 'electric'"
      },
      required: [true, "Fuel type is required"]
    },
    mileage: { 
      type: Number, 
      required: [true, "Mileage is required"], 
      min: [0, "Mileage must be a positive number"]
    },
    insuranceIncluded: { 
      type: Boolean, 
      required: [true, "Insurance inclusion status is required"]
    },
    depositAmount: { 
      type: Number, 
      min: [0, "Deposit amount must be a positive number"]
    },
    ownerId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: [true, "Owner ID is required"]
    }
  }, { timestamps: true });