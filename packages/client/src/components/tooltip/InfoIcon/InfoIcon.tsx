import Icon from "@components/icons/Icon";
import { FC, ReactNode } from "react";
import { Tooltip } from "..";

type OwnProps = {
  content: ReactNode;
  className?: string;
};

type Props = OwnProps;

const InfoIcon: FC<Props> = ({ content, className }) => {
  return (
    <Tooltip content={content}>
      <Icon icon="infoCircle" className={className} />
    </Tooltip>
  );
};

export default InfoIcon;
