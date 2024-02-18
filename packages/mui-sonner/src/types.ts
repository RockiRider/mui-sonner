import { ReactNode } from "react";
import { AlertColor } from "@mui/material";

export type ToastSeverity = AlertColor;
export type ToastColor = AlertColor;
export type ToastVariant = "filled" | "standard";
export type ToastTypes = "success" | "info" | "warning" | "error" | "loading";

export type PromiseT<Data = any> = Promise<Data> | (() => Promise<Data>);

export type PromiseExternalToast = Omit<ExternalToast, "description">;

export type PromiseData<ToastData = any> = PromiseExternalToast & {
  loading?: string | ReactNode;
  success?: string | ReactNode | ((data: ToastData) => ReactNode | string);
  error?: string | ReactNode | ((error: any) => ReactNode | string);
  description?: string | ReactNode | ((data: any) => ReactNode | string);
  finally?: () => void | Promise<void>;
};

export interface ToastClassnames {
  toast?: string;
  title?: string;
  description?: string;
  loader?: string;
  closeButton?: string;
  actionButton?: string;
  success?: string;
  error?: string;
  info?: string;
  warning?: string;
  loading?: string;
}

export interface ToastT {
  id: number | string;
  title?: string | ReactNode;
  severity?: ToastSeverity;
  color?: ToastColor;
  variant?: ToastVariant;
  type?: ToastTypes;
  icon?: ReactNode;
  closeButton?: boolean;
  dismissible?: boolean;
  description?: ReactNode;
  duration?: number;
  delete?: boolean;
  important?: boolean;
  action?: {
    label: ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };
  onDismiss?: (toast: ToastT) => void;
  onAutoClose?: (toast: ToastT) => void;
  promise?: PromiseT;
  actionButtonStyle?: React.CSSProperties;
  position?: Position;
}

export type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";
export interface HeightT {
  height: number;
  toastId: number | string;
  position: Position;
}

export type ToastOptions = {
  duration?: number;
  closeButton?: boolean;
};

export enum SwipeStateTypes {
  SwipedOut = "SwipedOut",
  SwipedBack = "SwipedBack",
  NotSwiped = "NotSwiped",
}

export type Theme = "light" | "dark";

export interface ToastToDismiss {
  id: number | string;
  dismiss: boolean;
}

export type ExternalToast = Omit<
  ToastT,
  "id" | "type" | "title" | "jsx" | "delete" | "promise"
> & {
  id?: number | string;
};
