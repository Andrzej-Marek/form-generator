export type ValidationOption<T = "string" | "number" | "boolean"> = {
  value: T;
  errorMessage?: string;
};

type StringRules = {
  min?: ValidationOption<number>;
  max?: ValidationOption<number>;
  required?: ValidationOption<boolean>;
};

type NumberRules = {
  min?: ValidationOption<number>;
  max?: ValidationOption<number>;
  required?: ValidationOption<boolean>;
};

export type StringSchema = {
  type: "string";
  rules: StringRules;
};

export type NumberSchema = {
  type: "number";
  rules: NumberRules;
};

export type Schema = StringSchema | NumberSchema;
