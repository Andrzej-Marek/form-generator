import { Formik, FormikConfig } from "formik";
import { FC, PropsWithChildren } from "react";

type Props<Model> = FormikConfig<Model> & { className?: string };

const Form = <Model,>({
  className,
  children,
  ...formikProps
}: PropsWithChildren<Props<Model>>): JSX.Element => {
  return (
    <Formik<Model> {...formikProps}>
      {(formProps) => (
        <form onSubmit={formProps.handleSubmit} className={className}>
          {typeof children === "function" ? children(formProps) : children}
        </form>
      )}
    </Formik>
  );
};

export default Form;
