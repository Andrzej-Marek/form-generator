import { FieldConfig, FieldType } from "src/types";

export const blankFields: Record<FieldType, FieldConfig> = {
  checkbox: {
    field: "checkbox",
    value: false,
    name: "checkbox",
    type: "field",
    schema: { type: "string", rules: {} },
  },
  number: {
    field: "number",
    value: undefined,
    name: "",
    type: "field",
    schema: { type: "number", rules: {} },
  },
  password: {
    field: "password",
    value: "",
    name: "",
    type: "field",
    schema: { type: "string", rules: {} },
  },
  select: {
    field: "select",
    value: "",
    name: "",
    type: "field",
    options: [],
    schema: { type: "string", rules: {} },
  },
  text: {
    field: "text",
    value: "",
    name: "",
    type: "field",
    schema: { type: "string", rules: {} },
  },
  textArea: {
    field: "textArea",
    value: "textArea",
    name: "",
    type: "field",
    schema: { type: "string", rules: {} },
  },
  date: {
    field: "date",
    name: "",
    type: "field",
    value: undefined,
    schema: { type: "string", rules: {} },
  },
  switch: {
    field: "switch",
    name: "",
    type: "field",
    value: false,
    schema: { type: "string", rules: {} },
  },
};
