import classNames from "classnames";
import { FC, ReactNode } from "react";

type CommonProps = {
  className?: string;
};

type FormSideProps = {
  label: ReactNode;
} & CommonProps;

export const FormWrapper: FC<CommonProps> = ({ className, children }) => {
  return (
    <div className={classNames("grid gap-6 md:gap-6 lg:gap-6", className)}>
      {children}
    </div>
  );
};

export const FormSide: FC<FormSideProps> = ({ className, label, children }) => {
  return (
    <div
      className={classNames(
        "grid grid-cols-1 gap-0 md:grid-cols-sideFormMd md:gap-6 lg:grid-cols-sideFormLd lg:gap-10 xl:gap-14",
        className
      )}
    >
      <div className="mb-4 text-lg md:text-base md:mb-0">{label}</div>
      <div className="grid gap-4 grid-cols-1">{children}</div>
    </div>
  );
};

export const FormAutoBody: FC<CommonProps> = ({ className, children }) => {
  const columns = Array.isArray(children) ? children.length : 1;

  return (
    <div
      className={classNames("grid gap-4", `lg:grid-cols-${columns}`, className)}
    >
      {children}
    </div>
  );
};

export const FormBody: FC<CommonProps & { columns: number }> = ({
  className,
  columns,
  children,
}) => {
  return (
    <div
      className={classNames(
        "grid gap-4",
        `lg:grid-cols-${columns} items-end`,
        className
      )}
    >
      {children}
    </div>
  );
};
