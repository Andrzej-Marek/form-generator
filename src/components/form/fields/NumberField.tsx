import { FC } from "react";
import Input, { InputProps } from "../InputRaw";
import { FieldProps } from "./fields.type";
import { useField } from "formik";

interface OwnProps {}

type Props = OwnProps & FieldProps & InputProps;

const NumberField: FC<Props> = ({ name, ...rest }) => {
  const [field, meta] = useField<string>({ name, type: "number" });
  return <Input {...rest} {...field} error={meta.error} type="number" />;
};

export default NumberField;
