import { Application, Request, Response } from "express";
import { getTest } from "./testsHelper";

export default {
    register(baseEndPoint: string, app: Application) {
        app.get(`${baseEndPoint}`, getTests);
    
        async function getTests(req: Request, res: Response) {
            try {
                const result: any = await getTest();
                const { code } = result;
    
                res.status(code).send(result);
            } catch (exception) {
                console.log(exception);
                res.status(500).send({ message: 'Internal Server Error' })
            }
        }
    },
};