import { model, models } from "mongoose";
import { VanSchema } from "../schemas/vanSchema";
import { IVan } from "@/types/van";

export const VanModel = models.Van || model<IVan>("Van", VanSchema);