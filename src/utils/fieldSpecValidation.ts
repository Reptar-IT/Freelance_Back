export const fieldSpecValidation = (
  fieldSpecifications: any,
  record: any,
  requestType: string
) => {
  const validatedRecord: any = Object.keys(fieldSpecifications).reduce(
    (acc: any, fieldName: any) => {
      const fieldSpec = fieldSpecifications[fieldName];
      const field = record[fieldName];

      if (fieldSpec.default && !field) record[fieldName] = fieldSpec.default;

      acc = record;

      if (fieldSpec.required && !field) {
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
          } must be a valid value (${fieldSpec.validValues.slice(0, 3).join(", ")}, etc...)`,
          spec: { ...fieldSpec, validValues: `${fieldSpec.validValues.slice(0, 3)} , etc...)`},
        });
      }

      // todo: compare with existing record find by Id.
      if (
        requestType === "PUT" &&
        !fieldSpec.updatable &&
        record[fieldName] !== record[fieldName]
      )
        acc.errors.push({
          fieldName,
          message: `${fieldName} is not Updatable`,
          spec: { ...fieldSpec, updatable: false },
        });

      return acc;
    },
    []
  );

  return validatedRecord.errors
    ? { code: 400, errors: validatedRecord.errors }
    : validatedRecord;
};
