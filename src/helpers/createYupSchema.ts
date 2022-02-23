import { FormConfig } from "src/types/form";
import { Schema } from "src/types/formValidation";
import { FormBuilderConfig } from "src/types";
import * as yup from "yup";

// Here we're mapping whole fields config to mach config and we take a schema rules
// We can make nested object, we have to add name for layout field
export const buildYupSchema = (config: FormBuilderConfig) => {
  const yupObject: any = {};
  config.forEach((section) => {
    section.config.forEach((el) => {
      if (el.type === "layout") {
        el.config.forEach((field) => {
          if (field.type === "empty" || !field.schema) {
            return;
          }
          yupObject[field.name] = buildKeyValidation(field.schema);
        });
      }

      if (el.type === "field") {
        if (!el.schema) {
          return;
        }
        yupObject[el.name] = buildKeyValidation(el.schema);
      }
    });
  });

  return yup.object(yupObject);
};

// Here we're building a yup key config eg. name: Yup.string().min(2).max(10)
const buildKeyValidation = (schema: Schema) => {
  if (!yup[schema.type]) {
    throw new Error(`Yup type ${schema.type} is invalid!`);
  }

  let validator = yup[schema.type]();

  Object.entries(schema.rules).map(([method, config]) => {
    // @ts-ignore
    if (!validator[method] || typeof config.value === "undefined") {
      return;
    }

    if (method === "required") {
      validator = validator.required(config.errorMessage);
      return;
    }

    // @ts-ignore
    validator = validator[method](config.value, config.errorMessage);
  });

  return validator;
};
