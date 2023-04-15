import { constants as HTTP_CODES } from "http2";
import { Project } from "../../types/types";
import { jobFieldSpec } from "./jobSpec";
import {
  modelName,
  fieldSpecValidation,
} from "../../crud/fieldSpecValidation";
import {
  createRecord,
  getAllRecords,
  getRecordById,
  deleteRecordById,
  getAllRecordsByParams,
} from "../../crud/crudProvider";

const { project, bid, milestone } = modelName;

export const create = async (record: Project) => {
  const validatedRecord = fieldSpecValidation(jobFieldSpec, record, "POST");

  return validatedRecord.errors
    ? { code: 400, errors: validatedRecord.errors }
    : {
        code: HTTP_CODES.HTTP_STATUS_OK,
        records: await createRecord(project, validatedRecord),
      };
};

const addToJobs = async (record: any, id: string) => {
  const bidRecords: any = await getAllRecordsByParams(bid, { jobId: id });
  if (bidRecords.code) return bidRecords;

  bidRecords.forEach((bid: any) => {
    record.bids.push(bid);
  });

  const milestoneRecords: any = await getAllRecordsByParams(milestone, {
    jobId: id,
  });
  if (milestoneRecords.code) return milestoneRecords;

  milestoneRecords.forEach((milestone: any) => {
    record.milestones.push(milestone);
  });

  return record;
};

export const getById = async (id: string) => {
  const record: any = await getRecordById(project, id);
  if (record.code) return record;

  return {
    code: HTTP_CODES.HTTP_STATUS_OK,
    records: await addToJobs(record, id),
  };
};

export const getAll = async () => {
  const jobs: any = await getAllRecords(project);

  const jobRecords = await Promise.all(
    jobs.map(async (record: any) => {
      await addToJobs(record, record._id);

      return record;
    })
  );

  return { code: HTTP_CODES.HTTP_STATUS_OK, records: jobRecords };
};

export const deleteJobById: any = async (id: string) => {
  const jobRecords: any = await getRecordById(project, id);
  if (jobRecords.code) return jobRecords;

  const bidRecords: any = await getAllRecordsByParams(bid, { jobId: id });
  if (bidRecords.code) return bidRecords;

  const milestoneRecords: any = await getAllRecordsByParams(milestone, {
    jobId: id,
  });
  if (milestoneRecords.code) return milestoneRecords;

  if (bidRecords.length != 0)
    bidRecords.forEach(async () => await deleteRecordById(bid, { jobId: id }));

  if (milestoneRecords.length != 0)
    milestoneRecords.forEach(
      async () => await deleteRecordById(milestone, { jobId: id })
    );

  return await deleteRecordById(project, { _id: id });
};
