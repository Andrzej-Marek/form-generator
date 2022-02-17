import React, { InputHTMLAttributes } from "react";
import Input, { InputProps } from "./InputRaw";

export type Props = InputHTMLAttributes<HTMLInputElement> & InputProps;

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  ({ ...rest }, ref) => {
    return <Input {...rest} type="password" ref={ref} />;
  }
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
