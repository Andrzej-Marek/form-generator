import { SwitchField, TextField } from "@components/form";
import { FormGrid } from "@layout/form";
import { useField } from "formik";
import { FC } from "react";
import { StringSchemaRules } from "src/types";
import { ValidationRuleConfigCommonProps } from "../ValidationRuleConfigField/ValidationRuleConfigField";

type OwnProps = {
  label: string;
} & ValidationRuleConfigCommonProps<StringSchemaRules, boolean>;

type Props = OwnProps;

const ValidationBooleanRuleConfigField: FC<Props> = ({
  label,
  fieldKey,
  onValidationCheck,
  onChangeFieldSchema,
}) => {
  const [{ value: validationRecord }, , { setValue }] = useField("validation");

  return (
    <div>
      <SwitchField
        className="mb-2"
        name={`schema.rules.${fieldKey}.value`}
        label={label}
        onChange={(checked) => {
          onChangeFieldSchema(fieldKey, checked, "value");
          onValidationCheck(fieldKey, checked);
          setValue({ ...validationRecord, [fieldKey]: checked });
        }}
      />
      {validationRecord[fieldKey] && (
        <TextField
          size="small"
          name={`schema.rules.${fieldKey}.errorMessage`}
          label="Error message"
          onChange={(event) =>
            onChangeFieldSchema(
              fieldKey,
              event.target.value as never,
              "errorMessage"
            )
          }
        />
      )}
    </div>
  );
};

export default ValidationBooleanRuleConfigField;
