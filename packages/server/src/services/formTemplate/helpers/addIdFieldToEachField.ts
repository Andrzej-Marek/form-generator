import {
  EmptyConfig,
  FieldConfig,
  FormBuilderConfig,
  isEmptyConfig,
  isFieldConfig,
  isLayoutConfig,
  LayoutConfig,
  Random,
} from '@package/common';

export const addIdToEachField = (template: string): string => {
  const parsed: FormBuilderConfig = JSON.parse(template);
  const formTemplate = parsed.map((temp): FormBuilderConfig[number] => ({
    ...temp,
    config: temp.config.map((conf): FieldConfig | LayoutConfig => {
      if (isFieldConfig(conf)) {
        return addIdsToFieldConfig(conf);
      }

      if (isLayoutConfig(conf)) {
        return {
          ...conf,
          config: conf.config.map(addIdsToFieldConfig),
        };
      }

      return conf;
    }),
  }));

  return JSON.stringify(formTemplate);
};

const addIdsToFieldConfig = <T extends FieldConfig | EmptyConfig>(
  config: T,
): T => {
  if (isEmptyConfig(config)) {
    return config;
  }

  if (config.id) {
    return config;
  }

  return {
    ...config,
    id: Random.v4(),
  };
};
