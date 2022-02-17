import { insertItemAtIndex } from "@lib/insertItemAtIndex";
import produce from "immer";
import { useState } from "react";
import { EmptyConfig, FormConfig, LayoutConfig } from "src/types";

export type OnDrop = (
  fieldConfig: FormConfig[number],
  index: number,
  subConfigIndex?: number
) => void;

type Return = [FormConfig, OnDrop];
export const useDropContext = (): Return => {
  const [config, setConfig] = useState<FormConfig>([]);

  const onDrop: OnDrop = (fieldConfig, index, subConfigIndex?) => {
    if (fieldConfig.type === "layout") {
      setLayout(fieldConfig, index);
      return;
    }

    if (typeof subConfigIndex === "number") {
      setLayoutColumn(fieldConfig, index, subConfigIndex);
      return;
    }

    setConfig((prevState) => insertItemAtIndex(prevState, fieldConfig, index));
  };

  // Set layout empty columns;
  const setLayout = (fieldConfig: LayoutConfig, index: number) => {
    const layoutConfig = [...Array(fieldConfig.columns)].map(
      (): EmptyConfig => ({ type: "empty" })
    );

    setConfig((prevState) =>
      insertItemAtIndex(
        prevState,
        { ...fieldConfig, config: layoutConfig },
        index
      )
    );
  };

  const setLayoutColumn = (
    fieldConfig: FormConfig[number],
    index: number,
    subConfigIndex: number
  ) => {
    setConfig((prevState) => {
      return produce(prevState, (draft) => {
        const subConfig = produce(draft[index], (subDraft) => {
          if (subDraft.type === "layout" && fieldConfig.type === "field") {
            subDraft.config[subConfigIndex] = fieldConfig;
          }
        });
        draft[index] = subConfig;
      });
    });
  };

  return [config, onDrop];
};
