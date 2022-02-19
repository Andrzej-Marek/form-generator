import { useFormTemplateAction } from "@containers/editor/context";
import { FieldConfig, FieldType } from "src/types";
import {
  TextField,
  PasswordField,
  SelectField,
  NumberField,
  CheckboxField,
} from "..";

export const FieldController = ({
  index,
  subIndex,
  fieldConfig,
}: {
  fieldConfig: FieldConfig;
  index: number;
  subIndex?: number;
}) => {
  const { setFieldConfigureInfo, setView } = useFormTemplateAction();
  const { field, name, label } = fieldConfig;

  const onConfigClick = (fieldType: FieldType) => {
    setFieldConfigureInfo({ field: fieldType, index, subIndex });
    setView("fieldConfig");
  };

  if (field === "text") {
    return (
      <TextField
        name={name}
        label={label}
        placeholder={fieldConfig.placeholder}
        required={fieldConfig.required}
        onConfigClick={() => onConfigClick("text")}
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
