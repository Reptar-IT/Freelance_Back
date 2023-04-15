export const modelName = {
  demo: "Demo",
  bid: "Bid",
  project: "Job",
  milestone: "Milestone",
};

export const fieldSpecValidation = (
  fieldSpecifications: any,
  payload: any,
  requestType: string
) => {
  const specFieldNames = Object.keys(fieldSpecifications);

  const { conditionedSpecs, payloadRecord } =
    requestType === "PUT"
      ? {
          conditionedSpecs: specFieldNames.filter(
            (fieldName) => fieldSpecifications[fieldName].updatable
          ),
          payloadRecord: payload.record,
        }
      : { conditionedSpecs: specFieldNames, payloadRecord: payload };

  const invalidFields = Object.keys(payloadRecord).filter(
    (fieldName) => !conditionedSpecs.includes(fieldName)
  );

  if (invalidFields.length > 0)
    return {
      code: 400,
      errors: {
        invalidFields,
        message: `Invalid${
          requestType === "PUT" ? " or Non-Updatable" : ""
        } fields in payload`,
      },
    };

  const isValidPayload: any = conditionedSpecs.reduce(
    (acc: any, specFieldName: any) => {
      if (acc.errors && acc.errors.length > 0) return acc;

      const fieldSpec = fieldSpecifications[specFieldName];
      const field = payloadRecord[specFieldName];

      if (fieldSpec.default && !field)
        payloadRecord[specFieldName] = fieldSpec.default;

      acc = payloadRecord;

      if (fieldSpec.required && !payloadRecord[specFieldName]) {
        if (!acc.errors) acc.errors = [];

        acc.errors.push({
          specFieldName,
          message: `${specFieldName} is required`,
          spec: fieldSpec,
        });
      }

      if (
        fieldSpec.validValues &&
        (fieldSpec.type !== "List"
          ? !fieldSpec.validValues.includes(field)
          : field.some((item: any) => !fieldSpec.validValues.includes(item)))
      ) {
        if (!acc.errors) acc.errors = [];

        acc.errors.push({
          specFieldName,
          message: `${specFieldName}: ${
            fieldSpec.type === "List"
              ? field.filter(
                  (item: any) => !fieldSpec.validValues.includes(item)
                )
              : field
          } must be a valid value (${fieldSpec.validValues
            .slice(0, 3)
            .join(", ")}, etc...)`,
          spec: {
            ...fieldSpec,
            validValues: `${fieldSpec.validValues.slice(0, 3)} , etc...)`,
          },
        });
      }

      return acc;
    },
    []
  );

  return isValidPayload.errors
    ? { code: 400, errors: isValidPayload.errors }
    : isValidPayload;
};
