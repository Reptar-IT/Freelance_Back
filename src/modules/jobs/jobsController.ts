import { Application, Request, Response } from "express";
import { authenticateUser } from "../../utils/tronWebConnect";

import {
  getById,
  getAll,
  create,
  deleteJobById,
  updateJobById,
} from "./jobsHelper";

export default {
  register(baseEndPoint: string, app: Application) {
    app.post(`${baseEndPoint}`, createJob);
    app.get(`${baseEndPoint}`, getJobs);
    app.get(`${baseEndPoint}/:id`, getJob);
    app.put(`${baseEndPoint}/:id`, updateJob);
    app.delete(`${baseEndPoint}/:id`, deleteJob);

    async function createJob(req: Request, res: Response) {
      try {
        const { record, address } = req.body;

        if (!(await authenticateUser(req.body)))
          res.status(401).send({ message: "User authentication failed" });

        const result: any = await create({ ...record, creator: address }, "POST");
        const { code } = result;

        res.status(code).send(result);
      } catch (exception) {
        console.log(exception);
        res.status(500).send({ message: "Internal Server Error" });
      }
    }

    async function getJobs(req: Request, res: Response) {
      try {
        const result: any = await getAll();
        const { code } = result;

        res.status(code).send(result);
      } catch (exception) {
        console.log(exception);
        res.status(500).send({ message: "Internal Server Error" });
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
        res.status(500).send({ message: "Internal Server Error" });
      }
    }

    async function updateJob(req: Request, res: Response) {
      try {
        const { body: {record, address }, params: { id } } = req as any;

        if (!(await authenticateUser(req.body)))
          res.status(401).send({ message: "User authentication failed" });

        // if address is not creator or employer then return error

        const result: any = await updateJobById(id, record, "PUT");
        const { code } = result;

        res.status(code).send(result);
      } catch (exception) {
        console.log(exception);
        res.status(500).send({ message: "Internal Server Error" });
      }
    }

    async function deleteJob(req: Request, res: Response) {
      try {
        const { body: { address }, params: { id } } = req as any;

        if (!(await authenticateUser(req.body)))
          res.status(401).send({ message: "User authentication failed" });

        // if address is not creator or employer then return error

        const result: any = await deleteJobById(id);
        const { code } = result;

        res.status(code).send(result);
      } catch (exception) {
        console.log(exception);
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
  },
};
