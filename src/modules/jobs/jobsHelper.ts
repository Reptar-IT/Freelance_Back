import { constants as HTTP_CODES } from "http2";
import { Job, Bid } from "../../../mongodb/schemas/index"
import { Project } from "../../types/types"

export const create = async (record: Project) => {
    const job = new Job(record);
    const records = await job.save();

    return { code: HTTP_CODES.HTTP_STATUS_OK, records }
}

export const getById = async (id: string) => {
    const records: any = await Job.findById(id);

    if (!records) return { code: 400, message: `ID ${id} Does not exist` }

    const bids: any = await Bid.find({jobId: id});

    bids.forEach((bid: any) => {
        records.bids.push(bid);
    });

    return { code: HTTP_CODES.HTTP_STATUS_OK, records};
}

export const getAll = async () => {
    const jobs: any = await Job.find({});
    
    const jobRecords = await Promise.all(jobs.map(async (record: any) => {
      const bids: any = await Bid.find({jobId: record._id});
  
      bids.forEach((foundBid: any) => {
        record.bids.push(foundBid);
      });
  
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
