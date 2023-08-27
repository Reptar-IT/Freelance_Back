import { constants as HTTP_CODES } from "http2";
import { Offer } from "../../types/types";
import { bidFieldSpec } from "./bidSpec";
import { fieldSpecValidation } from "../../crud/fieldSpecValidation";
import { modelName } from "../../crud/models";
import {
  createRecord,
  updateRecord,
  getAllRecords,
  getRecordById,
  deleteRecordById,
  getAllRecordsByParams,
  deleteManyRecordsByParams,
} from "../../crud/crudProvider";

const { project, bid } = modelName;

export const create = async (record: Offer, reqType: string) => {
  const { jobId } = record;
  const jobs: any = await getRecordById(project, jobId);
  if (jobs.code)
    return {
      code: jobs.code,
      message: `The Project ID ${jobId} Does not exist`,
    };

  const validatedRecord = fieldSpecValidation(bidFieldSpec, record, reqType);

  return validatedRecord.errors
    ? { code: 400, errors: validatedRecord.errors }
    : {
        code: HTTP_CODES.HTTP_STATUS_OK,
        records: await createRecord(bid, validatedRecord),
      };
};

export const getById = async (id: string) => {
  const record: any = await getRecordById(bid, id);
  if (record.code) return record;

  return { code: HTTP_CODES.HTTP_STATUS_OK, records: record };
};

export const getBidsByJobId = async (id: string) => {
  const bidRecords: any = await getAllRecordsByParams(bid, { jobId: id });
  if (bidRecords.code) return bidRecords;

  const jobs: any = await getRecordById(project, id);

  if (jobs.code) {
    await deleteManyRecordsByParams(bid, { jobId: id });

    return { code: 400, message: `The Project ID ${id} No longer exist` };
  }

  return { code: HTTP_CODES.HTTP_STATUS_OK, records: bidRecords };
};

export const getAll = async () => ({
  code: HTTP_CODES.HTTP_STATUS_OK,
  records: await getAllRecords(bid),
});

export const updateBidById = async (
  id: string,
  payload: Offer,
  reqType: string
) => {
  const validatedRecord = await fieldSpecValidation(
    bidFieldSpec,
    payload,
    reqType
  );

  return validatedRecord.errors
    ? { code: 400, errors: validatedRecord.errors }
    : {
        code: HTTP_CODES.HTTP_STATUS_OK,
        records: await updateRecord(bid, { _id: id }, validatedRecord),
      };
};

export const deleteBidById = async (id: string) => {
  const record: any = await getRecordById(bid, id);
  if (record.code) return record;

  return await deleteRecordById(bid, { _id: id });
};
