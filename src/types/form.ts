import { DateFormat } from "./date";
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
  "date",
] as const;

export type FieldType = typeof FIELD_TYPES[number];
export type FormConfigTypes = FormConfigs["type"];

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
export interface DateFieldConfig
  extends GenericFieldTypeConfig<Date | undefined> {
  field: "date";
  placeholder?: string;
  dateFormat?: DateFormat;
  minDate?: Date;
  maxDate?: Date;
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
  | DateFieldConfig
);

export type FormConfig = Array<FieldConfig | LayoutConfig>;

export type SectionConfig = {
  label: string;
  type: "section";
  config: Array<FieldConfig | LayoutConfig>;
};

export type FormBuilderConfig = Array<SectionConfig>;

export type FormConfigs = FieldConfig | LayoutConfig | EmptyConfig;

export const isFieldConfig = (config: FormConfigs): config is FieldConfig =>
  (config as FieldConfig).type === "field";

export const isLayoutConfig = (config: FormConfigs): config is LayoutConfig =>
  (config as LayoutConfig).type === "layout";

export const isEmptyConfig = (config: FormConfigs): config is EmptyConfig =>
  (config as EmptyConfig).type === "empty";

export type FormConfigPosition = {
  sectionIndex: number;
  configIndex: number;
  layoutConfigIndex?: number;
};

export type FieldConfigPosition = FormConfigPosition;
