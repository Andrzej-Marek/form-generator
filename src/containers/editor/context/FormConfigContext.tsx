import { insertItemAtIndex } from "@lib/insertItemAtIndex";
import produce from "immer";
import { createContext, FC, useContext, useState } from "react";
import {
  EmptyConfig,
  FieldConfig,
  FormConfig,
  FormConfigs,
  isFieldConfig,
  isLayoutConfig,
  LayoutConfig,
} from "src/types";

export type OnDrop = (
  fieldConfig: FormConfig[number],
  index: number,
  subConfigIndex?: number
) => void;

type Context = {
  config: FormConfig;
  initialConfig: FormConfig;
  onDrop: OnDrop;
  updateField: <T>(
    fieldOption: keyof T,
    value: string,
    index: number,
    subIndex?: number
  ) => void;
  getFieldConfigByIndexes: (
    index: number,
    subIndex?: number,
    useInitial?: boolean
  ) => FieldConfig;
  resetFieldToInitial: (index: number, subIndex?: number) => FieldConfig;
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
export const FormConfigProvider: FC = ({ children }) => {
  // NOTE: We use draft as main config, when we're doing updating, field options then we update only draft.
  // If we are setting some field, then we use both.
  // REASON: We need a option to go back to initial values (values === fieldOptions) eg. Reset button on field options
  const [config, setConfig] = useState<{
    draft: FormConfig;
    initial: FormConfig;
  }>({ draft: [], initial: [] });

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
        if (typeof subIndex === "number") {
          const layoutConfig = draft[index];
          if (isLayoutConfig(layoutConfig)) {
            // @ts-ignore
            layoutConfig.config[subIndex][fieldOption] = value;
          }
        } else {
          // @ts-ignore
          draft[index][fieldOption] = value;
        }
      })
    );
  };

  const resetFieldToInitial: Context["resetFieldToInitial"] = (
    index,
    subIndex
  ) => {
    const fieldInitialConfig = getFieldConfigByIndexes(index, subIndex, true);

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

  const getConfigByIndexes = (
    index: number,
    subIndex?: number,
    useInitial = false
  ): FormConfigs => {
    let selectedConfig: FormConfigs | undefined = undefined;
    const configSource = useInitial ? config.initial : config.draft;

    if (typeof subIndex === "number") {
      const element = configSource[index];

      if (!isLayoutConfig(element)) {
        throw new Error(`Invalid subId for ${element.type} type`);
      }
      selectedConfig = element.config[subIndex];
    } else {
      selectedConfig = configSource[index];
    }

    if (!selectedConfig) {
      throw new Error("Field config not found!");
    }

    return selectedConfig;
  };

  const getFieldConfigByIndexes: Context["getFieldConfigByIndexes"] = (
    index,
    subIndex,
    useInitial = false
  ): FieldConfig => {
    // let fieldConfig: FieldConfig | undefined = undefined;
    const config = getConfigByIndexes(index, subIndex, useInitial);

    if (!isFieldConfig(config)) {
      throw new Error(`Invalid type ${config.type}. Required a field type`);
    }
    return config;
  };

  return (
    <FormConfigContext.Provider
      value={{
        config: config.draft,
        initialConfig: config.initial,
        onDrop,
        updateField,
        getFieldConfigByIndexes,
        resetFieldToInitial,
      }}
    >
      {children}
    </FormConfigContext.Provider>
  );
};

export const useFormConfigContext = () => useContext(FormConfigContext);
