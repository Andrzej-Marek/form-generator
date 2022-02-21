import { FC } from "react";
import Input, { InputProps } from "../InputRaw";
import { FieldProps } from "./fields.type";
import { useField } from "formik";
import { getFieldName } from "./helpers";

interface OwnProps {}

type Props = OwnProps & FieldProps & InputProps;

const NumberField: FC<Props> = ({ name, ...rest }) => {
  const [field, meta] = useField<string>({
    name: getFieldName("number", name),
    type: "number",
  });
  return (
    <Input
      {...rest}
      {...field}
      onChange={(event) => {
        field.onChange?.(event);
        rest.onChange?.(event);
      }}
      error={meta.error}
      type="number"
    />
  );
};

export default NumberField;
