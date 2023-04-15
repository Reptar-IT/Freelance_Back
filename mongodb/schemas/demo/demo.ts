import mongoose from "mongoose";

const timestamps = {timestamps: { createdAt: "created_at", updatedAt: "updated_at" }};
const Schema = mongoose.Schema;

const demoSchema = new Schema(
  {
    description: {
      type: String, 
      max: 250
    }, 
    amount: Number,
    status: {
      type: String, 
    },
    creator: { 
      type: String, 
      max: 30
    } 
  }, 
  timestamps
);

export const Demo = mongoose.model("Demo", demoSchema);
