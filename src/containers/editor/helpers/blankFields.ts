import { FieldConfig, FieldType } from "src/types";

export const blankFields: Record<FieldType, FieldConfig> = {
  checkbox: { field: "checkbox", value: "", name: "", type: "field" },
  number: { field: "number", value: undefined, name: "", type: "field" },
  password: { field: "password", value: "", name: "", type: "field" },
  select: {
    field: "select",
    value: "",
    name: "",
    type: "field",
    options: [],
  },
  text: { field: "text", value: "", name: "", type: "field" },
  textArea: { field: "textArea", value: "textArea", name: "", type: "field" },
  date: { field: "date", name: "", type: "field", value: undefined },
};
