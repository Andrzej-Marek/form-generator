import classNames from "classnames";
import cn from "classnames";
import React, { FC, InputHTMLAttributes } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  name: string;
  value: string;
  error?: string;
  type?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline" | "line";
  dimension?: "small" | "medium" | "big";
}

const variantClasses = {
  normal:
    "bg-gray-100 border border-border-base rounded focus:shadow focus:bg-light ",
  solid: "bg-gray-100 border border-border-100 rounded focus:bg-light ",
  outline: "border border-border-base rounded ",
  line: "ps-0 border-b border-border-base rounded-none ",
};

const sizeClasses = {
  small: "text-sm h-10",
  medium: "h-5 w-5",
  big: "h-14",
};

const Checkbox: FC<CheckboxProps> = ({
  className,
  label,
  name,
  error,
  children,
  variant = "outline",
  dimension = "medium",
  shadow = false,
  disabled = false,
  value,
  inputClassName,
  ...rest
}) => {
  return (
    <div className={classNames("inline-flex content-center ", className)}>
      <input
        id={label}
        name={name}
        type="checkbox"
        className={cn(
          "form-checkbox appearance-none transition duration-300 ease-in-out ",
          "checked:border-accent checked:bg-accent  cursor-pointer",
          shadow && "focus:shadow",
          variantClasses[variant],
          sizeClasses[dimension],
          disabled && "bg-gray-100 cursor-not-allowed",
          !!error && "border-red-500",
          inputClassName
        )}
        disabled={disabled}
        aria-invalid={error ? "true" : "false"}
        {...rest}
        value={value}
      />
      {label && (
        <label
          htmlFor={label}
          className={cn(
            "block text-sm leading-relaxed ml-2  cursor-pointer",
            !!error && "text-red-500"
          )}
        >
          {label}
        </label>
      )}
      {error && <p className="my-2 text-xs text-red-500 ">{error}</p>}
    </div>
  );
};
Checkbox.displayName = "Checkbox";
export default Checkbox;
