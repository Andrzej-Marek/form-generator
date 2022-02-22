import { FC, ReactNode } from "react";
import { FieldProps } from "./fields.type";
import { useField } from "formik";
import Checkbox, { CheckboxProps } from "../Checkbox";
import { SelectOption } from "src/types/selectOption";
import classNames from "classnames";
import { getFieldName } from "./helpers";
import FieldLabel from "../components/FieldLabel/FieldLabel";

interface OwnProps {
  options: SelectOption[];
  label?: ReactNode;
  className?: string;
}

type Props = OwnProps & FieldProps & Omit<CheckboxProps, "value">;

const CheckboxGroupField: FC<Props> = ({
  name,
  options,
  className,
  label,
  ...rest
}) => {
  const [field] = useField<string[]>({
    name: getFieldName("checkbox", name),
    type: "checkbox",
  });

  const checkboxes = options.map((option) => (
    <Checkbox
      {...field}
      {...rest}
      value={option.value}
      label={option.label as string}
      checked={field.value?.includes(option.value) || false}
    />
  ));

  return (
    <div>
      <FieldLabel label={label} />
      <div
        className={classNames(
          "flex flex-col md:flex-row flex-wrap gap-6 justify-start",
          className
        )}
      >
        {checkboxes}
      </div>
    </div>
  );
};

export default CheckboxGroupField;
