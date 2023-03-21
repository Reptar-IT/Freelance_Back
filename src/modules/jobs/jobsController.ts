import { Application, Request, Response } from "express";

import { getById, getAll, create } from "./jobsHelper";

export default {
    register(baseEndPoint: string, app: Application) {
        app.post(`${baseEndPoint}`, createJob);
        app.get(`${baseEndPoint}`, getJobs);
        app.get(`${baseEndPoint}/:id`, getJob);
        
        async function createJob(req: Request, res: Response) {
            try {
                const { record } = req.body;
                const result: any = await create(record);
                const { code } = result;
    
                res.status(code).send(result);
            } catch (exception) {
                console.log(exception);
                res.status(500).send({ message: 'Internal Server Error' })
            }
        }
    
        async function getJobs(req: Request, res: Response) {
            try {
                const result: any = await getAll();
                const { code } = result;
    
                res.status(code).send(result);
            } catch (exception) {
                console.log(exception);
                res.status(500).send({ message: 'Internal Server Error' })
            }
        }

        async function getJob(req: Request, res: Response) {
            try {
                const params = req.params as any;
                const { id } = params;
                const result: any = await getById(id);
                const { code } = result;
    
                res.status(code).send(result);
            } catch (exception) {
                console.log(exception);
                res.status(500).send({ message: 'Internal Server Error' })
            }
        }
    },
};