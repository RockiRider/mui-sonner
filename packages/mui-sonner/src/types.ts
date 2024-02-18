import { ReactNode } from "react";
import { AlertColor } from "@mui/material";

export type ToastSeverity = AlertColor;
export type ToastColor = AlertColor;
export type ToastVariant = "filled" | "standard";
export type ToastTypes = "success" | "info" | "warning" | "error" | "loading";

export type PromiseT<Data = any> = Promise<Data> | (() => Promise<Data>);

export type PromiseExternalToast = Omit<ExternalToast, "description">;

export type PromiseData<ToastData = any> = PromiseExternalToast & {
  loading?: string;
  success?: string | ((data: ToastData) => string);
  error?: string | ((error: any) => string);
  description?: string | ReactNode | ((data: any) => ReactNode | string);
  finally?: () => void | Promise<void>;
};

export interface ToastT {
  id: number | string;
  title?: string;
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
  // actionButtonStyle?: React.CSSProperties;
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

export interface ToastToDismiss {
  id: number | string;
  dismiss: boolean;
}

export type ExternalToast = Omit<
  ToastT,
  "id" | "type" | "title" | "delete" | "promise"
> & {
  id?: number | string;
};
