import { FC } from "react";
import InputRaw, { InputProps } from "../InputRaw";
import { FieldProps } from "./fields.type";
import { useField } from "formik";
import { getFieldName } from "./helpers";
import FieldActionsWrapper from "../components/FieldActionsWrapper/FieldActionsWrapper";

interface OwnProps {}

type Props = OwnProps & FieldProps & InputProps;

const TextField: FC<Props> = ({ name, className, actions, ...rest }) => {
  const [field, meta] = useField<string>({
    name: getFieldName("text", name),
    type: "text",
  });

  return (
    <FieldActionsWrapper actions={actions}>
      <InputRaw
        {...rest}
        {...field}
        onChange={(event) => {
          field.onChange?.(event);
          rest.onChange?.(event);
        }}
        error={meta.error}
      />
    </FieldActionsWrapper>
  );
};

export default TextField;
