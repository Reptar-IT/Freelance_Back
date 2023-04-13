import { Job, Bid, Milestone } from "../../mongodb/schemas/index";

const createJob = (record: any) => new Job(record).save();

const getAllJobs = async () => await Job.find({});

const getJobById = async (jobId: any) => {
  const job = await Job.findById(jobId);
  return !job
    ? { code: 400, message: `Job with ID ${jobId} Does not exist` }
    : job;
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
  const bid = await Bid.findById(id);
  return !bid
    ? { code: 400, message: `Bid with ID ${id} Does not exist` }
    : bid;
};

const getBidsByJobId = async (jobId: any) => {
  const bids = await Bid.find({ jobId });
  return !bids
    ? { code: 400, message: `Bid with ID ${jobId} Does not exist` }
    : bids;
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
  const milestone = await Milestone.findById(id);
  return !milestone
    ? { code: 400, message: `Milestone with ID ${id} Does not exist` }
    : milestone;
};

const getMilestonesByJobId = async (jobId: any) => {
  const milestones = await Milestone.find({ jobId });
  return !milestones
    ? { code: 400, message: `Milestone with Job ID ${jobId} Does not exist` }
    : milestones;
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
