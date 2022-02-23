import produce from "immer";
import { FormBuilderConfig, FormConfigPosition } from "src/types";

export const insertFormConfigAtIndex = (
  array: FormBuilderConfig,
  item: any,
  position: FormConfigPosition
): FormBuilderConfig =>
  produce(array, (draft) => {
    const formBuilderConfig = draft[position.sectionIndex].config;
    if (!Array.isArray(formBuilderConfig)) {
      return;
    }
    formBuilderConfig.splice(position.configIndex, 0, item);
  });
