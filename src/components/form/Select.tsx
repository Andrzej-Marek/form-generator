import cn from "classnames";
import React, { FC, useMemo } from "react";
import ReactSelect, {
  components,
  GroupBase,
  InputProps,
  StylesConfig,
} from "react-select";
import { SelectOption } from "src/types/selectOption";

export interface SelectProps {
  className?: string;
  inputClassName?: string;
  label?: string;
  name: string;
  error?: string;
  size?: "small" | "medium" | "big";
  disabled?: boolean;
  onChange?: (selectedOption: SelectOption) => void;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
}

const sizeClasses = {
  small: "text-sm h-[30px]",
  medium: "h-[38px]",
  big: "h-[46px]",
};

const Input = ({ size, ...props }: InputProps & Pick<SelectProps, "size">) => (
  <components.Input {...props} className={cn(sizeClasses[size!])} />
);

const customStyles: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
  option: (provided) => ({
    ...provided,
    fontSize: "0.875rem",
  }),
  control: (base) => ({
    ...base,
    border: "1px solid #d1d5db",
    "&:hover": {
      border: "1px solid #d1d5db",
    },
    boxShadow: "none",
    paddingLeft: "8px",
  }),
  singleValue: (provided) => {
    return { ...provided, fontSize: "0.875rem" };
  },
  placeholder: (provided) => ({
    ...provided,
    fontSize: "0.875rem",
    color: "#9ca3af",
  }),
};

const Select: FC<SelectProps> = ({
  className,
  label,
  name,
  size = "medium",
  disabled = false,
  onChange,
  options,
  error,
  value,
  ...rest
}) => {
  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className={cn(
            "block text-body-dark font-semibold text-sm leading-none mb-3 text-left",
            !!error && "text-red-500"
          )}
        >
          {label}
        </label>
      )}
      <ReactSelect
        styles={customStyles}
        options={options}
        isDisabled={disabled}
        value={selectedOption}
        // @ts-ignore
        onChange={(event: SelectOption) => onChange?.(event)}
        components={{
          Input: (props: InputProps) => <Input size={size} {...props} />,
        }}
        placeholder="Wybierz"
        {...rest}
      />
      {error && <p className="my-2 text-xs text-red-500 ">{error}</p>}
    </div>
  );
};

Select.displayName = "Select";
export default Select;
