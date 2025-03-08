import { model, models } from "mongoose";
import { IPayment } from "@/types/payment";
import { PaymentSchema } from "../schemas/paymentSchema";

export const PaymentModel = models.Payment || model<IPayment>("Payment", PaymentSchema)