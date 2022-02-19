import { FC } from "react";
import InputRaw, { InputProps } from "../InputRaw";
import { FieldProps } from "./fields.type";
import { useField } from "formik";
import { getFieldName } from "./helpers";

interface OwnProps {}

type Props = OwnProps & FieldProps & InputProps;

const TextField: FC<Props> = ({ name, ...rest }) => {
  const [field, meta] = useField<string>({
    name: getFieldName("text", name),
    type: "text",
  });
  return (
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
};

export default TextField;
