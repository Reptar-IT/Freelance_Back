import { Application, Request, Response } from "express";
import { authenticateUser } from "../../utils/tronConnectBE";
import { getAll, create } from "./demosHelper";

export default {
  register(baseEndPoint: string, app: Application) {
    app.get(`${baseEndPoint}`, getDemos);
    app.post(`${baseEndPoint}`, createDemo);

    async function getDemos(req: Request, res: Response) {
      try {
        const result: any = await getAll();
        const { code } = result;

        res.status(code).send(result);
      } catch (exception) {
        console.log(exception);
        res.status(500).send({ message: "Internal Server Error" });
      }
    }

    async function createDemo(req: Request, res: Response) {
      try {
        // if (!(await authenticateUser(req.body)))
        //   res.status(401).send({ message: "User authentication failed" });

        const { record, address: user } = req.body;
        const result: any = await create(record, 'POST');
        const { code } = result;

        res.status(code).send(result);
      } catch (exception) {
        console.log(exception);
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
  },
};
