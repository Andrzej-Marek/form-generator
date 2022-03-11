import { Form } from "@components/form";
import SectionController from "@components/form/controllers/SectionController";
import { FormTemplateLoader } from "@components/loaders";
import { FormWrapper } from "@layout/form";
import { FormTemplate } from "@package/common";
import { FC, useEffect, useMemo } from "react";
import { buildYupSchema } from "src/helpers/createYupSchema";
import { useRouterParams } from "src/hooks/router";
import { FieldConfigPosition, FieldType } from "src/types";
import { useFormTemplateAction, useFormTemplateState } from "./context";
import { useFormConfigContext } from "./context/formConfig/FormConfigContext";
import Router from "next/router";
import { formTemplateRoutes } from "src/routes";

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
  const { formTemplateId } = useRouterParams<{ formTemplateId: string }>();
  const {
    config,
    onDrop,
    onSectionDrop,
    deleteField,
    deleteLayout,
    isFetchingFormTemplate,
    formTemplate,
  } = useFormConfigContext();
  const { fieldConfigPosition } = useFormTemplateState();
  const { setFieldConfigPosition, setView, setSectionConfigPosition } =
    useFormTemplateAction();

  useEffect(() => {
    // After draft is saved redirect to template builder
    if (!formTemplateId && formTemplate?.id) {
      Router.push(formTemplateRoutes.template(formTemplate.id));
    }
  }, [formTemplateId, formTemplate]);

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

  if (isFetchingFormTemplate) {
    return <FormTemplateLoader />;
  }

  return (
    <Form
      initialValues={{}}
      onSubmit={(value) => console.log({ value })}
      validationSchema={validationSchema}
    >
      <FormWrapper>{sections}</FormWrapper>
    </Form>
  );
};

export default FormTemplateBuilder;
