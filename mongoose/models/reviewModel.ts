import { model, models } from "mongoose";
import { IReview } from "@/types/review";
import { ReviewSchema } from "../schemas/reviewSchema";

export const ReviewModel = models.Review || model<IReview>("Review", ReviewSchema);
