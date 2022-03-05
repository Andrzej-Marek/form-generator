import { useEffect, DependencyList } from "react";

export const useAsyncEffect = (
  asyncFunction: () => Promise<void | (() => void)>,
  deps?: DependencyList
) => {
  useEffect(() => {
    const abortController = new AbortController();
    (async function asyncFn() {
      try {
        await asyncFunction();
      } catch (error) {
        console.log("error", error);
      }
    })();
    return () => {
      abortController.abort(); // cancel pending fetch request on component unmount
    };
  }, deps);
};
