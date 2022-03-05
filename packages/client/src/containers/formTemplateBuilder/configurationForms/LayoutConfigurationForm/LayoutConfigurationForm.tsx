import { CounterField, Form } from "@components/form";
import {
  FieldConfigPositionInfo,
  useFormConfigContext,
} from "@containers/formTemplateBuilder/context";
import { FormWrapper } from "@layout/form";
import { FC, useMemo } from "react";
import { LayoutConfig } from "src/types";

type OwnProps = {
  fieldConfigPosition: FieldConfigPositionInfo;
  layoutConfig: LayoutConfig;
};

type Props = OwnProps;

const LayoutConfigurationForm: FC<Props> = ({
  fieldConfigPosition,
  layoutConfig,
}) => {
  const { updateLayoutConfig } = useFormConfigContext();

  const onUpdateField = (field: keyof LayoutConfig, value: string | number) => {
    updateLayoutConfig(field, value, fieldConfigPosition);
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
          <CounterField
            name="columns"
            label="Columns"
            onChange={(counter) => onUpdateField("columns", counter)}
            infoTooltip="You can specify how many columns you need"
            min={1}
            max={4}
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
