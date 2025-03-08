import { Types } from "mongoose";

export interface IReview extends Document {
  vanId:  Types.ObjectId;
  renterId: Types.ObjectId;
  comment?: string;
  rating: number;
  date: Date;
}
