import { DropSpace } from "@containers/editor/components";
import { OnDrop } from "@containers/editor/context/formConfig/FormConfigContext";
import { FormTemplateBuilderActions } from "@containers/editor/FormTemplateBuilder";
import { FormBody } from "@layout/form";
import { useMemo } from "react";
import { FormConfig, FormConfigPosition, LayoutConfig } from "src/types";
import FieldActionsWrapper from "../components/FieldActionsWrapper/FieldActionsWrapper";
import { FieldController } from "./FieldController";

export const TypeController = ({
  typeConfig,
  onDrop,
  position,
  actions,
}: {
  typeConfig: FormConfig[number];
  onDrop: OnDrop;
  position: FormConfigPosition;
  actions?: FormTemplateBuilderActions;
}) => {
  if (typeConfig.type === "layout") {
    return (
      <FieldActionsWrapper
        actions={{
          onConfigClick: () => actions?.configLayout(position),
          onDeleteClick: () => actions?.deleteLayout(position),
        }}
        variant="layout"
      >
        <FormBody columns={typeConfig.columns}>
          <ColumnsFields
            config={typeConfig.config}
            onDrop={onDrop}
            actions={actions}
            position={position}
          />
        </FormBody>
      </FieldActionsWrapper>
    );
  }

  if (typeConfig.type === "field") {
    return (
      <FieldController
        fieldConfig={typeConfig}
        actions={{
          onConfigClick: (fieldType) =>
            actions?.configField(fieldType, position),
          onDeleteClick: (fieldType) =>
            actions?.deleteField(fieldType, position),
        }}
      />
    );
  }

  return <></>;
};

const ColumnsFields = ({
  config,
  onDrop,
  position,
  actions,
}: {
  config: LayoutConfig["config"];
  onDrop: OnDrop;
  position: FormConfigPosition;
  actions?: FormTemplateBuilderActions;
}) => {
  const elements = useMemo(
    () =>
      config.map((el, index) => {
        if (el.type === "empty") {
          return (
            <DropSpace
              key={index}
              onDrop={(fieldConfig) =>
                onDrop(fieldConfig, { ...position, layoutConfigIndex: index })
              }
              position={{ ...position, layoutConfigIndex: index }}
              label={index + 1}
              variant="component"
            />
          );
        }

        return (
          <FieldController
            fieldConfig={el}
            key={index}
            actions={{
              onConfigClick: (fieldType) =>
                actions?.configField(fieldType, {
                  ...position,
                  layoutConfigIndex: index,
                }),
              onDeleteClick: (fieldType) =>
                actions?.deleteField(fieldType, {
                  ...position,
                  layoutConfigIndex: index,
                }),
            }}
          />
        );
      }),
    [config]
  );

  return <>{elements}</>;
};
