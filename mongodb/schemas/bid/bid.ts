import mongoose from "mongoose";

const timestamps = {timestamps: { createdAt: "created_at", updatedAt: "updated_at" }};
const Schema = mongoose.Schema;

const bidSchema = new Schema(
  {
    description: {
      type: String, 
      max: 250
    }, 
    amount: Number,
    jobId: { 
      type: Schema.Types.ObjectId, 
      ref: "Job" 
    }, 
    status: {
      type: Boolean, 
      default: false
    },
    creator: { 
      type: String, 
      max: 30
    } 
  }, 
  timestamps
);

export const Bid = mongoose.model("Bid", bidSchema);
