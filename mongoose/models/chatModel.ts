import { IChat } from "@/types/chat";
import { model } from "mongoose";
import { ChatSchema } from "../schemas/chatSchema";

export const ChatModel=model<IChat>("Chat", ChatSchema)