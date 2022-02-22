import Icon from "@components/icons/Icon";
import { IconType } from "@components/icons/iconList";
import classNames from "classnames";
import { FC } from "react";

type OwnProps = {
  iconLeft?: IconType;
  className?: string;
  onClick?: () => void;
};

type Props = OwnProps;

const ClickableText: FC<Props> = ({
  onClick,
  className,
  iconLeft,
  children,
}) => {
  return (
    <button
      className={classNames(
        "flex items-center justify-center w-fit",
        className
      )}
      onClick={onClick}
    >
      {!!iconLeft && <Icon icon={iconLeft} className="mr-2" />}
      {children}
    </button>
  );
};

export default ClickableText;
