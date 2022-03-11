import { FieldConfig, FieldType } from "src/types";
import {
  TextField,
  PasswordField,
  SelectField,
  NumberField,
  CheckboxField,
} from "..";
import DateField from "../fields/DateField";

export type FieldControllerActions = {
  onConfigClick: (fieldType: FieldType) => void;
  onDeleteClick: (fieldType: FieldType) => void;
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
        value={value as string}
        placeholder={fieldConfig.placeholder}
        required={fieldConfig.required}
        withActionWrapper={!!actions}
        actions={{
          onConfigClick: () => actions?.onConfigClick("text"),
          onDeleteClick: () => actions?.onDeleteClick("text"),
        }}
      />
    );
  }

  if (field === "date") {
    return (
      <DateField
        name={name}
        inputProps={{
          name,
          label,
          placeholder: fieldConfig.placeholder,
          required: fieldConfig.required,
        }}
        minDate={fieldConfig.minDate}
        maxDate={fieldConfig.maxDate}
        dateFormat={fieldConfig.dateFormat}
        withActionWrapper={!!actions}
        actions={{
          onConfigClick: () => actions?.onConfigClick("date"),
          onDeleteClick: () => actions?.onDeleteClick("date"),
        }}
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
        actions={{
          onConfigClick: () => actions?.onConfigClick("number"),
          onDeleteClick: () => actions?.onDeleteClick("number"),
        }}
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
