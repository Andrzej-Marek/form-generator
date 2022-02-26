import classNames from "classnames";
import { FC } from "react";

interface OwnProps {
  className?: string;
  align?: "top" | "center";
}

type Props = OwnProps;

const alignConfig = {
  center: "flex flex-col justify-center",
  top: "flex flex-col",
};
const ModalContent: FC<Props> = ({ className, align = "center", children }) => {
  return (
    <div
      className={classNames(
        // "py-6 px-5 sm:p-8 bg-light w-screen md:max-w-[480px] min-h-screen md:min-h-0 h-full md:h-auto flex flex-col justify-center md:rounded-xl",
        "py-6 px-5 sm:p-8 bg-light w-screen md:max-w-[480px] min-h-screen md:min-h-0 h-full md:h-auto md:rounded-xl",
        alignConfig[align],
        className
      )}
    >
      {children}
    </div>
  );
};

export default ModalContent;
