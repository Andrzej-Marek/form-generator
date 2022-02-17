import { FC, ReactNode, useMemo } from "react";
import { useDrag } from "react-dnd";
import {
  FieldConfig,
  FieldType,
  FIELD_TYPES,
  FormConfig,
  LayoutConfig,
} from "src/types";
import { blankFields } from "./helpers/blankFields";
import { blankLayout } from "./helpers/blankLayout";
import { DraggableEditorType } from "./types";

type OwnProps = {};

type Props = OwnProps;

const FormTemplateBuilderSitePanel: FC<Props> = () => {
  const fieldBoxes = useMemo(
    () => FIELD_TYPES.map((type) => <FieldBox fieldType={type} key={type} />),
    [FIELD_TYPES]
  );

  return (
    <div className="px-2">
      <div className="text-center font-bold">Components</div>
      <div className="mt-4">
        <div className="grid gap-4 mb-4">
          <LayoutBox />
        </div>
        <div className="grid grid-cols-2 gap-4">{fieldBoxes}</div>
      </div>
    </div>
  );
};

// TODO: Make generic wrapper for box and then make seperate for item / layout
const FieldBox = ({ fieldType }: { fieldType: FieldType }) => {
  const blankField = blankFields[fieldType];

  if (!blankField) {
    return <></>;
  }

  return (
    <DraggableBox payload={blankField} type={DraggableEditorType.LAYOUT}>
      {blankField.field}
    </DraggableBox>
  );
};

const LayoutBox = () => {
  if (!blankLayout) {
    return <></>;
  }

  return (
    <DraggableBox payload={blankLayout} type={DraggableEditorType.LAYOUT}>
      Layout
    </DraggableBox>
  );
};

const DraggableBox = ({
  payload,
  type,
  children,
}: {
  payload: FormConfig[number];
  type: DraggableEditorType;
  children: ReactNode;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type: DraggableEditorType.FIELD, payload },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    options: {
      dropEffect: "copy",
    },
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
      className="p-5 mb-2 border-2 text-center"
    >
      {children}
    </div>
  );
};

export default FormTemplateBuilderSitePanel;