import classNames from "classnames";
import { Switch as HeadlessSwitch } from "@headlessui/react";
import { FC, ReactNode } from "react";
import FieldLabel from "./components/FieldLabel/FieldLabel";

export type SwitchProps = {
  label?: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  size?: "sm" | "md";
  error?: string;
};

type Props = SwitchProps;

const variants = {
  common: {
    switch:
      "relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-600",
    span: "inline-block transform bg-white rounded-full transition-transform",
  },
};
const sizeVariants = {
  sm: {
    switch: "h-5 w-9",
    span: "w-3 h-3",
    translate: {
      checked: "translate-x-5",
      unChecked: "translate-x-1",
    },
  },
  md: {
    switch: "h-6 w-11",
    span: "w-4 h-4",
    translate: {
      checked: "translate-x-6",
      unChecked: "translate-x-1",
    },
  },
};

const Switch: FC<Props> = ({
  checked,
  className,
  label,
  error,
  size = "md",
  onChange,
}) => {
  const sizeVariant = sizeVariants[size];
  return (
    <HeadlessSwitch.Group>
      <div className={classNames(className, "flex items-center")}>
        <HeadlessSwitch
          checked={checked}
          onChange={onChange}
          className={classNames(
            variants.common.switch,
            sizeVariant.switch,
            { "bg-accent": checked },
            { "bg-gray-300": !checked }
          )}
        >
          <span
            className={classNames(variants.common.span, sizeVariant.span, {
              [sizeVariant.translate.checked]: checked,
              [sizeVariant.translate.unChecked]: !checked,
            })}
          />
        </HeadlessSwitch>
        {label && (
          <HeadlessSwitch.Label
            className={classNames("ml-4", { "text-form-error": !!error })}
          >
            {label}
          </HeadlessSwitch.Label>
        )}
      </div>
    </HeadlessSwitch.Group>
  );
};

export default Switch;
