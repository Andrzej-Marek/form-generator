import classNames from "classnames";
import { FC, ReactNode } from "react";

type OwnProps = {
  name?: string;
  error?: string;
  label: ReactNode;
};

type Props = OwnProps;

const FieldLabel: FC<Props> = ({ name, error, label }) => {
  return (
    <label
      htmlFor={name}
      className={classNames(
        "block text-body-dark font-semibold text-sm leading-none mb-3 text-left",
        !!error && "text-red-500"
      )}
    >
      {label}
    </label>
  );
};

export default FieldLabel;
