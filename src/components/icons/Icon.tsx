import { FC } from "react";
import { iconList, IconType } from "./iconList";

type OwnProps = {
  icon: IconType;
  className?: string;
};

type Props = OwnProps;

const Icon: FC<Props> = ({ className, icon }) => {
  const Icon = iconList[icon];
  return <Icon className={className} />;
};

export default Icon;
