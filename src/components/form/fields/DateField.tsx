import { useField } from "formik";
import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateFormat } from "src/types/date";
import FieldActionsWrapper from "../components/FieldActionsWrapper/FieldActionsWrapper";
import InputRaw, { InputProps } from "../InputRaw";
import { FieldProps } from "./fields.type";
import { getFieldName } from "./helpers";

type OwnProps = {
  inputProps?: InputProps;
  onChange?: (date: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: DateFormat;
};

type Props = OwnProps & FieldProps;

const DateField: FC<Props> = ({
  name,
  inputProps,
  actions,
  onChange,
  maxDate,
  minDate,
  dateFormat,
}) => {
  const [field, meta, { setValue }] = useField<Date | undefined>({
    name: getFieldName("date", name),
    type: "date",
  });

  return (
    <FieldActionsWrapper actions={actions}>
      <DatePicker
        selected={field.value}
        dateFormat={dateFormat}
        onChange={(date) => {
          const value = date || undefined;
          setValue(value);
          onChange?.(value);
        }}
        customInput={
          <InputRaw name={name} {...inputProps} error={meta.error} />
        }
        placeholderText={inputProps?.placeholder}
        minDate={minDate}
        maxDate={maxDate}
      />
    </FieldActionsWrapper>
  );
};

export default DateField;
