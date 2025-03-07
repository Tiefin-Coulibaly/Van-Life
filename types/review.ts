import { Types } from "mongoose";

export interface IReview extends Document {
  vanId:  Types.ObjectId;
  renterId: Types.ObjectId;
  comment?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: Date;
}
