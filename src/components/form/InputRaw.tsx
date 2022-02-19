import Icon from "@components/icons/Icon";
import classNames from "classnames";
import cn from "classnames";
import { FormikConfig } from "formik";
import React, { InputHTMLAttributes } from "react";

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
  onConfigClick?: () => void;
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
      onConfigClick,
      ...rest
    },
    ref
  ) => {
    return (
      <>
        <div className={classNames("relative", className)}>
          {!!onConfigClick && (
            <div className="absolute left-0 -top-0.5 -translate-y-full">
              <div className="flex bg-accent py-1 px-1 rounded-md">
                <div onClick={onConfigClick}>
                  <Icon
                    icon="tool"
                    className="text-white cursor-pointer transition hover:scale-110"
                  />
                </div>
              </div>
            </div>
          )}
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
