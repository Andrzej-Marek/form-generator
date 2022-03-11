import classNames from "classnames";
import { FC, ReactNode } from "react";

type Variant = "danger" | "info" | "success" | "warning";

type OwnProps = {
  variant?: Variant;
  header?: ReactNode;
};

const variantsClasses: Record<Variant, string> = {
  danger: "text-red-700 bg-red-100",
  info: "text-blue-500 bg-blue-100",
  success: "text-green-700 bg-green-100",
  warning: "text-yellow-700 bg-yellow-100",
};

type Props = OwnProps;

const Alert: FC<Props> = ({ variant = "info", header, children }) => {
  return (
    <div
      className={classNames(
        "flex rounded-lg p-4 mb-4 text-sm items-center",
        variantsClasses[variant]
      )}
      role="alert"
    >
      <svg
        className="w-6 h-6 inline mr-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
      <div>
        {header && <div className="font-bold">{header}</div>}
        {children}
      </div>
    </div>
  );
};

export default Alert;
