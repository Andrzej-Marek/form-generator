import Button from "@components/buttons/Button";
import { CheckboxField, Form, NumberField, TextField } from "@components/form";
import {
  FieldConfigPositionInfo,
  useFormConfigContext,
} from "@containers/editor/context";
import { FormBody, FormWrapper } from "@layout/form";
import { FC, useMemo } from "react";
import { StringSchemaRules, TextFieldConfig } from "src/types";

type OwnProps = {
  fieldConfigPosition: FieldConfigPositionInfo;
  fieldConfig: TextFieldConfig;
};

type Props = OwnProps;

const TextFieldConfigurationForm: FC<Props> = ({
  fieldConfigPosition,
  fieldConfig,
}) => {
  const { updateField, updateFieldSchema } = useFormConfigContext();

  const onUpdateField = (field: keyof TextFieldConfig, value: string) => {
    updateField<TextFieldConfig>(field, value, fieldConfigPosition);
  };

  const onUpdateFieldSchema = (
    field: keyof StringSchemaRules,
    value: string | number,
    type: "value" | "errorMessage"
  ) => {
    updateFieldSchema<StringSchemaRules>(
      field,
      value,
      type,
      fieldConfigPosition
    );
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
    <Form<TextFieldConfig>
      initialValues={formInitialValues}
      onSubmit={(value) => console.log({ value })}
      enableReinitialize
      // validationSchema={validationSchema}
    >
      {({ resetForm }) => (
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
          <FormBody columns={2}>
            <NumberField
              name="schema.rules.min.value"
              label="Value"
              onChange={(event) =>
                onUpdateFieldSchema("min", +event.target.value, "value")
              }
            />
            <TextField
              name="schema.rules.min.errorMessage"
              label="Error message"
              onChange={(event) =>
                onUpdateFieldSchema("min", event.target.value, "errorMessage")
              }
            />
          </FormBody>
          <Button type="submit" size="small">
            Save
          </Button>
          {/* <Button
            variant="cancelOutline"
            type="reset"
            size="small"
            onClick={() => resetForm({ values: resetToInitialValues() })}
          >
            Reset
          </Button> */}
        </FormWrapper>
      )}
    </Form>
  );
};

const configToInitialValues = (config: TextFieldConfig): TextFieldConfig => ({
  field: "text",
  name: config.name,
  value: config.value,
  placeholder: config.placeholder ?? "",
  label: config.label ?? "",
  required: config.required ?? false,
  schema: config.schema ?? undefined,
});

export default TextFieldConfigurationForm;
