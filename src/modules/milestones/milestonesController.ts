import { Application, Request, Response } from "express";

import { getById, getAll, create, deleteTaskById, getTasksByTaskId } from "./milestonesHelper";

export default {
    register(baseEndPoint: string, app: Application) {
        app.post(`${baseEndPoint}`, createTask);
        app.get(`${baseEndPoint}`, getTasks);
        app.get(`${baseEndPoint}/:id`, getTask);
        app.get(`${baseEndPoint}/job_milestones/:id`, getByJob);
        app.delete(`${baseEndPoint}/:id`, deleteTask);
        
        async function createTask(req: Request, res: Response) {
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
    
        async function getTasks(req: Request, res: Response) {
            try {
                const result: any = await getAll();
                const { code } = result;
    
                res.status(code).send(result);
            } catch (exception) {
                console.log(exception);
                res.status(500).send({ message: 'Internal Server Error' })
            }
        }

        async function getTask(req: Request, res: Response) {
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
                const result: any = await getTasksByTaskId(id);
                const { code } = result;
    
                res.status(code).send(result);
            } catch (exception) {
                console.log(exception);
                res.status(500).send({ message: 'Internal Server Error' })
            }
        }

        async function deleteTask(req: Request, res: Response) {
            try {
                const params = req.params as any;
                const { id } = params;
                const result: any = await deleteTaskById(id);
                const { code } = result;
    
                res.status(code).send(result);
            } catch (exception) {
                console.log(exception);
                res.status(500).send({ message: 'Internal Server Error' })
            }
        }
    },
};