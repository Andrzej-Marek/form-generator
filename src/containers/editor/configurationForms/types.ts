import { FieldConfig, SchemaRules } from "src/types";

export type FormModelAdditionFields<T = SchemaRules> = {
  validation: Partial<Record<keyof T, boolean>>;
};
export type FieldConfigurationFormModel<
  Field = FieldConfig,
  T = SchemaRules
> = Field & FormModelAdditionFields<T>;
