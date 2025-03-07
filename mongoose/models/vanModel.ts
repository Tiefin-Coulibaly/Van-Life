import { model } from "mongoose";
import { VanSchema } from "../schemas/vanSchema";
import { IVan } from "@/types/van";

export const VanModel = model<IVan>("van", VanSchema)