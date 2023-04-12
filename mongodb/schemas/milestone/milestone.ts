import mongoose from "mongoose";

const timestamps = { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } };
const Schema = mongoose.Schema;

const mileStoneSchema = new Schema(
    {
        jobId: {
            type: Schema.Types.ObjectId,
            ref: "Job"
        }, 
        description: {
            type: String,
            max: 250
        },
        awardAmount: Number,
        stableCoin: String,
        status: {
            type: Boolean,
            default: false
        },
        creator: {
            type: String,
            max: 30
        },
        solutionProvider: {
            type: String,
            max: 30
        },
        employer: {
            type: String,
            max: 30
        }
    },
    timestamps
);

export const Milestone = mongoose.model("Milestone", mileStoneSchema);
