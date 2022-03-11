import produce from "immer";
import {
  EmptyConfig,
  FieldConfig,
  FormBuilderConfig,
  FormConfigs,
  LayoutConfig,
} from "../types";

export const isFieldConfig = (config: FormConfigs): config is FieldConfig =>
  (config as FieldConfig).type === "field";

export const isLayoutConfig = (config: FormConfigs): config is LayoutConfig =>
  (config as LayoutConfig).type === "layout";

export const isEmptyConfig = (config: FormConfigs): config is EmptyConfig =>
  (config as EmptyConfig).type === "empty";

export const parseFormTemplate = (template: string): FormBuilderConfig => {
  try {
    return JSON.parse(template);
  } catch (error) {
    console.error("Error during parsing form template", error);
    throw new Error("Error during parsing form template");
  }
};

export const stringifyFormTemplate = (template: FormBuilderConfig) => {
  try {
    return JSON.stringify(template);
  } catch (error) {
    console.error("Error during stringify form template", error);
    throw new Error("Error during stringify form template");
  }
};

export const modifyFieldConfig = (
  formTemplate: FormBuilderConfig,
  fieldCb: (fieldConfig: FieldConfig) => FieldConfig
): FormBuilderConfig => {
  return produce(formTemplate, (formTemplateDraft) => {
    for (let template of formTemplateDraft) {
      if (template.type === "section") {
        for (let templateConfig of template.config) {
          if (isFieldConfig(templateConfig)) {
            fieldCb(templateConfig);
            continue;
          }

          if (isLayoutConfig(templateConfig)) {
            for (let layoutConfig of templateConfig.config) {
              if (isFieldConfig(layoutConfig)) {
                fieldCb(layoutConfig);
                continue;
              }
            }
          }
        }
      }
    }
  });
};
