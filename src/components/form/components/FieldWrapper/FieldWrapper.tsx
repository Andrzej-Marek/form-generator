import Icon from "@components/icons/Icon";
import { FC } from "react";

export type FieldActions = {
  onConfigClick?: () => void;
  onDeleteClick?: () => void;
};

type OwnProps = {
  actions?: FieldActions;
};

type Props = OwnProps;

const FieldWrapper: FC<Props> = ({ actions, children }) => {
  return (
    <div className="relative">
      {!!actions && <FieldActions actions={actions} />}
      {children}
    </div>
  );
};

const FieldActions = ({ actions }: { actions: FieldActions }) => (
  <div className="absolute left-0 -top-0.5 -translate-y-full">
    <div className="flex bg-accent py-1 px-1 rounded-md">
      <div onClick={actions.onConfigClick} className="mr-3">
        <Icon
          icon="tool"
          className="text-white cursor-pointer transition hover:scale-110"
        />
      </div>
      <div onClick={actions.onDeleteClick}>
        <Icon
          icon="bin"
          className="text-white cursor-pointer transition hover:scale-110"
        />
      </div>
    </div>
  </div>
);

export default FieldWrapper;
