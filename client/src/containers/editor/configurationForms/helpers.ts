import { SchemaRules } from "src/types";
import { FormModelAdditionFields } from "./types";

export const toFormModalValidation = <T = SchemaRules>(rules: T) => {
  const type: FormModelAdditionFields<T>["validation"] = {};

  for (const [key, value] of Object.entries(rules)) {
    if (value.value || value.errorMessage) {
      type[key as keyof T] = true;
    }
  }

  return type;
};
