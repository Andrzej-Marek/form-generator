import produce from "immer";

export const insertItemAtIndex = <T>(array: T, item: any, index: number): T =>
  produce(array, (draft) => {
    if (!Array.isArray(draft)) {
      return;
    }
    draft.splice(index, 0, item);
  });
