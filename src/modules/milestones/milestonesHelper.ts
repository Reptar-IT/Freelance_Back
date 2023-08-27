import { constants as HTTP_CODES } from "http2";
import { Offer } from "../../types/types";
import { milestoneFieldSpec } from "./milestoneSpec";
import { fieldSpecValidation } from "../../crud/fieldSpecValidation";
import { modelName } from "../../crud/models";
import {
  createRecord,
  getAllRecords,
  getRecordById,
  getAllRecordsByParams,
  deleteRecordById,
  deleteManyRecordsByParams,
  updateRecord,
} from "../../crud/crudProvider";

const { project, milestone } = modelName;

export const getAll = async () => ({
  code: HTTP_CODES.HTTP_STATUS_OK,
  records: await getAllRecords(milestone),
});

export const create = async (record: Offer) => {
  const { jobId } = record;
  const job: any = await getRecordById(project, jobId);
  if (job.code)
    return {
      code: job.code,
      message: `The Project ID ${jobId} Does not exist`,
    };

  const validatedRecord = fieldSpecValidation(
    milestoneFieldSpec,
    record,
    "POST"
  );

  return validatedRecord.errors
    ? { code: 400, errors: validatedRecord.errors }
    : {
        code: HTTP_CODES.HTTP_STATUS_OK,
        records: await createRecord(milestone, validatedRecord),
      };
};

export const getById = async (id: string) => {
  const record: any = await getRecordById(milestone, id);
  if (record.code) return record;

  return { code: HTTP_CODES.HTTP_STATUS_OK, records: record };
};

export const getTasksByTaskId = async (id: string) => {
  const milestoneRecords: any = await getAllRecordsByParams(milestone, {
    jobId: id,
  });
  if (milestoneRecords.code) return milestoneRecords;

  const jobs: any = await getRecordById(project, id);

  if (jobs.code) {
    await deleteManyRecordsByParams(milestone, { jobId: id });

    return { code: jobs.code, message: `The Project ID ${id} No longer exist` };
  }

  return { code: HTTP_CODES.HTTP_STATUS_OK, records: milestoneRecords };
};

export const updateMilestoneById = async (
  id: string,
  payload: Offer,
  reqType: string
) => {
  const validatedRecord = await fieldSpecValidation(
    milestoneFieldSpec,
    payload,
    reqType
  );

  return validatedRecord.errors
    ? { code: 400, errors: validatedRecord.errors }
    : {
        code: HTTP_CODES.HTTP_STATUS_OK,
        records: await updateRecord(milestone, { _id: id }, validatedRecord),
      };
};

export const deleteTaskById = async (id: string) => {
  const record: any = await getRecordById(milestone, id);
  if (record.code) return record;

  return await deleteRecordById(milestone, { _id: id });
};
