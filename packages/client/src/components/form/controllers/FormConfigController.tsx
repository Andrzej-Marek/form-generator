import { useMemo } from "react";
import { FormConfig } from "src/types";
import { TypeController } from "./TypeController";

export const FormConfigController = ({ config }: { config: FormConfig }) => {
  const elements = useMemo(
    () =>
      config.map((el, index) => <TypeController typeConfig={el} key={index} />),
    [config]
  );
  return <>{elements}</>;
};
