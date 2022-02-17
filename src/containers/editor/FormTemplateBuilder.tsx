import { Form } from "@components/form";
import { TypeController } from "@components/form/controllers";
import { FormWrapper } from "@layout/form";
import { FC, Fragment, useMemo, useState } from "react";
import { buildYupSchema } from "src/helpers/createYupSchema";
import { DropSpace } from "./components";
import { useDropContext } from "./hooks/useDropContext";

type OwnProps = {};

type Props = OwnProps;

const FormTemplateBuilder: FC<Props> = () => {
  const [config, onDrop] = useDropContext();

  const elements = useMemo(
    () =>
      config.map((el, index) => (
        <Fragment key={index}>
          <TypeController typeConfig={el} onDrop={onDrop} index={index} />{" "}
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
        </FormWrapper>
      )}
    </Form>
  );
};

export default FormTemplateBuilder;
