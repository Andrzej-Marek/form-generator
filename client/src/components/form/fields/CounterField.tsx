import { FC } from "react";
import { FieldProps } from "./fields.type";
import { useField } from "formik";
import FieldActionsWrapper from "../components/FieldActionsWrapper/FieldActionsWrapper";
import Counter, { CounterProps } from "../Counter";

interface OwnProps {}

type Props = OwnProps &
  FieldProps &
  Pick<CounterProps, "max" | "min" | "label" | "onChange" | "infoTooltip">;

const CounterField: FC<Props> = ({ name, actions, ...counterProps }) => {
  const [field, meta, { setValue }] = useField<number>({
    name,
    type: "number",
  });

  const onChangeHandler = (counter: number) => {
    setValue(counter);
    counterProps.onChange?.(counter);
  };

  return (
    <FieldActionsWrapper actions={actions}>
      <Counter
        {...counterProps}
        counter={field.value}
        onChange={onChangeHandler}
        error={meta.error}
      />
    </FieldActionsWrapper>
  );
};

export default CounterField;
