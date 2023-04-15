import { ModelObject } from "../types/types";
import { Demo, Job, Bid, Milestone } from "../../mongodb/schemas/index";

const model: ModelObject = { Demo, Job, Bid, Milestone };

const createRecord = (name: string, record: any) =>
  new model[name](record).save();

const getAllRecords = async (name: string) => (await model[name].find({}));

const deleteManyRecordsByParams = async (name: string, id: any) =>
  await model[name].deleteMany(id);

const getRecordById = async (name: string, id: any) => {
  const record = await model[name].findById(id);
  return !record
    ? { code: 400, message: `${name} with ID ${id} Does not exist` }
    : record;
};

const getAllRecordsByParams = async (name: string, id: any) => {
  const record = await model[name].find(id);
  return !record
    ? { code: 400, message: `${name} with ID ${id} Does not exist` }
    : record;
};

const deleteRecordById = async (name: string, id: any) => {
  await model[name].findOneAndDelete(id);
  return { code: 200, message: `${name} with ID ${id._id} has been deleted` };
};

const updateRecord = async (name: string, id: any, payload: any) => {
  const record = await model[name].findOneAndUpdate(id, payload, { new: true });

  return !record
    ? { code: 400, message: `${name} with ID ${id.id} Does not exist` }
    : record;
};

export {
  createRecord,
  updateRecord,
  getAllRecords,
  getRecordById,
  deleteRecordById,
  getAllRecordsByParams,
  deleteManyRecordsByParams,
};
