import { FC, useMemo } from "react";
import { useDrag } from "react-dnd";
import {
  useFormTemplateAction,
  useFormTemplateState,
} from "@containers/formTemplateBuilder/context/FormTemplateContext";
import { FieldType, FIELD_TYPES, FormConfig, SectionConfig } from "src/types";
import { blankFields } from "./helpers/blankFields";
import { blankLayout } from "./helpers/blankLayout";
import { DraggableEditorType } from "./types";
import { useFormConfigContext } from "./context";
import {
  DateConfigurationForm,
  LayoutConfigurationForm,
  SectionConfigurationForm,
  TextFieldConfigurationForm,
} from "./configurationForms";
import { ClickableText } from "@components/buttons";
import { blankSection } from "./helpers";
import Icon from "@components/icons/Icon";
import { IconType } from "@components/icons/iconList";
import Counter from "@components/form/Counter";

type OwnProps = {};

type Props = OwnProps;

const FormTemplateBuilderSitePanel: FC<Props> = () => {
  const { setView, setFieldConfigPosition } = useFormTemplateAction();
  const { view, fieldConfigPosition, sectionConfigPosition } =
    useFormTemplateState();

  const fieldBoxes = useMemo(
    () => FIELD_TYPES.map((type) => <FieldBox fieldType={type} key={type} />),
    [FIELD_TYPES]
  );

  const configView = useMemo(() => {
    if (typeof sectionConfigPosition === "number") {
      return <SectionConfigView />;
    }

    if (fieldConfigPosition?.field === "layout") {
      return <LayoutConfigView />;
    }

    if (!!fieldConfigPosition) {
      return <FieldConfigView />;
    }

    return <div>ERROR IN SIDE PANEL NO IF STATEMENT</div>;
  }, [sectionConfigPosition, fieldConfigPosition]);

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
            {configView}
          </>
        ) : (
          <>
            <div className="mb-2 text-gray-500 ">Layout elements</div>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <SectionBox />
              <LayoutBox />
            </div>
            <div className="mb-2 text-gray-500 ">Fields elements</div>
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

const SectionConfigView = () => {
  const { sectionConfigPosition } = useFormTemplateState();
  const { config } = useFormConfigContext();

  if (typeof sectionConfigPosition !== "number") {
    return <div>Error not sectionConfigPosition found</div>;
  }

  const sectionConfig = config[sectionConfigPosition];

  return (
    <SectionConfigurationForm
      sectionConfig={sectionConfig}
      sectionIndex={sectionConfigPosition}
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
    <DraggableBox
      payload={blankField}
      type={DraggableEditorType.LAYOUT}
      label={blankField.field}
      icon="calendar"
    />
  );
};

const SectionBox = () => {
  if (!blankSection) {
    return <></>;
  }

  return (
    <DraggableBox
      payload={blankSection}
      type={DraggableEditorType.SECTION}
      label="Section"
      icon="card"
    />
  );
};
const LayoutBox = () => {
  if (!blankLayout) {
    return <></>;
  }

  return (
    <DraggableBox
      payload={blankLayout}
      type={DraggableEditorType.LAYOUT}
      label="Layout"
      icon="eye"
    />
  );
};

const DraggableBox = ({
  payload,
  type,
  icon,
  label,
}: {
  payload: FormConfig[number] | SectionConfig;
  type: DraggableEditorType;
  label: string;
  icon: IconType;
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
      className="py-5 pl-5 mb-2 bg-gray-50 border-2 border-gray-100 rounded-md text-center flex items-center"
    >
      <Icon icon={icon} className="mr-4 w-5 h-5" />
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
};

export default FormTemplateBuilderSitePanel;
