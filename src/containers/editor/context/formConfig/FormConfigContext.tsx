import { insertItemAtIndex } from "@lib/insertItemAtIndex";
import produce from "immer";
import { createContext, FC, useContext, useState } from "react";
import {
  EmptyConfig,
  FieldConfig,
  FormConfig,
  isLayoutConfig,
  LayoutConfig,
} from "src/types";
import { blankEmpty } from "../../helpers/blankEmpty";
import {
  getFieldConfigByIndexes,
  getLayoutConfigByIndex,
} from "./helpers/getConfigByIndexes";

export type OnDrop = (
  fieldConfig: FormConfig[number],
  index: number,
  subConfigIndex?: number
) => void;

export type Context = {
  config: FormConfig;
  initialConfig: FormConfig;
  onDrop: OnDrop;
  updateField: <T>(
    fieldOption: keyof T,
    value: string | number | Date | undefined,
    index: number,
    subIndex?: number
  ) => void;
  updateLayoutConfig: (
    fieldOption: keyof LayoutConfig,
    value: string | number,
    index: number
  ) => void;
  deleteField: (index: number, subIndex?: number) => void;
  deleteLayout: (index: number) => void;
  getFieldConfigByIndexes: (
    index: number,
    subIndex?: number,
    useInitial?: boolean
  ) => FieldConfig;
  resetFieldToInitial: (index: number, subIndex?: number) => FieldConfig;
  getLayoutConfigByIndex: (index: number) => LayoutConfig;
};

const FormConfigContext = createContext<Context>({} as Context);

const updateLayoutColumn = (
  array: FormConfig,
  fieldConfig: FormConfig[number],
  index: number,
  subConfigIndex: number
) => {
  return produce(array, (draft) => {
    const subConfig = produce(draft[index], (subDraft) => {
      if (subDraft.type === "layout" && fieldConfig.type === "field") {
        subDraft.config[subConfigIndex] = fieldConfig;
      }
    });
    draft[index] = subConfig;
  });
};

export type FormConfigState = { draft: FormConfig; initial: FormConfig };
export const FormConfigProvider: FC = ({ children }) => {
  // NOTE: We use draft as main config, when we're doing updating, field options then we update only draft.
  // If we are setting some field, then we use both.
  // REASON: We need a option to go back to initial values (values === fieldOptions) eg. Reset button on field options
  const [config, setConfig] = useState<FormConfigState>({
    draft: [],
    initial: [],
  });

  const onDrop: OnDrop = (fieldConfig, index, subConfigIndex?) => {
    if (fieldConfig.type === "layout") {
      setLayout(fieldConfig, index);
      return;
    }

    if (typeof subConfigIndex === "number") {
      setLayoutColumn(fieldConfig, index, subConfigIndex);
      return;
    }

    setConfig((prevState) => {
      const draft = insertItemAtIndex(prevState.draft, fieldConfig, index);
      const initial = insertItemAtIndex(prevState.initial, fieldConfig, index);
      return {
        draft,
        initial,
      };
    });
  };

  // Set layout empty columns;
  const setLayout = (fieldConfig: LayoutConfig, index: number) => {
    const layoutConfig = [...Array(fieldConfig.columns)].map(
      (): EmptyConfig => ({ type: "empty" })
    );

    setConfig((prevState) => {
      const draft = insertItemAtIndex(
        prevState.draft,
        { ...fieldConfig, config: layoutConfig },
        index
      );

      const initial = insertItemAtIndex(
        prevState.initial,
        { ...fieldConfig, config: layoutConfig },
        index
      );

      return {
        draft,
        initial,
      };
    });
  };

  const setLayoutColumn = (
    fieldConfig: FormConfig[number],
    index: number,
    subConfigIndex: number
  ) => {
    setConfig((prevState) => {
      const draft = updateLayoutColumn(
        prevState.draft,
        fieldConfig,
        index,
        subConfigIndex
      );
      const initial = updateLayoutColumn(
        prevState.initial,
        fieldConfig,
        index,
        subConfigIndex
      );

      return {
        draft,
        initial,
      };
    });
  };

  const updateField: Context["updateField"] = (
    fieldOption,
    value,
    index,
    subIndex
  ) => {
    // TODO: Try to make better types, if any problem with update field options
    setConfig((prevState) =>
      produce(prevState, ({ draft }) => {
        const selectedConfig = draft[index];
        if (typeof subIndex === "number") {
          if (isLayoutConfig(selectedConfig)) {
            // @ts-ignore
            selectedConfig.config[subIndex][fieldOption] = value;
          }
        } else {
          // @ts-ignore
          draft[index][fieldOption] = value;
        }
      })
    );
  };

  const updateLayoutConfig: Context["updateLayoutConfig"] = (
    field,
    value,
    index
  ) => {
    setConfig((prevState) =>
      produce(prevState, ({ draft }) => {
        const selectedConfig = draft[index];

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

  const resetFieldToInitial: Context["resetFieldToInitial"] = (
    index,
    subIndex
  ) => {
    const fieldInitialConfig = getFieldConfigByIndexes(
      config,
      index,
      subIndex,
      true
    );

    setConfig((prevState) =>
      produce(prevState, ({ draft }) => {
        if (typeof subIndex === "number") {
          const layoutConfig = draft[index];
          if (isLayoutConfig(layoutConfig)) {
            layoutConfig.config[subIndex] = fieldInitialConfig;
          }
        } else {
          draft[index] = fieldInitialConfig;
        }
      })
    );

    return fieldInitialConfig;
  };

  const deleteFieldHandler = (
    config: FormConfig,
    index: number,
    subIndex?: number
  ) => {
    return produce(config, (draft) => {
      if (typeof subIndex === "number") {
        const element = draft[index];

        if (!isLayoutConfig(element)) {
          throw new Error(`Invalid subId for ${element.type} type`);
        }
        element.config[subIndex] = blankEmpty;
      } else {
        draft.splice(index, 1);
      }
    });
  };

  const deleteLayoutHandler = (config: FormConfig, index: number) => {
    return produce(config, (draft) => {
      const element = config[index];

      if (!isLayoutConfig(element)) {
        throw new Error("Selected element is not layout type");
      }

      draft.splice(index, 1);
    });
  };

  const deleteField: Context["deleteField"] = (index, subIndex) => {
    setConfig((prevState) => {
      const draft = deleteFieldHandler(prevState.draft, index, subIndex);
      const initial = deleteFieldHandler(prevState.initial, index, subIndex);
      return {
        draft,
        initial,
      };
    });
  };

  const deleteLayout: Context["deleteLayout"] = (index) => {
    setConfig((prevState) => {
      const draft = deleteLayoutHandler(prevState.draft, index);
      const initial = deleteLayoutHandler(prevState.initial, index);
      return {
        draft,
        initial,
      };
    });
  };

  return (
    <FormConfigContext.Provider
      value={{
        config: config.draft,
        initialConfig: config.initial,
        onDrop,
        updateField,
        getFieldConfigByIndexes: (index, subIndex, useInitial) =>
          getFieldConfigByIndexes(config, index, subIndex, useInitial),
        resetFieldToInitial,
        deleteField,
        getLayoutConfigByIndex: (index) =>
          getLayoutConfigByIndex(config, index),
        updateLayoutConfig,
        deleteLayout,
      }}
    >
      {children}
    </FormConfigContext.Provider>
  );
};

export const useFormConfigContext = () => useContext(FormConfigContext);
