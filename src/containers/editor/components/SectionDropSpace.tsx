import classNames from "classnames";
import { ReactNode } from "react";
import { useDrop } from "react-dnd";
import { SectionConfig } from "src/types";
import { OnSectionDrop } from "../context";
import { DraggableEditorType } from "../types";

const SectionDropSpace = ({
  onDrop,
  label,
  sectionIndex,
  variant = "field",
}: {
  onDrop: OnSectionDrop;
  label?: ReactNode;
  variant?: "field" | "component";
  sectionIndex: number;
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: DraggableEditorType.SECTION,
    drop: (item: { payload: SectionConfig }) =>
      onDrop(item.payload, sectionIndex),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={classNames(
        "opacity-30 transition-all flex justify-center ",
        { "border-2 border-accent border-dashed": isOver },
        {
          "bg-gray-300 p-0.5": !isOver,
          "bg-green-200 p-12": isOver,
        }
      )}
    >
      <div
        className={classNames("text-center", {
          "text-accent ": isOver,
        })}
      >
        {isOver
          ? "Drop here to add new section"
          : label ?? "Need one more section?"}
      </div>
    </div>
  );
};

export default SectionDropSpace;
