import Button from "@components/buttons/Button";
import { Form, SelectField, TextField } from "@components/form";
import DateField from "@components/form/fields/DateField";
import { useFormConfigContext } from "@containers/editor/context";
import { FieldConfigureInfo } from "@containers/editor/context/FormTemplateContext";
import { FormBody, FormWrapper } from "@layout/form";
import { FC, useMemo } from "react";
import { DateFieldConfig, DATE_FORMATS } from "src/types";
import { NameConfigField } from "../components";

type OwnProps = {
  fieldConfigureInfo: FieldConfigureInfo;
  fieldConfig: DateFieldConfig;
};

type Props = OwnProps;

const DateConfigurationForm: FC<Props> = ({
  fieldConfigureInfo,
  fieldConfig,
}) => {
  const { index, subIndex } = fieldConfigureInfo;
  const { updateField, resetFieldToInitial } = useFormConfigContext();

  const onUpdateField = (
    field: keyof DateFieldConfig,
    value: string | Date | undefined
  ) => {
    updateField<DateFieldConfig>(field, value, index, subIndex);
  };

  const formInitialValues = useMemo(
    () => configToInitialValues(fieldConfig),
    [fieldConfig]
  );

  const resetToInitialValues = (): DateFieldConfig => {
    const initial = resetFieldToInitial(index, subIndex);

    if (initial.field !== "date") {
      throw new Error("Invalid initial");
    }

    return initial;
  };

  return (
    <Form<DateFieldConfig>
      initialValues={formInitialValues}
      onSubmit={(value) => console.log({ value })}
      enableReinitialize
      // validationSchema={validationSchema}
    >
      {({ resetForm, values }) => (
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
          <FormBody columns={2}>
            <DateField
              name="minDate"
              inputProps={{
                name: "minDate",
                label: "Min date",
                size: "small",
              }}
              dateFormat={values.dateFormat}
              onChange={(date) => onUpdateField("minDate", date)}
              maxDate={values.maxDate}
            />
            <DateField
              name="maxDate"
              inputProps={{
                name: "maxDate",
                label: "Max date",
                size: "small",
              }}
              minDate={values.minDate}
              dateFormat={values.dateFormat}
              onChange={(date) => onUpdateField("maxDate", date)}
            />
          </FormBody>
          <FormBody columns={2}>
            <SelectField
              name="dateFormat"
              label="Date format"
              size="small"
              onChange={(option) => onUpdateField("dateFormat", option.value)}
              options={DATE_FORMATS.map((el) => ({ label: el, value: el }))}
            />
          </FormBody>
          <Button type="submit" size="small">
            Save
          </Button>
          <Button
            variant="cancelOutline"
            type="reset"
            size="small"
            onClick={() => resetForm({ values: resetToInitialValues() })}
          >
            Reset
          </Button>
        </FormWrapper>
      )}
    </Form>
  );
};

const configToInitialValues = (config: DateFieldConfig): DateFieldConfig => ({
  field: "date",
  name: config.name,
  value: config.value,
  placeholder: config.placeholder ?? "",
  label: config.label ?? "",
  required: config.required ?? false,
  dateFormat: config.dateFormat,
  maxDate: config.maxDate,
  minDate: config.minDate,
  schema: config.schema ?? undefined,
});

export default DateConfigurationForm;
