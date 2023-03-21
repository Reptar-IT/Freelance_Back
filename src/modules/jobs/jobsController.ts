import { Application, Request, Response } from "express";
import { getAllJobs } from "./jobsHelper";

export default {
    register(baseEndPoint: string, app: Application) {
        app.get(`${baseEndPoint}`, getJobs);
    
        async function getJobs(req: Request, res: Response) {
            try {
                const result: any = await getAllJobs();
                const { code } = result;
    
                res.status(code).send(result);
            } catch (exception) {
                console.log(exception);
                res.status(500).send({ message: 'Internal Server Error' })
            }
        }
    },
};