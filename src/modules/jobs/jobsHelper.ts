import { constants as HTTP_CODES } from "http2";

import { Job } from "../../../mongodb/schemas/job/job"

export const getAllJobs = () => {

    console.log(Job);
    const record: any = Job.findOne();

    console.log({record});
    
    return { code: HTTP_CODES.HTTP_STATUS_OK, record }
}