import { constants as HTTP_CODES } from "http2";
import { Offer } from "../../types/types"
import { createBid, deleteManyBidsByJobId, deleteOneBidById, getAllBids, getBidById, getJobById } from "../../utils/queries";

export const create = async (record: Offer) => {
    const { jobId } = record;
    const jobs: any = await getJobById(jobId);
    if (jobs.code) return { code: jobs.code, message: `The Project ID ${jobId} Does not exist` }

    return { code: HTTP_CODES.HTTP_STATUS_OK, records: await createBid(record) }
}

export const getById = async (id: string) => {
    const bids: any = await getBidById(id);
    if (bids.code) return bids;

    return { code: HTTP_CODES.HTTP_STATUS_OK, records: bids }
}

export const getBidsByJobId = async (jobId: string) => {
    const bids: any = await getBidsByJobId(jobId);
    if (bids.code) return bids;
 
    const jobs: any = await getJobById(jobId);

    if (jobs.code) {
        await deleteManyBidsByJobId({jobId});

        return {code: 400, message: `The Project ID ${jobId} No longer exist` } 
    };

    return { code: HTTP_CODES.HTTP_STATUS_OK, records: bids }
}

export const getAll = async () => ({ code: HTTP_CODES.HTTP_STATUS_OK, records: await getAllBids() });

export const deleteBidById = async (id: string) => {
    const bids: any = await getBidById(id);
    if (bids.code) return bids;

    return await deleteOneBidById(id);
}
