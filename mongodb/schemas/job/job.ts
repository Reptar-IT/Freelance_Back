import mongoose from "mongoose";

const timestamps = { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } };
const Schema = mongoose.Schema;

const jobSchema = new Schema(
    {
        workType: String,
        title: {
            type: String,
            max: 30
        },
        description: {
            type: String,
            max: 1500
        },
        budget: {
            type: String
        },
        skills: [],
        status: {
            type: String,
            default: "awaiting bids"
        },
        bids:
            [{
                type: Schema.Types.ObjectId,
                ref: "Bid"
            }],
        milestones:
            [{
                type: Schema.Types.ObjectId,
                ref: "Milestone"
            }],
        end: {
            type: Date,
            default: Date.now
        },
        solutionProvider: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        creator: {
            type: String,
            max: 30
        }
    },
    timestamps
);

export const Job = mongoose.model("Job", jobSchema);