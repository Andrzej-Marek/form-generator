import { FieldConfig, FieldType } from "src/types";

export const blankFields: Record<FieldType, FieldConfig> = {
  checkbox: { field: "checkbox", value: "", name: "checkbox", type: "field" },
  number: { field: "number", value: undefined, name: "number", type: "field" },
  password: { field: "password", value: "", name: "password", type: "field" },
  select: {
    field: "select",
    value: "",
    name: "select",
    type: "field",
    options: [],
  },
  text: { field: "text", value: "", name: "text", type: "field" },
  textArea: { field: "textArea", value: "textArea", name: "", type: "field" },
};
