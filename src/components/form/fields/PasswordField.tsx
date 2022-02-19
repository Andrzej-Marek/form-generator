import { FC } from "react";
import Input, { InputProps } from "../InputRaw";
import { FieldProps } from "./fields.type";
import { useField } from "formik";
import PasswordInput from "../PasswordInput";
import { getFieldName } from "./helpers";

interface OwnProps {}

type Props = OwnProps & FieldProps & InputProps;

const PasswordField: FC<Props> = ({ name, ...rest }) => {
  const [field, meta] = useField<string>({
    name: getFieldName("password", name),
    type: "password",
  });
  return <PasswordInput {...rest} {...field} error={meta.error} />;
};

export default PasswordField;
