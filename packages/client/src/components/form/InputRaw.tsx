import cn from "classnames";
import React, { InputHTMLAttributes, ReactNode } from "react";
import FieldLabel from "./components/FieldLabel/FieldLabel";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  className?: string;
  inputClassName?: string;
  label?: string;
  name: string;
  error?: string;
  type?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline" | "line";
  size?: "small" | "medium" | "big";
  infoTooltip?: ReactNode;
}

const variantClasses = {
  normal:
    "bg-gray-100 border border-border-base rounded focus:shadow focus:bg-light focus:border-accent",
  solid:
    "bg-gray-100 border border-border-100 rounded focus:bg-light focus:border-accent",
  outline: "border border-border-base rounded focus:border-accent",
  line: "ps-0 border-b border-border-base rounded-none focus:border-accent",
};

const sizeClasses = {
  small: "text-sm h-10",
  medium: "h-12",
  big: "h-14",
};

const InputRaw = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      name,
      error,
      children,
      variant = "outline",
      size = "medium",
      shadow = false,
      disabled = false,
      type = "text",
      inputClassName,
      infoTooltip,
      ...rest
    },
    ref
  ) => {
    return (
      <>
        <div>
          {label && (
            <FieldLabel
              label={label}
              isError={!!error}
              htmlFor={name}
              infoTooltip={infoTooltip}
            />
          )}
          <input
            id={name}
            name={name}
            type={type}
            ref={ref}
            className={cn(
              "px-4 flex items-center w-full appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0",
              shadow && "focus:shadow",
              variantClasses[variant],
              sizeClasses[size],
              disabled && "bg-gray-100 cursor-not-allowed",
              inputClassName,
              !!error && "border-red-500"
            )}
            disabled={disabled}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-invalid={error ? "true" : "false"}
            {...rest}
            value={typeof rest.value === "undefined" ? "" : rest.value}
          />
          {error && <p className="my-2 text-xs text-red-500 ">{error}</p>}
        </div>
      </>
    );
  }
);
InputRaw.displayName = "Input";
export default InputRaw;
