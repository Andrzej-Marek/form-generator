import toast, { Toast as ToastType } from "react-hot-toast";

export type ToastOptions = Partial<
  Pick<
    ToastType,
    | "id"
    | "icon"
    | "duration"
    | "ariaProps"
    | "className"
    | "style"
    | "position"
    | "iconTheme"
  >
>;

export class Toast {
  static success(message: string, options?: ToastOptions) {
    toast.success(message, options);
  }

  static error(message: string, options?: ToastOptions) {
    toast.error(message, options);
  }
}
