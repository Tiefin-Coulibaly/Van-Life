import { Schema } from "mongoose";
import { IChat } from "@/types/chat";


export const ChatSchema = new Schema({
  senderId: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: [true, "Sender ID is required"]
  },
  receiverId: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: [true, "Receiver ID is required"]
  },
  message: { 
    type: String, 
    required: [true, "Message content is required"], 
    trim: true, 
    minlength: [1, "Message cannot be empty"], 
    maxlength: [1000, "Message cannot exceed 1000 characters"]
  },
  timestamp: { 
    type: Date, 
    default: Date.now,
    validate: {
      validator: function(value: Date) {
        return value == new Date();
      },
      message: "Timestamp cannot be in the past or the future"
    }
  }
});

