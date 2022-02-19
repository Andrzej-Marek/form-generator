import { DropSpace } from "@containers/editor/components";
import { OnDrop } from "@containers/editor/context/FormConfigContext";
import { FormBody } from "@layout/form";
import { useMemo } from "react";
import { FormConfig, LayoutConfig } from "src/types";
import { FieldController } from "./FieldController";

export const TypeController = ({
  typeConfig,
  onDrop,
  index: controllerIndex,
}: {
  typeConfig: FormConfig[number];
  onDrop: OnDrop;
  index: number;
}) => {
  if (typeConfig.type === "layout") {
    return (
      <FormBody columns={typeConfig.columns}>
        <ColumnsFields
          config={typeConfig.config}
          onDrop={onDrop}
          controllerIndex={controllerIndex}
        />
      </FormBody>
    );
  }

  if (typeConfig.type === "field") {
    return <FieldController fieldConfig={typeConfig} index={controllerIndex} />;
  }

  return <></>;
};

const ColumnsFields = ({
  config,
  onDrop,
  controllerIndex,
}: {
  config: LayoutConfig["config"];
  onDrop: OnDrop;
  controllerIndex: number;
}) => {
  const elements = useMemo(
    () =>
      config.map((el, index) => {
        if (el.type === "empty") {
          return (
            <DropSpace
              key={index}
              index={index}
              onDrop={(fieldConfig, index) =>
                onDrop(fieldConfig, controllerIndex, index)
              }
              label={index + 1}
              variant="component"
            />
          );
        }

        return (
          <FieldController
            fieldConfig={el}
            key={index}
            index={controllerIndex}
            subIndex={index}
          />
        );
      }),
    [config]
  );

  return <>{elements}</>;
};

// const ColumnsFields = ({
//   columns,
//   config,
//   onDrop,
//   controllerIndex,
// }: {
//   columns: number;
//   config: FieldConfig[];
//   onDrop: OnDrop;
//   controllerIndex: number;
// }) => {
//   console.log("config", config);
//   if (!config.length) {
//     const elements = [...Array(columns)].map((_el, index) => (
//       <DropSpace
//         key={index}
//         index={index}
//         onDrop={(fieldConfig, index) =>
//           onDrop(fieldConfig, controllerIndex, index)
//         }
//         label={index + 1}
//         variant="component"
//       />
//     ));
//     return <>{elements}</>;
//   }

//   let index = 0;
//   const elements = [];

//   for (const el of config) {
//     if (el) {
//       elements.push(<FieldController fieldConfig={el} key={index} />);
//     } else {
//       elements.push(
//         <DropSpace
//           key={index}
//           index={index}
//           onDrop={(fieldConfig, index) =>
//             onDrop(fieldConfig, controllerIndex, index)
//           }
//           label={index + 1}
//           variant="component"
//         />
//       );
//     }
//     index++;
//   }

//   return <>{elements}</>;
// };
