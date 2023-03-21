import { constants as HTTP_CODES } from "http2";

import { Job } from "../../../mongodb/schemas/job/job"

export const getAllJobs = () => {
    const record: any = Job.findOne();
    
    return { code: HTTP_CODES.HTTP_STATUS_OK, record }
}