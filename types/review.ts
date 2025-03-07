import { Types } from "mongoose";

export interface IReview extends Document {
  userId: Types.ObjectId;
  comment: string;
  rating: number;
  date: Date;
}
