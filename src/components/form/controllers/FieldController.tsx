import { FieldConfig } from "src/types";
import {
  TextField,
  PasswordField,
  SelectField,
  NumberField,
  CheckboxField,
} from "..";

export const FieldController = ({
  fieldConfig,
}: {
  fieldConfig: FieldConfig;
}) => {
  const { field, name, label } = fieldConfig;

  if (field === "text") {
    return (
      <TextField
        name={name}
        label={label}
        placeholder={fieldConfig.placeholder}
        required={fieldConfig.required}
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
