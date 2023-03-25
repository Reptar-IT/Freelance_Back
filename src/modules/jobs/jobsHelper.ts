import { constants as HTTP_CODES } from "http2";
import { Job, Bid, Milestone } from "../../../mongodb/schemas/index"
import { Project } from "../../types/types"

export const create = async (record: Project) => {
  const job = new Job(record);
  const records = await job.save();

  return { code: HTTP_CODES.HTTP_STATUS_OK, records }
}

const addToJobs = async (record: any, id: string) => {
  const bids: any = await Bid.find({ jobId: id });

  bids.forEach((bid: any) => {
    record.bids.push(bid);
  });

  const milestones: any = await Milestone.find({ jobId: id });

  milestones.forEach((milestone: any) => {
    record.milestones.push(milestone);
  });
};

export const getById = async (id: string) => {
  const record: any = await Job.findById(id);

  if (!record) return { code: 400, message: `ID ${id} Does not exist` }

  await addToJobs(record, id);

  return { code: HTTP_CODES.HTTP_STATUS_OK, records: record };
}

export const getAll = async () => {
  const jobs: any = await Job.find({});

  const jobRecords = await Promise.all(jobs.map(async (record: any) => {

    await addToJobs(record, record._id);

    return record;
  }));

  return { code: HTTP_CODES.HTTP_STATUS_OK, records: jobRecords };
}

export const deleteJobById = async (id: string) => {
  const record: any = await Job.findById(id);

  if (!record) return { code: 400, message: `ID ${id} Does not exist` };

  await Job.findByIdAndDelete(id);

  return {
    code: HTTP_CODES.HTTP_STATUS_OK, message: `ID ${id} Deleted Successfully`
  }
}
