import { constants as HTTP_CODES } from "http2";
import { Demo } from "../../types/types";
import { demoFieldSpec } from "./demoSpec";
import { createRecord, getAllRecords } from "../../crud/crudProvider";
import { fieldSpecValidation, modelName } from "../../crud/fieldSpecValidation";

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
