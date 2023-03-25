import { constants as HTTP_CODES } from "http2";
import { Job, Milestone } from "../../../mongodb/schemas/index"
import { Offer } from "../../types/types"

export const create = async (record: Offer) => {
    if (!await Job.findById(record.jobId)) return { code: 400, message: `The Project ID ${record.jobId} Does not exist` }

    return { code: HTTP_CODES.HTTP_STATUS_OK, records: await (new Milestone(record)).save() }
}

export const getById = async (id: string) => {
    const records: any = await Milestone.findById(id);

    if (!records) return { code: 400, message: `The Milestone ID ${id} Does not exist` }

    return { code: HTTP_CODES.HTTP_STATUS_OK, records}
}

export const getTasksByTaskId = async (id: string) => {
    const records: any = await Milestone.find({jobId: id});

    if (!records) return { code: 400, message: `Milestone with Project ID ${id} Does not exist` }

    if (!await Job.findById(id)) {
        await Milestone.deleteMany({jobId: id});

        return {code: 400, message: `The Project ID ${id} No longer exist` } 
    };

    return { code: HTTP_CODES.HTTP_STATUS_OK, records }
}

export const getAll = async () => ({ code: HTTP_CODES.HTTP_STATUS_OK, records: await Milestone.find({}) });

export const deleteTaskById = async (id: string) => {
    const record: any = await Milestone.findById(id);

    if (!record) return { code: 400, message: `ID ${id} Does not exist` };

    await Milestone.findByIdAndDelete(id);

    return {
        code: HTTP_CODES.HTTP_STATUS_OK, message: `ID ${id} Deleted Successfully`
    }
}
