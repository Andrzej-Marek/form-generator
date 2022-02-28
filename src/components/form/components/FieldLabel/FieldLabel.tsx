import { InfoIcon, Tooltip } from "@components/tooltip";
import classNames from "classnames";
import { FC, ReactNode } from "react";

type OwnProps = {
  label: ReactNode;
  htmlFor?: string;
  isError?: boolean;
  infoTooltip?: ReactNode;
};

type Props = OwnProps;

const FieldLabel: FC<Props> = ({ label, htmlFor, isError, infoTooltip }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames(
        "text-body-dark font-semibold text-sm leading-none mb-3 text-left flex items-center",
        isError && "text-form-error"
      )}
    >
      <span>{label}</span>
      {infoTooltip && <InfoIcon content={infoTooltip} className="ml-2" />}
    </label>
  );
};

export default FieldLabel;
