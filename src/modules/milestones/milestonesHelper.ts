import { constants as HTTP_CODES } from "http2";
import { createMilestone, deleteManyMilestonesByJobId, deleteMilestoneById, getAllMilestones, getJobById, getMilestoneById, getMilestonesByJobId } from "../../utils/queries"
import { Offer } from "../../types/types"

export const getAll = async () => ({ code: HTTP_CODES.HTTP_STATUS_OK, records: await getAllMilestones() });

export const create = async (record: Offer) => {
    const { jobId } = record;
    const jobs: any = await getJobById(jobId);
    if (jobs.code) return { code: jobs.code, message: `The Project ID ${jobId} Does not exist` }

    return { code: HTTP_CODES.HTTP_STATUS_OK, records: await createMilestone(record) }
};

export const getById = async (id: string) => {
    const milestone: any = await getMilestoneById(id);
    if (milestone.code) return milestone;

    return { code: HTTP_CODES.HTTP_STATUS_OK, records: milestone }
};

export const getTasksByTaskId = async (id: string) => {
    const milestones: any = await getMilestonesByJobId(id);
    if (milestones.code) return milestones;

    const jobs: any = await getJobById(id);

    if (jobs.code) {
        await deleteManyMilestonesByJobId({ id });

        return { code: jobs.code, message: `The Project ID ${id} No longer exist` }
    };

    return { code: HTTP_CODES.HTTP_STATUS_OK, records: milestones }
};

export const deleteTaskById = async (id: string) => {
    const milestone: any = await getMilestoneById(id);
    if (milestone.code) return milestone;

    return await deleteMilestoneById(id);
};
