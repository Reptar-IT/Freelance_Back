import { Job, Bid, Milestone } from "../../mongodb/schemas/index";

const createJob = (record: any) => new Job(record).save();

const getAllJobs = async () => await Job.find({});

const getJobById = async (jobId: any) => {
  const jobs = await Job.findById(jobId);
  if (!jobs)
    return { code: 400, message: `Job with ID ${jobId} Does not exist` };

  return jobs;
};

const deleteOneJobById = async (jobId: any) => {
  await Job.findByIdAndDelete(jobId);
  return { code: 200, message: `Job with ID ${jobId} has been deleted` };
};

const createBid = (record: any) => new Bid(record).save();

const getAllBids = async () => await Bid.find({});

const deleteBidByJobId = async (jobId: any) =>
  await Bid.findOneAndDelete({ jobId });

const deleteManyBidsByJobId = async (jobId: any) =>
  await Milestone.deleteMany({ jobId });

const getBidById = async (id: any) => {
  const bids = await Bid.findById(id);
  if (!bids) return { code: 400, message: `Bid with ID ${id} Does not exist` };

  return bids;
};

const getBidsByJobId = async (jobId: any) => {
  const bids = await Bid.find({ jobId });
  if (!bids)
    return { code: 400, message: `Bid with Job ID ${jobId} Does not exist` };

  return bids;
};

const deleteOneBidById = async (id: any) => {
  await Bid.findOneAndDelete({ id });
  return { code: 200, message: `Bid with ID ${id} has been deleted` };
};

const createMilestone = (record: any) => new Milestone(record).save();

const getAllMilestones = async () => await Milestone.find({});

const deleteMilestoneByJobId = async (jobId: any) =>
  await Milestone.findOneAndDelete({ jobId });

const deleteManyMilestonesByJobId = async (jobId: any) =>
  await Milestone.deleteMany({ jobId });

const getMilestoneById = async (id: any) => {
  const milestones = await Milestone.findById(id);
  if (!milestones)
    return { code: 400, message: `Milestone with ID ${id} Does not exist` };

  return milestones;
};

const getMilestonesByJobId = async (jobId: any) => {
  const milestones = await Milestone.find({ jobId });
  if (!milestones)
    return {
      code: 400,
      message: `Milestone with Job ID ${jobId} Does not exist`,
    };

  return milestones;
};

const deleteMilestoneById = async (id: any) => {
  await Milestone.findOneAndDelete({ id });
  return { code: 200, message: `Milestone with ID ${id} has been deleted` };
};

export {
  createJob,
  getAllJobs,
  getJobById,
  deleteOneJobById,
  createBid,
  getAllBids,
  deleteBidByJobId,
  deleteManyBidsByJobId,
  getBidById,
  getBidsByJobId,
  deleteOneBidById,
  createMilestone,
  getAllMilestones,
  deleteMilestoneByJobId,
  deleteManyMilestonesByJobId,
  getMilestoneById,
  getMilestonesByJobId,
  deleteMilestoneById,
};
