import {
  CheckboxField,
  NumberField,
  SwitchField,
  TextField,
} from "@components/form";
import { FormGrid } from "@layout/form";
import { useField } from "formik";
import { SchemaRules } from "src/types";

const ValidationRuleConfigField = <SchemaType extends SchemaRules>({
  label,
  fieldKey,
  onValidationCheck,
  onChangeFieldSchema,
}: {
  label: string;
  fieldKey: keyof SchemaType;
  onValidationCheck: (name: keyof SchemaType, checked: boolean) => void;
  onChangeFieldSchema: (
    field: keyof SchemaType,
    value: number | string,
    type: "value" | "errorMessage"
  ) => void;
}) => {
  const [{ value: validationRecord }] = useField("validation");

  return (
    <>
      <SwitchField
        name={`validation.${fieldKey}`}
        label={label}
        onChange={(checked) => onValidationCheck(fieldKey, checked)}
      />
      {validationRecord[fieldKey] && (
        <FormGrid template="1fr 3fr">
          <NumberField
            name={`schema.rules.${fieldKey}.value`}
            label="Value"
            size="small"
            min={1}
            onChange={(event) =>
              onChangeFieldSchema(fieldKey, +event.target.value, "value")
            }
          />
          <TextField
            size="small"
            name={`schema.rules.${fieldKey}.errorMessage`}
            label="Error message"
            onChange={(event) =>
              onChangeFieldSchema(fieldKey, event.target.value, "errorMessage")
            }
          />
        </FormGrid>
      )}
    </>
  );
};

export default ValidationRuleConfigField;
