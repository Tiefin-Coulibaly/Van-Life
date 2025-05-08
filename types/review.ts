import { Review, Van } from "@prisma/client";

export interface ReviewWithVan extends Review {
  van: Van}
