import { Form } from "@components/form";
import { FormWrapper } from "src/layout/form";
import { FC, useMemo } from "react";
import { FormConfig } from "src/types/form";
import { buildYupSchema } from "src/helpers/createYupSchema";
import Button from "@components/buttons/Button";
import { FormConfigController } from "@components/form/controllers";

type OwnProps = {};

type Props = OwnProps;

const config: FormConfig = [
  // {
  //   type: "layout",
  //   columns: 2,
  //   config: [
  //     {
  //       type: "field",
  //       field: "text",
  //       name: "validation",
  //       value: "",
  //       label: "validation",
  //       placeholder: "validation",
  //       schema: {
  //         type: "string",
  //         rules: {
  //           max: {
  //             value: 5,
  //             errorMessage: "Wartość przekracza maksymalną wartość",
  //           },
  //           min: {
  //             value: 2,
  //             errorMessage: "Podaj więcej niz 2 znaki",
  //           },
  //           required: {
  //             value: true,
  //             errorMessage: "Pole wymagane",
  //           },
  //         },
  //       },
  //       // required: true,
  //     },
  //     {
  //       type: "field",
  //       field: "text",
  //       name: "test",
  //       value: "",
  //       label: "nested",
  //       placeholder: "placeholder",
  //       // required: true,
  //     },
  //   ],
  // },
  // TODO: Text field
  // {
  //   type: "field",
  //   field: "textArea",
  //   value: "",
  //   name: "textArea",
  //   label: "Text area",
  //   height: 400,
  // },
  // {
  //   type: "layout",
  //   columns: 3,
  //   config: [
  //     {
  //       type: "field",
  //       field: "select",
  //       value: "",
  //       name: "Select",
  //       label: "Select",
  //       placeholder: "Please select something",
  //       required: true,
  //       options: [
  //         { label: "Yes", value: "true" },
  //         { label: "No", value: "false" },
  //       ],
  //     },
  //     {
  //       type: "field",
  //       field: "select",
  //       value: "local",
  //       name: "selectEnvironment",
  //       label: "Environment",
  //       placeholder: "Please select environment",
  //       required: true,
  //       options: [
  //         { label: "PROD", value: "prod" },
  //         { label: "DEV", value: "dev" },
  //         { label: "LOCAL", value: "local" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   type: "field",
  //   field: "text",
  //   value: "",
  //   name: "name",
  //   label: "LABEL HERE",
  //   placeholder: "placeholder",
  //   required: true,
  // },
  {
    type: "field",
    field: "text",
    value: "",
    name: "numberField",
    label: "Text field",
    placeholder: "Please insert your number value",
    // required: true,
    // schema: {
    //   type: "number",
    //   rules: {
    //     min: {
    //       value: 100,
    //     },
    //   },
    // },
  },
  // {
  //   type: "field",
  //   field: "checkbox",
  //   value: "test",
  //   name: "checkbox",
  //   label: "checkbox field",
  //   required: true,
  // },
  // {
  //   type: "field",
  //   field: "password",
  //   value: "",
  //   name: "password",
  //   label: "Password",
  //   placeholder: "Please use secure password",
  //   required: true,
  // },
];

const Login: FC<Props> = () => {
  return (
    <Form
      initialValues={{ checkbox: [], selectEnvironment: "local" }}
      onSubmit={(value) => console.log({ value })}
    >
      {({ errors }) => (
        <FormWrapper>
          {console.log("errors", errors)}
          <FormConfigController config={config} />
          <div className="grid gap-4 lg:grid-cols-2">
            <div>HELLO</div>
            <div>HELLO</div>
            <div>HELLO</div>
          </div>
          <Button type="submit">SUBMIT</Button>
        </FormWrapper>
      )}
    </Form>
  );
};

export default Login;
