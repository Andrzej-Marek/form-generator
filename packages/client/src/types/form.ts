import { DateFormat } from "./date";
import { Schema, StringSchema, NumberSchema } from "./formValidation";
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
  "switch",
] as const;

export type FieldType = typeof FIELD_TYPES[number];
export type FormConfigTypes = FormConfigs["type"];

interface GenericFieldTypeConfig<Value, SchemaType = Schema> {
  field: FieldType;
  name: string;
  label?: string;
  value: Value;
  required?: boolean;
  schema: SchemaType;
}

// When FieldConfig.field === text
export interface TextFieldConfig
  extends GenericFieldTypeConfig<string, StringSchema> {
  field: "text";
  placeholder?: string;
}

export interface PasswordFieldConfig
  extends GenericFieldTypeConfig<string, StringSchema> {
  field: "password";
  placeholder?: string;
}

// When FieldConfig.field === text
export interface TextAreaFieldConfig
  extends GenericFieldTypeConfig<string, StringSchema> {
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
  extends GenericFieldTypeConfig<number | undefined, NumberSchema> {
  field: "number";
  placeholder?: string;
}

export interface SelectFieldConfig
  extends GenericFieldTypeConfig<string, StringSchema> {
  field: "select";
  placeholder?: string;
  options: SelectOption[];
}

// When FieldConfig.field === checkbox
// TODO: CHANGE
export interface CheckboxFieldConfig
  extends GenericFieldTypeConfig<boolean, StringSchema> {
  field: "checkbox";
}
export interface SwitchFieldConfig
  extends GenericFieldTypeConfig<boolean, StringSchema> {
  field: "switch";
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
  | SwitchFieldConfig
);

export type FormConfig = Array<FieldConfig | LayoutConfig>;

export type SectionConfig = {
  title?: string;
  subTitle?: string;
  name: string;
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
