import { IChat } from "@/types/chat";
import { model, models } from "mongoose";
import { ChatSchema } from "../schemas/chatSchema";

export const ChatModel= models.Chat || model<IChat>("Chat", ChatSchema)