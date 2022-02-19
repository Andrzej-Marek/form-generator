import React from "react";

const VIEW_TYPE = ["fieldConfig", "list"] as const;
type ViewType = typeof VIEW_TYPE[number];

export type FieldConfigureInfo = {
  index: number;
  subIndex?: number;
  field: string;
};

interface State {
  view: ViewType;
  fieldConfigureInfo?: FieldConfigureInfo;
}

type Action =
  | {
      type: "setView";
      payload: ViewType;
    }
  | { type: "setFieldConfigureInfo"; payload: FieldConfigureInfo | undefined };

const initialState: State = {
  view: "list",
  fieldConfigureInfo: undefined,
};

function formTemplateReducer(state: State, action: Action): State {
  switch (action.type) {
    case "setView":
      return {
        ...state,
        view: action.payload,
      };
    case "setFieldConfigureInfo":
      return {
        ...state,
        fieldConfigureInfo: action.payload,
      };
  }
}

const FormTemplateStateContext = React.createContext<State>(initialState);
FormTemplateStateContext.displayName = "FormTemplateStateContext";
const FormTemplateActionContext = React.createContext<
  React.Dispatch<Action> | undefined
>(undefined);
FormTemplateActionContext.displayName = "FormTemplateActionContext";

export const FormTemplateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(formTemplateReducer, initialState);

  return (
    <FormTemplateStateContext.Provider value={state}>
      <FormTemplateActionContext.Provider value={dispatch}>
        {children}
      </FormTemplateActionContext.Provider>
    </FormTemplateStateContext.Provider>
  );
};

export function useFormTemplateState() {
  const context = React.useContext(FormTemplateStateContext);

  if (context === undefined) {
    throw new Error(`useFormTemplateState must be used within a ModalProvider`);
  }

  return context;
}

export function useFormTemplateAction() {
  const dispatch = React.useContext(FormTemplateActionContext);

  if (dispatch === undefined) {
    throw new Error(
      `useFormTemplateAction must be used within a ModalProvider`
    );
  }

  return {
    setView(view: ViewType) {
      dispatch({
        type: "setView",
        payload: view,
      });
    },
    setFieldConfigureInfo(payload: FieldConfigureInfo | undefined) {
      dispatch({
        type: "setFieldConfigureInfo",
        payload,
      });
    },
  };
}

// interface Context {
//   viewType: ViewType;
//   fieldOptions: unknown | undefined;
// }

// interface ContextActions {
//   setSidePanelViewType:
//     | ((viewType: "LIST") => void)
//     | ((
//         viewType: "FIELD_CONFIG",
//         field: string,
//         index: number,
//         subIndex?: number
//       ) => void);
// }

// const FormTemplateStateContext = createContext<Context>({} as Context);
// const FormTemplateActionContext = createContext<ContextActions>(
//   {} as ContextActions
// );

// export const FormTemplateProvider: FC = ({ children }) => {
//   const [viewType, setViewType] = useState<Context["viewType"]>("LIST");
//   const [fieldOptions, setFieldOptions] = useState<Context["fieldOptions"]>();

//   useEffect(() => {
//     if (viewType === "FIELD_CONFIG") {
//       console.log("SET FIELD CONFIG");
//     }
//   }, [viewType]);

//   function setSidePanelViewType(
//     viewType: "FIELD_CONFIG",
//     field: string,
//     index: number,
//     subIndex?: number
//   ): void;
//   function setSidePanelViewType(viewType: "LIST"): void;
//   function setSidePanelViewType(viewType: any) {
//     setViewType(viewType);
//   }

//   return (
//     <FormTemplateStateContext.Provider value={{ viewType, fieldOptions }}>
//       <FormTemplateActionContext.Provider value={{ setSidePanelViewType }}>
//         {children}
//       </FormTemplateActionContext.Provider>
//     </FormTemplateStateContext.Provider>
//   );
// };
