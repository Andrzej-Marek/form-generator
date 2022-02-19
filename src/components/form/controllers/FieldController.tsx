import { FieldConfig, FieldType } from "src/types";
import {
  TextField,
  PasswordField,
  SelectField,
  NumberField,
  CheckboxField,
} from "..";

export type FieldControllerActions = {
  onConfigClick: (fieldType: FieldType) => void;
};
export const FieldController = ({
  fieldConfig,
  actions,
}: {
  fieldConfig: FieldConfig;
  actions?: FieldControllerActions;
}) => {
  const { field, name, label, value } = fieldConfig;

  if (field === "text") {
    return (
      <TextField
        name={name}
        label={label}
        value={value}
        placeholder={fieldConfig.placeholder}
        required={fieldConfig.required}
        onConfigClick={() => actions?.onConfigClick("text")}
      />
    );
  }

  if (field === "password") {
    return (
      <PasswordField
        name={name}
        label={label}
        placeholder={fieldConfig.placeholder}
      />
    );
  }

  if (field === "textArea") {
    // TODO: Text area field
    return <></>;
  }

  if (field === "select") {
    return (
      <SelectField
        name={name}
        label={label}
        placeholder={fieldConfig.placeholder}
        options={fieldConfig.options}
      />
    );
  }

  if (field === "number") {
    return (
      <NumberField
        name={name}
        label={label}
        placeholder={fieldConfig.placeholder}
      />
    );
  }

  if (field === "checkbox") {
    return (
      <CheckboxField name={name} label={label} value={fieldConfig.value} />
    );
  }

  return <></>;
};
