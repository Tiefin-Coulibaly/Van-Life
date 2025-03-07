import { model } from "mongoose";
import { IReview } from "@/types/review";
import { ReviewSchema } from "../schemas/reviewSchema";

export const ReviewModel = model<IReview>("Review", ReviewSchema);
