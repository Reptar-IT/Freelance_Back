import mongoose from "mongoose";

const timestamps = {timestamps: { createdAt: "created_at", updatedAt: "updated_at" }};
const Schema = mongoose.Schema;

// Create schemas
const bidSchema = new Schema({
  description: {type: String, max: 250}, amount: Number, status: {type: Boolean, default: false}, job: { type: Schema.Types.ObjectId, ref: "Job" }, creator: { type: Schema.Types.ObjectId, ref: "User" } }, timestamps
);

// Create model
const Bid = mongoose.model("Bid", bidSchema);

module.exports = Bid;