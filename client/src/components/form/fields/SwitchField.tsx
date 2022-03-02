import { FC } from "react";
import { FieldProps } from "./fields.type";
import { useField } from "formik";
import { getFieldName } from "./helpers";
import FieldActionsWrapper from "../components/FieldActionsWrapper/FieldActionsWrapper";
import Switch, { SwitchProps } from "../Switch";

interface OwnProps {}

type Props = OwnProps & FieldProps & Partial<SwitchProps>;

const SwitchField: FC<Props> = ({ name, actions, ...rest }) => {
  const [field, meta, { setValue }] = useField<boolean>({
    name: getFieldName("switch", name),
    type: "checkbox",
  });

  return (
    <FieldActionsWrapper actions={actions}>
      <Switch
        {...rest}
        {...field}
        {...meta}
        checked={field.value}
        onChange={(checked) => {
          setValue?.(checked);
          rest.onChange?.(checked);
        }}
        // error={meta.error}
      />
    </FieldActionsWrapper>
  );
};

export default SwitchField;
