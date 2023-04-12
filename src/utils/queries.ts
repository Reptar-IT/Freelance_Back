import { Job, Bid, Milestone } from "../../mongodb/schemas/index"

export const createJob = (record: any) => (new Job(record)).save();

export const getAllJobs = async () => await Job.find({});

export const getJobById = async (jobId: any) => {
    const jobs = await Job.findById(jobId);
    if (!jobs) return { code: 400, message: `Job with ID ${jobId} Does not exist` };

    return jobs;
}

export const deleteJobById = async (jobId: any) => await Job.findByIdAndDelete(jobId);

export const getBidById = async (id: any) => {
    const bids = await Bid.findById(id);
    if (!bids) return { code: 400, message: `Bid with ID ${id} Does not exist` };

    return bids;
}

export const getBidsByJobId = async (jobId: any) => {
    const bids = await Bid.find({ jobId });
    if (!bids) return { code: 400, message: `Bid with Job ID ${jobId} Does not exist` };

    return bids;
}

export const createBid = (record: any) => (new Bid(record)).save();

export const getAllBids = async () => await Bid.find({});

export const deleteBidById = async (id: any) => Bid.findOneAndDelete({id});

export const deleteBidByJobId = async (jobId: any) => Bid.findOneAndDelete({jobId});

export const deleteManyBidsByJobId = async (jobId: any) => Milestone.deleteMany({jobId});

export const getMilestoneById = async (id: any) => {
    const milestones = await Milestone.findById(id);
    if (!milestones) return { code: 400, message: `Milestone with ID ${id} Does not exist` };

    return milestones;
}

export const getMilestonesByJobId = async (jobId: any) => {
    const milestones = await Milestone.find({ jobId });
    if (!milestones) return { code: 400, message: `Milestone with Job ID ${jobId} Does not exist` };

    return milestones;
}

export const createMilestone = (record: any) => (new Milestone(record)).save();

export const getAllMilestones = async () => await Milestone.find({});

export const deleteMilestoneByJobId = async (jobId: any) => Milestone.findOneAndDelete({jobId});

export const deleteMilestoneById = async (id: any) => Milestone.findOneAndDelete({id});

export const deleteManyMilestonesByJobId = async (jobId: any) => Milestone.deleteMany({jobId});