import React from "react";

export enum ModalView {
  TEST = "TEST",
  ADD_SECTION = "ADD_SECTION",
}
// export const MODAL_VIEWS = [
//   "REGISTER",
//   "LOGIN_VIEW",
//   "PRODUCT_DETAILS",
//   "SELECT_CATEGORY",
// ] as const;
// export type ModalViews = typeof MODAL_VIEWS[number];

// NOTE: Use only in modal

export type ModalPayload = {
  [ModalView.ADD_SECTION]: { test: string };
  [ModalView.TEST]: { hello: string };
};

type ModalActions =
  | {
      view: ModalView.ADD_SECTION;
      payload: ModalPayload["ADD_SECTION"];
    }
  | { view: ModalView.TEST };
// | { view: "LOGIN_VIEW" }
// | { view: "PRODUCT_DETAILS"; data: ModalData["PRODUCT_DETAILS"] }
// | { view: "SELECT_CATEGORY"; data: ModalData["SELECT_CATEGORY"] };

interface State {
  view?: ModalView;
  data?: ModalPayload;
  isOpen: boolean;
}

type Action =
  | { type: "open"; view?: ModalView; payload?: any }
  | { type: "close" };

const initialState: State = {
  view: undefined,
  isOpen: false,
  data: undefined,
};

function modalReducer(state: State, action: Action): State {
  switch (action.type) {
    case "open":
      return {
        ...state,
        view: action.view,
        data: action.payload,
        isOpen: true,
      };
    case "close":
      return {
        ...state,
        view: undefined,
        data: undefined,
        isOpen: false,
      };
    default:
      throw new Error("Unknown Modal Action!");
  }
}

const ModalStateContext = React.createContext<State>(initialState);
ModalStateContext.displayName = "ModalStateContext";
const ModalActionContext = React.createContext<
  React.Dispatch<Action> | undefined
>(undefined);
ModalActionContext.displayName = "ModalActionContext";

export const ModalProvider: React.FC = ({ children }) => {
  // const route = useRouter();
  const [state, dispatch] = React.useReducer(modalReducer, initialState);

  // useEffect(() => {
  //   if (!state.view) {
  //     route.replace({ query: undefined });
  //     return;
  //   }
  //   route.replace({ query: { modal: state.view } });
  // }, [state.view]);

  return (
    <ModalStateContext.Provider value={state}>
      <ModalActionContext.Provider value={dispatch}>
        {children}
      </ModalActionContext.Provider>
    </ModalStateContext.Provider>
  );
};

export function useModalState() {
  const context = React.useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error(`useModalState must be used within a ModalProvider`);
  }
  return context;
}

export function useModalAction() {
  const dispatch = React.useContext(ModalActionContext);
  if (dispatch === undefined) {
    throw new Error(`useModalAction must be used within a ModalProvider`);
  }
  return {
    openModal(data: ModalActions) {
      dispatch({
        type: "open",
        view: data.view,
        payload: "payload" in data ? data.payload : undefined,
      });
    },
    closeModal() {
      dispatch({ type: "close" });
    },
  };
}
