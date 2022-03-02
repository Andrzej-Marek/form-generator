import Icon from "@components/icons/Icon";
import classNames from "classnames";
import { FC } from "react";

export type FieldActions = {
  onConfigClick?: () => void;
  onDeleteClick?: () => void;
};

type OwnProps = {
  variant?: "field" | "layout";
  actions?: FieldActions;
};

type Props = OwnProps;

const FieldActionsWrapper: FC<Props> = ({
  actions,
  variant = "field",
  children,
}) => {
  return (
    <div className="relative">
      {!!actions && <FieldActions actions={actions} variant={variant} />}
      {children}
    </div>
  );
};

const FieldActions = ({
  actions,
  variant,
}: {
  actions: FieldActions;
  variant: OwnProps["variant"];
}) => {
  const isLayout = variant === "layout";
  const isField = variant === "field";
  return (
    <div
      className={classNames("absolute -top-0.5 -translate-y-full", {
        "left-0": isField,
        "right-0": isLayout,
      })}
    >
      <div
        className={classNames("flex bg-accent py-1 px-1 rounded-md", {
          "bg-accent": isField,
          "bg-blue-400": isLayout,
        })}
      >
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
};

export default FieldActionsWrapper;
