import Button from "@components/buttons/Button";
import { Form, TextField } from "@components/form";
import {
  FieldConfigPositionInfo,
  useFormConfigContext,
  useFormTemplateState,
} from "@containers/editor/context";
import { FormBody, FormWrapper } from "@layout/form";
import Yup from "@lib/validation";
import { FC, useMemo } from "react";
import { StringSchemaRules, TextFieldConfig } from "src/types";
import {
  NameConfigField,
  ValidationBooleanRuleConfigField,
  ValidationRuleConfigField,
} from "../components";
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

  return (
    <Form<FormModel>
      initialValues={formInitialValues}
      onSubmit={(value) => console.log({ value })}
      enableReinitialize
      validationSchema={schema}
    >
      {() => (
        <FormWrapper>
          <FormBody columns={2}>
            <NameConfigField
              onChange={(value) => onUpdateField("name", value)}
            />
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
            label="Min length"
            fieldKey="min"
            type="number"
            onChangeFieldSchema={onUpdateFieldSchema}
            onValidationCheck={onValidationCheck}
          />
          <ValidationRuleConfigField
            label="Max length"
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

const schema = Yup.object({
  name: Yup.string()
    .matches(/^[aA-zZ-\s]+$/, "Only alphabets are allowed for this field ")
    .required(),
  placeholder: Yup.string().trim(),
  label: Yup.string().trim(),
});

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
