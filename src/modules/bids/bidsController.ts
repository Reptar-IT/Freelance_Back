import { Application, Request, Response } from "express";

import { getById, getAll, create, deleteBidById, getBidsByJobId } from "./bidsHelper";

export default {
    register(baseEndPoint: string, app: Application) {
        app.post(`${baseEndPoint}`, createBids);
        app.get(`${baseEndPoint}`, getBids);
        app.get(`${baseEndPoint}/:id`, getBid);
        app.get(`${baseEndPoint}/job_bids/:id`, getByJob);
        app.delete(`${baseEndPoint}/:id`, deleteBid);
        
        async function createBids(req: Request, res: Response) {
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
    
        async function getBids(req: Request, res: Response) {
            try {
                const result: any = await getAll();
                const { code } = result;
    
                res.status(code).send(result);
            } catch (exception) {
                console.log(exception);
                res.status(500).send({ message: 'Internal Server Error' })
            }
        }

        async function getBid(req: Request, res: Response) {
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

        async function getByJob(req: Request, res: Response) {
            try {
                const params = req.params as any;
                const { id } = params;
                const result: any = await getBidsByJobId(id);
                const { code } = result;
    
                res.status(code).send(result);
            } catch (exception) {
                console.log(exception);
                res.status(500).send({ message: 'Internal Server Error' })
            }
        }

        async function deleteBid(req: Request, res: Response) {
            try {
                const params = req.params as any;
                const { id } = params;
                const result: any = await deleteBidById(id);
                const { code } = result;
    
                res.status(code).send(result);
            } catch (exception) {
                console.log(exception);
                res.status(500).send({ message: 'Internal Server Error' })
            }
        }
    },
};