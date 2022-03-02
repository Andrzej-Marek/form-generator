import classNames from "classnames";
import { FC, ReactNode } from "react";
import { FieldLabel } from "./components";

export type CounterProps = {
  counter: number;
  onIncrement?: (counter: number) => void;
  onDecrement?: (counter: number) => void;
  onChange?: (counter: number) => void;
  label?: string;
  min?: number;
  max?: number;
  error?: string;
  infoTooltip?: ReactNode;
};

type Props = CounterProps;

const Counter: FC<Props> = ({
  error,
  counter,
  onDecrement,
  onIncrement,
  max,
  min,
  label,
  onChange,
  infoTooltip,
}) => {
  const onIncrementHandler = () => {
    const nextValue = counter + 1;
    if (typeof max === "number" && nextValue > max) {
      return;
    }
    onIncrement?.(nextValue);
    onChange?.(nextValue);
  };

  const onDecrementHandler = () => {
    const nextValue = counter - 1;

    if (typeof min === "number" && nextValue < min) {
      return;
    }

    onDecrement?.(nextValue);
    onChange?.(nextValue);
  };

  return (
    <div>
      {label && (
        <FieldLabel label={label} isError={!!error} infoTooltip={infoTooltip} />
      )}
      <div className="flex flex-row border h-10 w-32 bg-accent rounded-lg relative">
        <button
          type="button"
          className="font-semibold border-r border-accent-700 text-white h-full w-20 flex rounded-l focus:outline-none cursor-pointer"
          onClick={onDecrementHandler}
        >
          <span className="m-auto">-</span>
        </button>
        <input
          type="hidden"
          className="md:p-2 p-1 text-xs md:text-base border-gray-400 focus:outline-none text-center"
          readOnly
          name="custom-input-number"
        />
        <div className="text-white w-32 text-xs font-semibold md:text-base flex items-center justify-center cursor-default">
          <span>{counter}</span>
        </div>

        <button
          className="font-semibold border-l border-accent-700  text-white h-full w-20 flex rounded-r focus:outline-none cursor-pointer"
          type="button"
          onClick={onIncrementHandler}
        >
          <span className="m-auto">+</span>
        </button>
      </div>
      {error && <p className="my-2 text-xs text-red-500 ">{error}</p>}
    </div>
  );
};

export default Counter;
