import { model } from "mongoose";
import { IPayment } from "@/types/payment";
import { PaymentSchema } from "../schemas/paymentSchema";

export const PaymentModel = model<IPayment>("Payment", PaymentSchema)