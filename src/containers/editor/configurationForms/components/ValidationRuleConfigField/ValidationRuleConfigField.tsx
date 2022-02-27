import { NumberField, SwitchField, TextField } from "@components/form";
import { FormGrid } from "@layout/form";
import { useField } from "formik";
import { FC, useMemo } from "react";
import { NumberSchemaRules, StringSchemaRules } from "src/types";

export interface ValidationRuleConfigCommonProps<Rule, T> {
  fieldKey: keyof Rule;
  onValidationCheck: (name: keyof Rule, checked: boolean) => void;
  onChangeFieldSchema: (
    field: keyof Rule,
    value: T,
    type: "value" | "errorMessage"
  ) => void;
}

type OwnProps = {
  label: string;
} & (NumberType | StringType);

interface NumberType
  extends ValidationRuleConfigCommonProps<NumberSchemaRules, number | string> {
  type: "number";
}
interface StringType
  extends ValidationRuleConfigCommonProps<StringSchemaRules, string> {
  type: "string";
}

type Props = OwnProps;

const ValidationRuleConfigField: FC<Props> = ({
  label,
  fieldKey,
  onValidationCheck,
  onChangeFieldSchema,
  type,
}) => {
  const [{ value: validationRecord }] = useField("validation");

  const valueTypeField = useMemo(() => {
    if (type === "number") {
      return (
        <NumberField
          name={`schema.rules.${fieldKey}.value`}
          label="Value"
          size="small"
          min={1}
          onChange={(event) => {
            const value = +event.target.value as never;
            onChangeFieldSchema(fieldKey, value, "value");
          }}
        />
      );
    }
    if (type === "string") {
      <TextField
        name={`schema.rules.${fieldKey}.value`}
        label="Value"
        size="small"
        onChange={(event) => {
          const value = event.target.value as never;
          onChangeFieldSchema(fieldKey, value, "value");
        }}
      />;
    }

    return <></>;
  }, [type]);
  return (
    <>
      <SwitchField
        name={`validation.${fieldKey}`}
        label={label}
        onChange={(checked) => {
          onValidationCheck(fieldKey, checked);
        }}
      />
      {validationRecord[fieldKey] && (
        <FormGrid template="1fr 3fr">
          {valueTypeField}
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
        </FormGrid>
      )}
    </>
  );
};

export default ValidationRuleConfigField;
