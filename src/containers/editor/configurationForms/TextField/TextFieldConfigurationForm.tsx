import Button from "@components/buttons/Button";
import { Form, TextField } from "@components/form";
import {
  FieldConfigPositionInfo,
  useFormConfigContext,
  useFormTemplateState,
} from "@containers/editor/context";
import { FormBody, FormWrapper } from "@layout/form";
import { FC, useMemo, useState } from "react";
import { StringSchemaRules, TextFieldConfig } from "src/types";
import { ValidationRuleConfigField } from "../components";
import ValidationBooleanRuleConfigField from "../components/ValidationBooleanRuleConfigField/ValidationBooleanRuleConfigField";
import { toFormModalValidation } from "../helpers";
import { FieldConfigurationFormModel } from "../types";

type OwnProps = {
  fieldConfigPosition: FieldConfigPositionInfo;
  fieldConfig: TextFieldConfig;
};

type Props = OwnProps;

type FormModel = FieldConfigurationFormModel<
  TextFieldConfig,
  StringSchemaRules
>;

const TextFieldConfigurationForm: FC<Props> = ({
  fieldConfigPosition,
  fieldConfig,
}) => {
  const { fieldConfigPosition: position } = useFormTemplateState();
  // const [position] = useState(fieldConfigPosition);
  const { updateField, updateFieldSchema, resetValidationRule } =
    useFormConfigContext();

  const onUpdateField = (field: keyof TextFieldConfig, value: string) => {
    updateField<TextFieldConfig>(field, value, fieldConfigPosition);
  };

  const onUpdateFieldSchema = (
    field: keyof StringSchemaRules,
    value: string | number | boolean,
    type: "value" | "errorMessage"
  ) => {
    updateFieldSchema<StringSchemaRules>(field, value, type, position!);
  };

  const onValidationCheck = (
    field: keyof StringSchemaRules,
    checked: boolean
  ) => {
    if (checked) {
      return;
    }

    resetValidationRule(field, fieldConfigPosition);
  };

  const formInitialValues = useMemo(
    () => configToInitialValues(fieldConfig),
    [fieldConfig]
  );

  const resetToInitialValues = () => {
    console.log("API CALL TO BE");
    // const initial = resetFieldToInitial(index, subIndex);

    // if (initial.field !== "text") {
    //   throw new Error("Invalid initial");
    // }

    // return initial;
  };

  return (
    <Form<FormModel>
      initialValues={formInitialValues}
      onSubmit={(value) => console.log({ value })}
      enableReinitialize
      // validationSchema={validationSchema}
    >
      {({ resetForm, values }) => (
        <FormWrapper>
          <FormBody columns={2}>
            <TextField
              name="name"
              label="Name"
              size="small"
              placeholder="Field name"
              infoTooltip="You have to specify a name to have a uniq value of field"
              onChange={(event) => onUpdateField("name", event.target.value)}
            />
            {/* <TextField
              name="value"
              label="Initial value"
              size="small"
              placeholder="Initial value"
              onChange={(event) => onUpdateField("value", event.target.value)}
            /> */}
          </FormBody>
          <TextField
            name="label"
            label="Label"
            size="small"
            placeholder="Please insert a label"
            onChange={(event) => onUpdateField("label", event.target.value)}
          />
          <TextField
            name="placeholder"
            label="Placeholder"
            size="small"
            placeholder="Please insert a placeholder"
            onChange={(event) =>
              onUpdateField("placeholder", event.target.value)
            }
          />
          <div className="pb-5 text-center">VALIDATION CONFIG!!!!</div>

          <ValidationRuleConfigField
            label="Min value"
            fieldKey="min"
            type="number"
            onChangeFieldSchema={onUpdateFieldSchema}
            onValidationCheck={onValidationCheck}
          />
          <ValidationRuleConfigField
            label="Max value"
            fieldKey="max"
            onChangeFieldSchema={onUpdateFieldSchema}
            type="number"
            onValidationCheck={onValidationCheck}
          />

          <ValidationBooleanRuleConfigField
            label="Required"
            fieldKey="required"
            onChangeFieldSchema={onUpdateFieldSchema}
            onValidationCheck={onValidationCheck}
          />
          <Button type="submit" size="small">
            Save
          </Button>

          {/* <Button
            variant="cancelOutline"
            type="reset"
            size="small"
            onClick={() => resetForm({ values: formInitialValues })}
          >
            Reset
          </Button> */}
        </FormWrapper>
      )}
    </Form>
  );
};

const configToInitialValues = (config: TextFieldConfig): FormModel => ({
  field: "text",
  name: config.name,
  value: config.value,
  placeholder: config.placeholder ?? "",
  label: config.label ?? "",
  required: config.required ?? false,
  schema: config.schema ?? undefined,
  validation: toFormModalValidation(config.schema.rules),
});

export default TextFieldConfigurationForm;
