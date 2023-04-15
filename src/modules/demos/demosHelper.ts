import { constants as HTTP_CODES } from "http2";
import { Demo } from "../../types/types";
import { demoFieldSpec } from "./demoSpec";
import { fieldSpecValidation, modelName } from "../../crud/fieldSpecValidation";
import {
  createRecord,
  updateRecord,
  getAllRecords,
  getRecordById,
  deleteRecordById,
} from "../../crud/crudProvider";

const { demo } = modelName;

export const create = async (payload: Demo, reqType: string) => {
  const validatedRecord = fieldSpecValidation(demoFieldSpec, payload, reqType);

  return validatedRecord.errors
    ? { code: 400, errors: validatedRecord.errors }
    : {
        code: HTTP_CODES.HTTP_STATUS_OK,
        records: await createRecord(demo, validatedRecord),
      };
};

export const getAll = async () => ({
  code: HTTP_CODES.HTTP_STATUS_OK,
  records: await getAllRecords(demo),
});

export const updateDemoById = async (
  id: string,
  payload: Demo,
  reqType: string
) => {
  const validatedRecord = await fieldSpecValidation(
    demoFieldSpec,
    payload,
    reqType
  );

  return validatedRecord.errors
    ? { code: 400, errors: validatedRecord.errors }
    : {
        code: HTTP_CODES.HTTP_STATUS_OK,
        records: await updateRecord(demo, { _id: id }, validatedRecord),
      };
};

export const deleteDemoById = async (id: string) => {
  const record: any = await getRecordById(demo, id);
  if (record.code) return record;

  return await deleteRecordById(demo, { _id: id });
};
