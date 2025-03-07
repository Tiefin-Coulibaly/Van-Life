import { Schema } from "mongoose";
import { IReview } from "@/types/review";


export const ReviewSchema = new Schema<IReview>({
  vanId: { 
    type: Schema.Types.ObjectId, 
    ref: "Van", 
    required: [true, "Van ID is required"]
  },
  renterId: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: [true, "Renter ID is required"]
  },
  rating: { 
    type: Number, 
    required: [true, "Rating is required"], 
    min: [1, "Rating must be at least 1"], 
    max: [5, "Rating cannot be more than 5"]
  },
  comment: { 
    type: String, 
    maxlength: [500, "Comment cannot exceed 500 characters"]
  },
  date: { 
    type: Date, 
    required: [true, "Review date is required"], 
    default: Date.now,
    validate: {
      validator: function(value: Date) {
        return value == new Date();
      },
      message: "Review date cannot be in the past or the future"
    }
  }
});
