import { constants as HTTP_CODES } from "http2";
import { Job } from "../../../mongodb/schemas/index"
import { Project } from "../../types/types"

export const create = async (record: Project) => {
    const job = new Job( record );
    const records = await job.save();

    return { code: HTTP_CODES.HTTP_STATUS_OK, records }
}

export const getById = async (id: string) => {
    const records: any = await Job.findById(id);

    return { code: HTTP_CODES.HTTP_STATUS_OK, records }
}

export const getAll = async () => {
    const records: any = await Job.find({});

    return { code: HTTP_CODES.HTTP_STATUS_OK, records }
}