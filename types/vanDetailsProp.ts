export interface IVanDetailsProps {
    name: string;
    price: number;
    description: string;
    images: string[];
    type: "simple" | "rugged" | "luxury";
    location: { city: string; country: string };
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