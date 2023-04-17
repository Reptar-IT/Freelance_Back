import { Application, Request, Response } from "express";
import { authenticateUser } from "../../utils/tronWebConnect";
import { getAll, create, deleteDemoById, updateDemoById } from "./demosHelper";

export default {
  register(baseEndPoint: string, app: Application) {
    app.get(`${baseEndPoint}`, getDemos);
    app.post(`${baseEndPoint}`, createDemo);
    app.put(`${baseEndPoint}/:id`, updateDemo);
    app.delete(`${baseEndPoint}/:id`, deleteDemo);

    async function createDemo(req: Request, res: Response) {
      try {
        const { record, address } = req.body;

        if (!(await authenticateUser(req.body)))
          res.status(401).send({ message: "User authentication failed" });

        const result: any = await create(
          { ...record, creator: address },
          "POST"
        );
        const { code } = result;

        res.status(code).send(result);
      } catch (exception) {
        console.log(exception);
        res.status(500).send({ message: "Internal Server Error" });
      }
    }

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

    async function updateDemo(req: Request, res: Response) {
      try {
        const { body: record, params } = req as any;
        const { id } = params;
        const result: any = await updateDemoById(id, record, "PUT");
        const { code } = result;

        res.status(code).send(result);
      } catch (exception) {
        console.log(exception);
        res.status(500).send({ message: "Internal Server Error" });
      }
    }

    async function deleteDemo(req: Request, res: Response) {
      try {
        const params = req.params as any;
        const { id } = params;
        const result: any = await deleteDemoById(id);
        const { code } = result;

        res.status(code).send(result);
      } catch (exception) {
        console.log(exception);
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
  },
};
