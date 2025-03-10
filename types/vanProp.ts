import { Types } from "mongoose";

export interface VanCardProps {
  name: string;
  price: number;
  type: "simple" | "rugged" | "luxury";
  location: { city: string; country: string };
  rating: number ;
  image: string;
}