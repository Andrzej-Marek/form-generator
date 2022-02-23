import { FC, ReactNode, useMemo } from "react";
import { useDrag } from "react-dnd";
import {
  useFormTemplateAction,
  useFormTemplateState,
} from "@containers/editor/context/FormTemplateContext";
import { FieldType, FIELD_TYPES, FormConfig } from "src/types";
import { blankFields } from "./helpers/blankFields";
import { blankLayout } from "./helpers/blankLayout";
import { DraggableEditorType } from "./types";
import { useFormConfigContext } from "./context";
import {
  DateConfigurationForm,
  LayoutConfigurationForm,
  TextFieldConfigurationForm,
} from "./configurationForms";
import { ClickableText } from "@components/buttons";

type OwnProps = {};

type Props = OwnProps;

const FormTemplateBuilderSitePanel: FC<Props> = () => {
  const { setView, setFieldConfigPosition } = useFormTemplateAction();
  const { view, fieldConfigPosition } = useFormTemplateState();

  const fieldBoxes = useMemo(
    () => FIELD_TYPES.map((type) => <FieldBox fieldType={type} key={type} />),
    [FIELD_TYPES]
  );

  return (
    <div className="px-2">
      <div className="mt-4">
        {view === "fieldConfig" ? (
          <>
            <ClickableText
              className="mb-4"
              onClick={() => {
                setView("list");
                setFieldConfigPosition(undefined);
              }}
              iconLeft="arrowLeft"
            >
              Go back to list
            </ClickableText>
            {fieldConfigPosition?.field === "layout" ? (
              <LayoutConfigView />
            ) : (
              <FieldConfigView />
            )}
          </>
        ) : (
          <>
            <div className="text-center font-bold">Components</div>
            <div className="grid gap-4 mb-4">
              <LayoutBox />
            </div>
            <div className="grid grid-cols-2 gap-4">{fieldBoxes}</div>
          </>
        )}
      </div>
    </div>
  );
};

const LayoutConfigView = () => {
  const { fieldConfigPosition } = useFormTemplateState();
  const { getLayoutConfigByIndex } = useFormConfigContext();

  if (!fieldConfigPosition) {
    return <div>Error not fieldConfigPosition found</div>;
  }
  const layoutConfig = getLayoutConfigByIndex({
    configIndex: fieldConfigPosition.configIndex,
    sectionIndex: fieldConfigPosition.sectionIndex,
  });

  return (
    <LayoutConfigurationForm
      fieldConfigPosition={fieldConfigPosition}
      layoutConfig={layoutConfig}
    />
  );
};
const FieldConfigView = () => {
  const { fieldConfigPosition } = useFormTemplateState();
  const { getFieldConfigByIndexes } = useFormConfigContext();

  if (!fieldConfigPosition) {
    return <div>Error not fieldConfigPosition found</div>;
  }
  const config = getFieldConfigByIndexes(fieldConfigPosition);

  if (config.field === "text") {
    return (
      <TextFieldConfigurationForm
        fieldConfigPosition={fieldConfigPosition}
        fieldConfig={config}
      />
    );
  }
  if (config.field === "date") {
    return (
      <DateConfigurationForm
        fieldConfigPosition={fieldConfigPosition}
        fieldConfig={config}
      />
    );
  }
  return <div>MISSED TYPE FOR {config.field}</div>;
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
