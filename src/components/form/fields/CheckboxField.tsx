import { FC } from "react";
import { FieldProps } from "./fields.type";
import { useField } from "formik";
import Checkbox, { CheckboxProps } from "../Checkbox";

interface OwnProps {}

type Props = OwnProps & FieldProps & CheckboxProps;

const CheckboxField: FC<Props> = ({ name, value, ...rest }) => {
  const [field, meta] = useField<string[]>({ name, type: "checkbox" });
  return (
    <Checkbox
      {...field}
      {...rest}
      value={value}
      checked={field.value.includes(value)}
      error={meta.error}
    />
  );
};

export default CheckboxField;