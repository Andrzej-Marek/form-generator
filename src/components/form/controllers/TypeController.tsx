import { DropSpace } from "@containers/editor/components";
import { OnDrop } from "@containers/editor/context/formConfig/FormConfigContext";
import { FormTemplateBuilderActions } from "@containers/editor/FormTemplateBuilder";
import { FormBody } from "@layout/form";
import { useMemo } from "react";
import { FormConfig, LayoutConfig } from "src/types";
import FieldActionsWrapper from "../components/FieldActionsWrapper/FieldActionsWrapper";
import { FieldController } from "./FieldController";

export const TypeController = ({
  typeConfig,
  onDrop,
  index: controllerIndex,
  actions,
}: {
  typeConfig: FormConfig[number];
  onDrop: OnDrop;
  index: number;
  actions?: FormTemplateBuilderActions;
}) => {
  if (typeConfig.type === "layout") {
    return (
      <FieldActionsWrapper
        actions={{
          onConfigClick: () => actions?.configLayout(controllerIndex),
          onDeleteClick: () => actions?.deleteLayout(controllerIndex),
        }}
        variant="layout"
      >
        <FormBody columns={typeConfig.columns}>
          <ColumnsFields
            config={typeConfig.config}
            onDrop={onDrop}
            controllerIndex={controllerIndex}
            actions={actions}
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
            actions?.configField(fieldType, controllerIndex),
          onDeleteClick: (fieldType) =>
            actions?.deleteField(fieldType, controllerIndex),
        }}
      />
    );
  }

  return <></>;
};

const ColumnsFields = ({
  config,
  onDrop,
  controllerIndex,
  actions,
}: {
  config: LayoutConfig["config"];
  onDrop: OnDrop;
  controllerIndex: number;
  actions?: FormTemplateBuilderActions;
}) => {
  const elements = useMemo(
    () =>
      config.map((el, index) => {
        if (el.type === "empty") {
          return (
            <DropSpace
              key={index}
              index={index}
              onDrop={(fieldConfig, index) =>
                onDrop(fieldConfig, controllerIndex, index)
              }
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
                actions?.configField(fieldType, controllerIndex, index),
              onDeleteClick: (fieldType) =>
                actions?.deleteField(fieldType, controllerIndex, index),
            }}
          />
        );
      }),
    [config]
  );

  return <>{elements}</>;
};
