import { FC } from "react";
import InputRaw, { InputProps } from "../InputRaw";
import { FieldProps } from "./fields.type";
import { useField } from "formik";
import { getFieldName } from "./helpers";
import FieldActionsWrapper from "../components/FieldActionsWrapper/FieldActionsWrapper";

interface OwnProps {}

type Props = OwnProps & FieldProps & InputProps;

const TextField: FC<Props> = ({
  name,
  className,
  actions,
  withActionWrapper,
  ...rest
}) => {
  const [field, meta] = useField<string>({
    name: getFieldName("text", name),
    type: "text",
  });

  const input = (
    <InputRaw
      {...rest}
      {...field}
      onChange={(event) => {
        field.onChange?.(event);
        rest.onChange?.(event);
      }}
      error={meta.error}
    />
  );

  if (withActionWrapper) {
    return <FieldActionsWrapper actions={actions}>{input}</FieldActionsWrapper>;
  }

  return input;
};

export default TextField;
