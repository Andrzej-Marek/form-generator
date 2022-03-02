import { Form } from "@components/form";
import SectionController from "@components/form/controllers/SectionController";
import { FormWrapper } from "@layout/form";
import { FC, useMemo } from "react";
import { buildYupSchema } from "src/helpers/createYupSchema";
import { FieldConfigPosition, FieldType } from "src/types";
import { useFormTemplateAction, useFormTemplateState } from "./context";
import { useFormConfigContext } from "./context/formConfig/FormConfigContext";

type OwnProps = {};

type Props = OwnProps;

export type FormTemplateBuilderActions = {
  configField: (fieldType: FieldType, position: FieldConfigPosition) => void;
  configLayout: (position: FieldConfigPosition) => void;
  configSection: (sectionIndex: number) => void;
  deleteField: (fieldType: FieldType, position: FieldConfigPosition) => void;
  deleteLayout: (position: FieldConfigPosition) => void;
};

const FormTemplateBuilder: FC<Props> = () => {
  const { config, onDrop, onSectionDrop, deleteField, deleteLayout } =
    useFormConfigContext();
  const { fieldConfigPosition } = useFormTemplateState();
  const { setFieldConfigPosition, setView, setSectionConfigPosition } =
    useFormTemplateAction();

  // Action to left configure panel
  const actions: FormTemplateBuilderActions = {
    configField: (fieldType, position) => {
      setFieldConfigPosition({ ...position, field: fieldType });
      setView("fieldConfig");
    },
    deleteField: (_fieldType, position) => {
      if (
        !fieldConfigPosition ||
        (fieldConfigPosition?.configIndex === position.configIndex &&
          fieldConfigPosition?.layoutConfigIndex === position.layoutConfigIndex)
      ) {
        setFieldConfigPosition(undefined);
        setView("list");
      }
      deleteField(position);
    },
    configLayout: (position) => {
      setFieldConfigPosition({ field: "layout", ...position });
      setView("fieldConfig");
    },
    configSection: (sectionIndex) => {
      setSectionConfigPosition(sectionIndex);
      setView("fieldConfig");
    },
    deleteLayout: (position) => {
      setFieldConfigPosition(undefined);
      setView("list");
      deleteLayout(position);
    },
  };

  const validationSchema = useMemo(() => buildYupSchema(config), [config]);

  const sections = useMemo(() => {
    return config.map((section, sectionIndex) => (
      <SectionController
        key={sectionIndex}
        actions={actions}
        config={section}
        onDrop={onDrop}
        onSectionDrop={onSectionDrop}
        sectionIndex={sectionIndex}
      />
    ));
  }, [config]);

  return (
    <Form
      initialValues={{ checkbox: [], selectEnvironment: "local" }}
      onSubmit={(value) => console.log({ value })}
      validationSchema={validationSchema}
    >
      {() => <FormWrapper>{sections}</FormWrapper>}
    </Form>
  );
};

export default FormTemplateBuilder;
