import classNames from "classnames";
import { Switch as HeadlessSwitch } from "@headlessui/react";
import { FC, ReactNode } from "react";

export type SwitchProps = {
  label?: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

type Props = SwitchProps;

const Switch: FC<Props> = ({ checked, label, onChange }) => {
  return (
    <HeadlessSwitch.Group>
      <div className="flex items-center">
        <HeadlessSwitch
          checked={checked}
          onChange={onChange}
          className={classNames(
            "relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-600",
            { "bg-accent": checked },
            { "bg-gray-300": !checked }
          )}
        >
          <span
            className={classNames(
              "inline-block w-4 h-4 transform bg-white rounded-full transition-transform",
              { "translate-x-6": checked },
              { "translate-x-1": !checked }
            )}
          />
        </HeadlessSwitch>
        {label && (
          <HeadlessSwitch.Label className="ml-4">{label}</HeadlessSwitch.Label>
        )}
      </div>
    </HeadlessSwitch.Group>
  );
};

export default Switch;
