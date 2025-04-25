import { Type } from "@prisma/client";

export interface IVanDetailsProps {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  type: Type;
  city: string;
  country: string;
  rating?: number;
  available: boolean;
  features?: {
    seats: number;
    sleepingCapacity: number;
    hasKitchen: boolean;
    hasToilet: boolean;
    hasAC: boolean;
    hasHeating: boolean;
    petFriendly: boolean;
  };
}
