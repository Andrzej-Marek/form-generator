import { FC } from "react";
import { FieldProps } from "./fields.type";
import { useField } from "formik";
import Select, { SelectProps } from "../Select";
import { SelectOption } from "src/types/selectOption";
import { getFieldName } from "./helpers";

interface OwnProps {}

type Props = OwnProps & FieldProps & SelectProps;

const SelectField: FC<Props> = ({ name, ...rest }) => {
  const [field, meta, { setValue }] = useField<string>({
    name: getFieldName("select", name),
    type: "text",
  });

  const onChange = (selected: SelectOption) => {
    setValue(selected.value);
    rest.onChange?.(selected);
  };

  return <Select {...rest} {...field} error={meta.error} onChange={onChange} />;
};

export default SelectField;
