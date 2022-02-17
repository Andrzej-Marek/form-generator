import classNames from "classnames";
import { ReactNode } from "react";
import { useDrop } from "react-dnd";
import { FieldConfig } from "src/types";
import { DraggableEditorType } from "../types";

const DropSpace = ({
  onDrop,
  index,
  accept = [DraggableEditorType.FIELD, DraggableEditorType.LAYOUT],
  label,
  variant = "field",
}: {
  onDrop: (fieldConfig: FieldConfig, index: number) => void;
  accept?: DraggableEditorType | DraggableEditorType[];
  label?: ReactNode;
  variant?: "field" | "component";
  index: number;
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept,
    drop: (item, monitor) => onDrop(item.payload, index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const isFieldVariant = variant === "field";
  const isComponentVariant = variant === "component";
  return (
    <div
      ref={drop}
      className={classNames(
        "opacity-30 transition-all flex justify-center ",
        { "border-2 border-accent border-dashed": isOver },
        {
          "bg-gray-300": isFieldVariant && !isOver,
          "bg-green-200 p-3": isFieldVariant && isOver,
        },
        {
          "bg-gray-400 p-1": isComponentVariant && !isOver,
          "bg-green-200 p-4": isComponentVariant && isOver,
        }
      )}
    >
      <div
        className={classNames("text-center", {
          "text-xl font-bold": !isOver && !isComponentVariant,
          "text-accent ": isOver,
        })}
      >
        {isOver ? "Drop here to add it to cart" : label ?? "+"}
      </div>
    </div>
  );
};

export default DropSpace;
