import { constants as HTTP_CODES } from "http2";
import { Project } from "../../types/types"
import { createJob, getBidsByJobId, getMilestonesByJobId, getAllJobs, getJobById, deleteBidByJobId, deleteMilestoneByJobId } from "../../utils/queries"

export const create = async (record: Project) => 
 ({ code: HTTP_CODES.HTTP_STATUS_OK, records: await createJob(record) });

const addToJobs = async (record: any, id: string) => {
  const bids: any = await getBidsByJobId(id);
  if (bids.code) return bids;

  bids.forEach((bid: any) => {
    record.bids.push(bid);
  });

  const milestones: any = await getMilestonesByJobId(id);
  if (milestones.code) return milestones;

  milestones.forEach((milestone: any) => {
    record.milestones.push(milestone);
  });
};

export const getById = async (id: string) => {
  const jobs: any = await getJobById(id);
  if (jobs.code) return jobs;

  await addToJobs(jobs, id);
  return { code: HTTP_CODES.HTTP_STATUS_OK, records: jobs };
};

export const getAll = async () => {
  const jobs: any = await getAllJobs();

  const jobRecords = await Promise.all(jobs.map(async (record: any) => {
    
    await addToJobs(record, record._id);
    
    return record;
  }));

  return { code: HTTP_CODES.HTTP_STATUS_OK, records: jobRecords };
};

export const deleteJobById = async (id: string) => {
  const jobs: any = await getJobById(id);
  if (jobs.code) return jobs;

  const bids: any = await getBidsByJobId(id);
  if (bids.code) return bids;

  const milestones: any = await getMilestonesByJobId(id);
  if (milestones.code) return milestones;

  if (bids.length != 0) bids.forEach(async () => (await deleteBidByJobId(id)));

  if (milestones.length != 0) milestones.forEach(async () => (await deleteMilestoneByJobId(id)));

  await deleteJobById(id);

  return {
    code: HTTP_CODES.HTTP_STATUS_OK, message: `ID ${id} Deleted Successfully`
  }
};
