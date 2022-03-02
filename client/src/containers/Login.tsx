import { CounterField, Form } from "@components/form";
import { FormWrapper } from "src/layout/form";
import { FC } from "react";
import Button from "@components/buttons/Button";

type OwnProps = {};

type Props = OwnProps;

const Login: FC<Props> = () => {
  return (
    <Form
      initialValues={{ checkbox: [], selectEnvironment: "local", counter: 0 }}
      onSubmit={(value) => console.log({ value })}
    >
      {() => (
        <FormWrapper>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>HELLO</div>
            <div>HELLO</div>
            <div>HELLO</div>
          </div>
          <CounterField name="counter" min={0} max={5} />
          <Button type="submit">SUBMIT</Button>
        </FormWrapper>
      )}
    </Form>
  );
};

export default Login;
