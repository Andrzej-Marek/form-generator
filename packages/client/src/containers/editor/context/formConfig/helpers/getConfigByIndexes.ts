import {
  FieldConfig,
  FormBuilderConfig,
  FormConfigPosition,
  FormConfigs,
  isFieldConfig,
  isLayoutConfig,
  LayoutConfig,
} from "src/types";

export const getConfigByIndexes = (
  config: FormBuilderConfig,
  { configIndex, sectionIndex, layoutConfigIndex }: FormConfigPosition
): FormConfigs => {
  let selectedConfig: FormConfigs | undefined = undefined;
  const configSource = config[sectionIndex].config;

  if (typeof layoutConfigIndex === "number") {
    const element = configSource[configIndex];

    if (!isLayoutConfig(element)) {
      throw new Error(`Invalid subId for ${element.type} type`);
    }
    selectedConfig = element.config[layoutConfigIndex];
  } else {
    selectedConfig = configSource[configIndex];
  }

  if (!selectedConfig) {
    throw new Error("Field config not found!");
  }

  return selectedConfig;
};

export const getFieldConfigByIndexes = (
  config: FormBuilderConfig,
  position: FormConfigPosition
): FieldConfig => {
  const foundedConfig = getConfigByIndexes(config, position);

  if (!isFieldConfig(foundedConfig)) {
    throw new Error(
      `Invalid config type ${foundedConfig.type}. Required a field type`
    );
  }
  return foundedConfig;
};

export const getLayoutConfigByIndex = (
  config: FormBuilderConfig,
  position: FormConfigPosition
): LayoutConfig => {
  const foundedConfig = getConfigByIndexes(config, position);

  if (!isLayoutConfig(foundedConfig)) {
    throw new Error(
      `Invalid config type ${foundedConfig.type}. Required a layout type`
    );
  }
  return foundedConfig;
};
