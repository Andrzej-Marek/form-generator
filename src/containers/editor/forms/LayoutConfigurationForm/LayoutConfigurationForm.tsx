import { Form, NumberField } from "@components/form";
import { useFormConfigContext } from "@containers/editor/context";
import { FieldConfigureInfo } from "@containers/editor/context/FormTemplateContext";
import { FormWrapper } from "@layout/form";
import { FC, useMemo } from "react";
import { LayoutConfig } from "src/types";

type OwnProps = {
  fieldConfigureInfo: FieldConfigureInfo;
  layoutConfig: LayoutConfig;
};

type Props = OwnProps;

const LayoutConfigurationForm: FC<Props> = ({
  fieldConfigureInfo,
  layoutConfig,
}) => {
  const { index } = fieldConfigureInfo;
  const { updateLayoutConfig } = useFormConfigContext();

  const onUpdateField = (field: keyof LayoutConfig, value: string) => {
    updateLayoutConfig(field, value, index);
  };

  const formInitialValues = useMemo(
    () => configToInitialValues(layoutConfig),
    [layoutConfig]
  );

  //   const resetToInitialValues = (): LayoutConfig => {
  //     const initial = resetFieldToInitial(index, subIndex);

  //     if (initial.field !== "text") {
  //       throw new Error("Invalid initial");
  //     }

  //     return initial;
  //   };

  return (
    <Form<LayoutConfig>
      initialValues={formInitialValues}
      onSubmit={(value) => console.log({ value })}
      enableReinitialize
      // validationSchema={validationSchema}
    >
      {({ resetForm }) => (
        <FormWrapper>
          {/* //TODO: MAKE STEP FIELD INSTEAD OF NUMBER */}
          <NumberField
            name="columns"
            label="Columns"
            size="small"
            placeholder="Please insert a columns number"
            onChange={(event) => onUpdateField("columns", event.target.value)}
          />

          <button type="submit">SAVE</button>
          {/* <button
            type="reset"
            onClick={() => resetForm({ values: resetToInitialValues() })}
          >
            RESET
          </button> */}
        </FormWrapper>
      )}
    </Form>
  );
};

const configToInitialValues = (config: LayoutConfig): LayoutConfig => ({
  columns: config.columns,
  type: "layout",
  config: config.config,
});

export default LayoutConfigurationForm;
