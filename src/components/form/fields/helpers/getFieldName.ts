import { FieldType } from "src/types";

export const getFieldName = (fieldType: FieldType, name?: string) =>
  name || fieldType;
