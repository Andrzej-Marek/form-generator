import { insertItemAtIndex } from "@lib/insertItemAtIndex";
import produce from "immer";
import { createContext, FC, useContext, useState } from "react";
import {
  EmptyConfig,
  FieldConfig,
  FormBuilderConfig,
  FormConfig,
  FormConfigPosition,
  isLayoutConfig,
  LayoutConfig,
} from "src/types";
import { blankEmpty } from "../../helpers/blankEmpty";
import {
  getFieldConfigByIndexes,
  getLayoutConfigByIndex,
} from "./helpers/getConfigByIndexes";
import { insertFormConfigAtIndex } from "./helpers/insertFormConfigAtIndex";

export type OnDrop = (
  fieldConfig: FormConfig[number],
  position: FormConfigPosition
) => void;

export type Context = {
  config: FormBuilderConfig;
  onDrop: OnDrop;
  updateField: <T>(
    fieldOption: keyof T,
    value: string | number | Date | undefined,
    position: FormConfigPosition
  ) => void;
  updateLayoutConfig: (
    fieldOption: keyof LayoutConfig,
    value: string | number,
    position: FormConfigPosition
  ) => void;
  deleteField: (position: FormConfigPosition) => void;
  deleteLayout: (position: FormConfigPosition) => void;
  getFieldConfigByIndexes: (position: FormConfigPosition) => FieldConfig;
  getLayoutConfigByIndex: (position: FormConfigPosition) => LayoutConfig;
};

const FormConfigContext = createContext<Context>({} as Context);

// When we want to update a layout config
const updateLayoutColumn = (
  array: FormBuilderConfig,
  fieldConfig: FormConfig[number],
  position: Required<FormConfigPosition>
) => {
  const { configIndex, sectionIndex, layoutConfigIndex } = position;
  return produce(array, (formDraft) => {
    const draft = formDraft[sectionIndex].config;
    const subConfig = produce(draft[configIndex], (subDraft) => {
      if (subDraft.type === "layout" && fieldConfig.type === "field") {
        subDraft.config[layoutConfigIndex] = fieldConfig;
      }
    });
    draft[configIndex] = subConfig;
  });
};

export type FormConfigState = { draft: FormConfig; initial: FormConfig };
export const FormConfigProvider: FC = ({ children }) => {
  const [config, setConfig] = useState<FormBuilderConfig>([
    { config: [], label: "", type: "section" },
  ]);

  const onDrop: OnDrop = (fieldConfig, position) => {
    if (fieldConfig.type === "layout") {
      setLayout(fieldConfig, position);
      return;
    }

    if (typeof position.layoutConfigIndex === "number") {
      setLayoutColumn(fieldConfig, position as Required<FormConfigPosition>);
      return;
    }

    setConfig((prevState) =>
      insertFormConfigAtIndex(prevState, fieldConfig, position)
    );
  };

  // Set layout empty columns;
  const setLayout = (
    fieldConfig: LayoutConfig,
    positionConfig: FormConfigPosition
  ) => {
    const layoutConfig = [...Array(fieldConfig.columns)].map(
      (): EmptyConfig => ({ type: "empty" })
    );

    setConfig((prevState) => {
      return insertFormConfigAtIndex(
        prevState,
        { ...fieldConfig, config: layoutConfig },
        positionConfig
      );
    });
  };

  const setLayoutColumn = (
    fieldConfig: FormConfig[number],
    position: Required<FormConfigPosition>
  ) => {
    setConfig((prevState) =>
      updateLayoutColumn(prevState, fieldConfig, position)
    );
  };

  const updateField: Context["updateField"] = (
    fieldOption,
    value,
    position
  ) => {
    const { configIndex, sectionIndex, layoutConfigIndex } = position;
    // TODO: Try to make better types, if any problem with update field options
    setConfig((prevState) =>
      produce(prevState, (formDraft) => {
        const draft = formDraft[sectionIndex].config;
        const selectedConfig = draft[configIndex];
        if (typeof layoutConfigIndex === "number") {
          if (isLayoutConfig(selectedConfig)) {
            // @ts-ignore
            selectedConfig.config[layoutConfigIndex][fieldOption] = value;
          }
        } else {
          // @ts-ignore
          draft[configIndex][fieldOption] = value;
        }
      })
    );
  };

  const updateLayoutConfig: Context["updateLayoutConfig"] = (
    field,
    value,
    { configIndex, sectionIndex, layoutConfigIndex }
  ) => {
    setConfig((prevState) =>
      produce(prevState, (formDraft) => {
        const draft = formDraft[sectionIndex].config;
        const selectedConfig = draft[configIndex];

        if (!isLayoutConfig(selectedConfig)) {
          return;
        }

        if (field === "columns") {
          // We want to add or move element to array
          if (+value > +selectedConfig.columns) {
            selectedConfig.config.push(blankEmpty);
          } else {
            selectedConfig.config.pop();
          }
          selectedConfig.columns = +value;
          return;
        }

        // @ts-ignore
        selectedConfig[field] = value;
      })
    );
  };

  const deleteFieldHandler = (
    config: FormBuilderConfig,
    { configIndex, sectionIndex, layoutConfigIndex }: FormConfigPosition
  ) => {
    return produce(config, (formDraft) => {
      const draft = formDraft[sectionIndex].config;
      if (typeof layoutConfigIndex === "number") {
        const element = draft[configIndex];

        if (!isLayoutConfig(element)) {
          throw new Error(`Invalid subId for ${element.type} type`);
        }
        element.config[layoutConfigIndex] = blankEmpty;
      } else {
        draft.splice(configIndex, 1);
      }
    });
  };

  const deleteLayoutHandler = (
    config: FormBuilderConfig,
    { configIndex, sectionIndex }: FormConfigPosition
  ) => {
    return produce(config, (formDraft) => {
      const draft = formDraft[sectionIndex].config;
      const element = config[sectionIndex].config[configIndex];

      if (!isLayoutConfig(element)) {
        throw new Error("Selected element is not layout type");
      }

      draft.splice(configIndex, 1);
    });
  };

  const deleteField: Context["deleteField"] = (
    position: FormConfigPosition
  ) => {
    setConfig((prevState) => deleteFieldHandler(prevState, position));
  };

  const deleteLayout: Context["deleteLayout"] = (position) => {
    setConfig((prevState) => deleteLayoutHandler(prevState, position));
  };

  return (
    <FormConfigContext.Provider
      value={{
        config: config,
        onDrop,
        updateField,
        getFieldConfigByIndexes: (position) =>
          getFieldConfigByIndexes(config, position),
        deleteField,
        getLayoutConfigByIndex: (position) =>
          getLayoutConfigByIndex(config, position),
        updateLayoutConfig,
        deleteLayout,
      }}
    >
      {children}
    </FormConfigContext.Provider>
  );
};

export const useFormConfigContext = () => useContext(FormConfigContext);
