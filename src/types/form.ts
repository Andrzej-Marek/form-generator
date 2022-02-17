import { Schema } from "./formValidation";
import { SelectOption } from "./selectOption";

// Generic types for FieldConfig.type === field
export const FIELD_TYPES = [
  "text",
  "checkbox",
  "number",
  "textArea",
  "select",
  "password",
] as const;

export type FieldType = typeof FIELD_TYPES[number];

interface GenericFieldTypeConfig<Value> {
  field: FieldType;
  name: string;
  label?: string;
  value: Value;
  required?: boolean;
  schema?: Schema;
}

// When FieldConfig.field === text
export interface TextFieldConfig extends GenericFieldTypeConfig<string> {
  field: "text";
  placeholder?: string;
}

export interface PasswordFieldConfig extends GenericFieldTypeConfig<string> {
  field: "password";
  placeholder?: string;
}

// When FieldConfig.field === text
export interface TextAreaFieldConfig extends GenericFieldTypeConfig<string> {
  field: "textArea";
  placeholder?: string;
  height?: number; // height in px-s
}

// When FieldConfig.field === number
export interface NumberFieldConfig
  extends GenericFieldTypeConfig<number | undefined> {
  field: "number";
  placeholder?: string;
}

export interface SelectFieldConfig extends GenericFieldTypeConfig<string> {
  field: "select";
  placeholder?: string;
  options: SelectOption[];
}

// When FieldConfig.field === checkbox
export interface CheckboxFieldConfig extends GenericFieldTypeConfig<string> {
  field: "checkbox";
}

export type LayoutConfig = {
  type: "layout";
  columns: number; // Columns only works on lg screen
  config: Array<FieldConfig | EmptyConfig>;
};

// Use empty when tou want to display a drop content
export type EmptyConfig = {
  type: "empty";
};

export type FieldConfig = {
  type: "field";
} & (
  | TextFieldConfig
  | NumberFieldConfig
  | CheckboxFieldConfig
  | TextAreaFieldConfig
  | SelectFieldConfig
  | PasswordFieldConfig
);

//// We can make nested object, we have to add name for layout field
export type FormConfig = Array<FieldConfig | LayoutConfig>;
