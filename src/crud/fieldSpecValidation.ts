export const modelName = {
  bid: "Bid",
  project: "Job",
  milestone: "Milestone",
};

export const fieldSpecValidation = (
  fieldSpecifications: any,
  payload: any,
  requestType: string
) => {
  const specifications = Object.keys(fieldSpecifications);

  const isValidField = Object.keys(payload).reduce(
    (acc: any, fieldName: any) => {
      if (acc.errors) return acc;

      if (!specifications.includes(fieldName))
        acc.errors = {
          fieldName: fieldName,
          message: `${fieldName} is not a valid field name`,
        };

      return acc;
    },
    {}
  );

  const validatedPayload: any = specifications.reduce(
    (acc: any, fieldName: any) => {
      if (acc.errors && acc.errors.length > 0) return acc;

      const fieldSpec = fieldSpecifications[fieldName];
      const field = payload[fieldName];

      if (fieldSpec.default && !field) payload[fieldName] = fieldSpec.default;

      acc = payload;

      if (fieldSpec.required && !payload[fieldName]) {
        if (!acc.errors) acc.errors = [];

        acc.errors.push({
          fieldName,
          message: `${fieldName} is required`,
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
          fieldName,
          message: `${fieldName}: ${
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

  const record = isValidField.errors ? isValidField : validatedPayload;

  return record.errors
    ? { code: 400, errors: record.errors }
    : validatedPayload;
};
