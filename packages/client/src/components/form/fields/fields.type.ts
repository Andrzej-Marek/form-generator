import { FieldActions } from "../components/FieldActionsWrapper/FieldActionsWrapper";

export type FieldProps = {
  name: string;
  actions?: FieldActions;
  withActionWrapper?: boolean;
};
