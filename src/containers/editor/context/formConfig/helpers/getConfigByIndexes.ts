import {
  FieldConfig,
  FormConfigs,
  isFieldConfig,
  isLayoutConfig,
  LayoutConfig,
} from "src/types";
import { FormConfigState } from "../FormConfigContext";

export const getConfigByIndexes = (
  config: FormConfigState,
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

export const getFieldConfigByIndexes = (
  config: FormConfigState,
  index: number,
  subIndex?: number,
  useInitial = false
): FieldConfig => {
  const foundedConfig = getConfigByIndexes(config, index, subIndex, useInitial);

  if (!isFieldConfig(foundedConfig)) {
    throw new Error(
      `Invalid confgi type ${foundedConfig.type}. Required a field type`
    );
  }
  return foundedConfig;
};

export const getLayoutConfigByIndex = (
  config: FormConfigState,
  index: number,
  useInitial = false
): LayoutConfig => {
  const foundedConfig = getConfigByIndexes(
    config,
    index,
    undefined,
    useInitial
  );

  if (!isLayoutConfig(foundedConfig)) {
    throw new Error(
      `Invalid config type ${foundedConfig.type}. Required a layout type`
    );
  }
  return foundedConfig;
};
