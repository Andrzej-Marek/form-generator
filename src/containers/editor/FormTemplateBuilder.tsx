import Button from "@components/buttons/Button";
import { Form } from "@components/form";
import { TypeController } from "@components/form/controllers";
import { FormWrapper } from "@layout/form";
import { FC, Fragment, useMemo } from "react";
import { buildYupSchema } from "src/helpers/createYupSchema";
import { FieldConfigPosition, FieldType } from "src/types";
import { DropSpace } from "./components";
import { useFormTemplateAction, useFormTemplateState } from "./context";
import { useFormConfigContext } from "./context/formConfig/FormConfigContext";

type OwnProps = {};

type Props = OwnProps;

export type FormTemplateBuilderActions = {
  configField: (fieldType: FieldType, position: FieldConfigPosition) => void;
  configLayout: (position: FieldConfigPosition) => void;
  deleteField: (fieldType: FieldType, position: FieldConfigPosition) => void;
  deleteLayout: (position: FieldConfigPosition) => void;
};

const FormTemplateBuilder: FC<Props> = () => {
  const { config, onDrop, deleteField, deleteLayout } = useFormConfigContext();
  const { fieldConfigPosition } = useFormTemplateState();
  const { setFieldConfigPosition, setView } = useFormTemplateAction();

  // Action to left configure panel
  const actions: FormTemplateBuilderActions = {
    configField: (fieldType, position) => {
      setFieldConfigPosition({ ...position, field: fieldType });
      setView("fieldConfig");
    },
    deleteField: (_fieldType, position) => {
      if (
        fieldConfigPosition?.configIndex === position.configIndex &&
        fieldConfigPosition.layoutConfigIndex === position.layoutConfigIndex
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

    deleteLayout: (position) => {
      setFieldConfigPosition(undefined);
      setView("list");
      deleteLayout(position);
    },
  };

  const elements = useMemo(
    () =>
      config.map((section, sectionIndex) =>
        section.config.map((el, index) => (
          <Fragment key={index}>
            <TypeController
              typeConfig={el}
              onDrop={onDrop}
              position={{ configIndex: index, sectionIndex }}
              actions={actions}
            />{" "}
            {/* + 1 because we have first element outside of array */}
            <DropSpace
              onDrop={onDrop}
              position={{ configIndex: index + 1, sectionIndex }}
            />
          </Fragment>
        ))
      ),
    [config]
  );

  const validationSchema = useMemo(() => buildYupSchema(config), [config]);

  if (!config[0].config.length) {
    return (
      <>
        <div className="font-heading text-center text-lg">
          Add first element :D
        </div>
        <DropSpace
          onDrop={onDrop}
          position={{ sectionIndex: 0, configIndex: 0 }}
        />
      </>
    );
  }
  return (
    <Form
      initialValues={{ checkbox: [], selectEnvironment: "local" }}
      onSubmit={(value) => console.log({ value })}
      validationSchema={validationSchema}
    >
      {({ errors }) => (
        <FormWrapper>
          {/* // TODO: Map content to render multi sections */}
          <DropSpace
            onDrop={onDrop}
            position={{ sectionIndex: 0, configIndex: 0 }}
          />
          {elements}
          <Button type="submit">SUBMIT</Button>
        </FormWrapper>
      )}
    </Form>
  );
};

export default FormTemplateBuilder;
