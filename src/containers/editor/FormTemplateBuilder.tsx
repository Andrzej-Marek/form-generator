import { ClickableText } from "@components/buttons";
import Button from "@components/buttons/Button";
import { Form } from "@components/form";
import { TypeController } from "@components/form/controllers";
import DateField from "@components/form/fields/DateField";
import { FormWrapper } from "@layout/form";
import { FC, Fragment, useMemo } from "react";
import { buildYupSchema } from "src/helpers/createYupSchema";
import { FieldType } from "src/types";
import { DropSpace } from "./components";
import { useFormTemplateAction, useFormTemplateState } from "./context";
import { useFormConfigContext } from "./context/formConfig/FormConfigContext";

type OwnProps = {};

type Props = OwnProps;

export type FormTemplateBuilderActions = {
  configField: (fieldType: FieldType, index: number, subIndex?: number) => void;
  configLayout: (index: number) => void;
  deleteField: (fieldType: FieldType, index: number, subIndex?: number) => void;
  deleteLayout: (index: number) => void;
};

const FormTemplateBuilder: FC<Props> = () => {
  const { config, onDrop, deleteField, deleteLayout } = useFormConfigContext();
  const { fieldConfigureInfo } = useFormTemplateState();
  const { setFieldConfigureInfo, setView } = useFormTemplateAction();

  const actions: FormTemplateBuilderActions = {
    configField: (fieldType, index, subIndex) => {
      setFieldConfigureInfo({ field: fieldType, index, subIndex });
      setView("fieldConfig");
    },
    deleteField: (_fieldType, index, subIndex) => {
      if (
        fieldConfigureInfo?.index === index &&
        fieldConfigureInfo.subIndex === subIndex
      ) {
        setFieldConfigureInfo(undefined);
        setView("list");
      }
      deleteField(index, subIndex);
    },
    configLayout: (index) => {
      setFieldConfigureInfo({ field: "layout", index });
      setView("fieldConfig");
    },

    deleteLayout: (index) => {
      setFieldConfigureInfo(undefined);
      setView("list");
      deleteLayout(index);
    },
  };

  const elements = useMemo(
    () =>
      config.map((el, index) => (
        <Fragment key={index}>
          <TypeController
            typeConfig={el}
            onDrop={onDrop}
            index={index}
            actions={actions}
          />{" "}
          {/* + 1 because we have first element outside of array */}
          <DropSpace onDrop={onDrop} index={index + 1} />
        </Fragment>
      )),
    [config]
  );

  const validationSchema = useMemo(() => buildYupSchema(config), [config]);

  if (!config.length) {
    return (
      <>
        <div className="font-heading text-center text-lg">
          Add first element :D
        </div>
        <DropSpace onDrop={onDrop} index={0} />
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
          <DropSpace onDrop={onDrop} index={0} />
          {elements}
          <Button type="submit">SUBMIT</Button>
        </FormWrapper>
      )}
    </Form>
  );
};

export default FormTemplateBuilder;
