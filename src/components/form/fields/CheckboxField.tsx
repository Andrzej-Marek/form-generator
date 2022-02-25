import { FC } from "react";
import { FieldProps } from "./fields.type";
import { useField } from "formik";
import Checkbox, { CheckboxProps } from "../Checkbox";
import { getFieldName } from "./helpers";

interface OwnProps {}

type Props = OwnProps & FieldProps & CheckboxProps;

const CheckboxField: FC<Props> = ({ name, ...rest }) => {
  const [field, meta] = useField<boolean>({
    name: getFieldName("checkbox", name),
    type: "checkbox",
  });
  return (
    <Checkbox {...field} {...rest} checked={field.checked} error={meta.error} />
  );
};

export default CheckboxField;
