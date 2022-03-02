export type ValidationOption<T = "string" | "number" | "boolean"> = {
  value: T;
  errorMessage?: string;
};

export type StringSchemaRules = {
  min?: ValidationOption<number>;
  max?: ValidationOption<number>;
  required?: ValidationOption<boolean>;
};

export type NumberSchemaRules = {
  min?: ValidationOption<number>;
  max?: ValidationOption<number>;
  required?: ValidationOption<boolean>;
};

export type StringSchema = {
  type: "string";
  rules: StringSchemaRules;
};

export type NumberSchema = {
  type: "number";
  rules: NumberSchemaRules;
};

export type SchemaRules = StringSchemaRules | NumberSchemaRules;
export type Schema = StringSchema | NumberSchema;
