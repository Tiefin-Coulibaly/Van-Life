import { Type } from "@prisma/client";

export interface VanCardProps {
  id: string;
  name: string;
  price: number;
  type: Type;
  city: string; 
  country: string ;
  rating: number ;
  image: string;
}