import { FC } from "react";
import InputRaw, { InputProps } from "../InputRaw";
import { FieldProps } from "./fields.type";
import { useField } from "formik";

interface OwnProps {}

type Props = OwnProps & FieldProps & InputProps;

const TextField: FC<Props> = ({ name, ...rest }) => {
  const [field, meta] = useField<string>({ name, type: "text" });
  return <InputRaw {...rest} {...field} error={meta.error} />;
};

export default TextField;
