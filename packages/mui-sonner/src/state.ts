import {
  ExternalToast,
  PromiseData,
  PromiseT,
  ToastT,
  ToastToDismiss,
  ToastTypes,
} from "./types";

let toastsCounter = 1;

class Observer {
  subscribers: Array<(toast: ExternalToast | ToastToDismiss) => void>;
  toasts: Array<ToastT | ToastToDismiss>;

  constructor() {
    this.subscribers = [];
    this.toasts = [];
  }

  // We use arrow functions to maintain the correct `this` reference
  subscribe = (
    subscriber: (toast: ToastT | ToastToDismiss | ExternalToast) => void
  ) => {
    this.subscribers.push(subscriber);

    return () => {
      const index = this.subscribers.indexOf(subscriber);
      this.subscribers.splice(index, 1);
    };
  };

  publish = (data: ToastT) => {
    this.subscribers.forEach((subscriber) => subscriber(data));
  };

  addToast = (data: ToastT) => {
    this.publish(data);
    this.toasts = [...this.toasts, data];
  };

  create = (
    data: ExternalToast & {
      message?: string;
      type?: ToastTypes;
      promise?: PromiseT;
    }
  ) => {
    const { message, ...rest } = data;
    const id =
      typeof data?.id === "number" ||
      (data.id !== undefined && data.id?.length > 0)
        ? data.id
        : toastsCounter++;
    const alreadyExists = this.toasts.find((toast) => {
      return toast.id === id;
    });
    const dismissible =
      data.dismissible === undefined ? true : data.dismissible;

    if (alreadyExists) {
      this.toasts = this.toasts.map((toast) => {
        if (toast.id === id) {
          this.publish({ ...toast, ...data, id, title: message });
          return {
            ...toast,
            ...data,
            id,
            dismissible,
            title: message,
          };
        }

        return toast;
      });
    } else {
      this.addToast({ title: message, ...rest, dismissible, id });
    }

    return id;
  };

  dismiss = (id?: number | string) => {
    if (!id) {
      this.toasts.forEach((toast) => {
        this.subscribers.forEach((subscriber) =>
          subscriber({ id: toast.id, dismiss: true })
        );
      });
    }

    this.subscribers.forEach((subscriber) => subscriber({ id, dismiss: true }));
    return id;
  };

  error = (message: string, data?: ExternalToast) => {
    return this.create({ ...data, message, type: "error", severity: "error" });
  };

  success = (message: string, data?: ExternalToast) => {
    return this.create({
      ...data,
      type: "success",
      severity: "success",
      message,
    });
  };

  info = (message: string, data?: ExternalToast) => {
    return this.create({ ...data, type: "info", severity: "info", message });
  };

  warning = (message: string, data?: ExternalToast) => {
    return this.create({
      ...data,
      type: "warning",
      severity: "warning",
      message,
    });
  };

  loading = (message: string, data?: ExternalToast) => {
    return this.create({ severity: "info", ...data, type: "loading", message });
  };

  promise = <ToastData>(
    promise: PromiseT<ToastData>,
    data?: PromiseData<ToastData>
  ) => {
    if (!data) {
      // Nothing to show
      return;
    }
    let id: string | number | undefined = undefined;
    if (data.loading !== undefined) {
      id = this.create({
        severity: "info",
        ...data,
        promise,
        type: "loading",
        message: data.loading,
        description:
          typeof data.description !== "function" ? data.description : undefined,
      });
    }

    const p = promise instanceof Promise ? promise : promise();

    let shouldDismiss = id !== undefined;

    p.then((response) => {
      // TODO: Clean up TS here, response has incorrect type
      // @ts-expect-error
      if (response && typeof response.ok === "boolean" && !response.ok) {
        shouldDismiss = false;
        const message =
          typeof data.error === "function"
            ? // @ts-expect-error
              data.error(`HTTP error! status: ${response.status}`)
            : data.error;
        const description =
          typeof data.description === "function"
            ? // @ts-expect-error
              data.description(`HTTP error! status: ${response.status}`)
            : data.description;
        this.create({
          id,
          type: "error",
          severity: "error",
          message,
          description,
        });
      } else if (data.success !== undefined) {
        shouldDismiss = false;
        const message =
          typeof data.success === "function"
            ? data.success(response)
            : data.success;
        const description =
          typeof data.description === "function"
            ? data.description(response)
            : data.description;
        this.create({
          id,
          type: "success",
          severity: "success",
          message,
          description,
        });
      }
    })
      .catch((error) => {
        if (data.error !== undefined) {
          shouldDismiss = false;
          const message =
            typeof data.error === "function" ? data.error(error) : data.error;
          const description =
            typeof data.description === "function"
              ? data.description(error)
              : data.description;
          this.create({
            id,
            type: "error",
            severity: "error",
            message,
            description,
          });
        }
      })
      .finally(() => {
        if (shouldDismiss) {
          // Toast is still in load state (and will be indefinitely — dismiss it)
          this.dismiss(id);
          id = undefined;
        }

        data.finally?.();
      });

    return id;
  };
}

export const ToastState = new Observer();

// bind this to the toast function
const toastFunction = (message: string, data?: ExternalToast) => {
  const id = data?.id || toastsCounter++;

  ToastState.addToast({
    title: message,
    ...data,
    id,
  });
  return id;
};

const basicToast = toastFunction;

// We use `Object.assign` to maintain the correct types as we would lose them otherwise
/**
 * Used to create a toast as long as a Toaster is present in the application.
 * You can create a toast from scratch or you can use the predefined methods:
 * - `success`
 * - `info`
 * - `warning`
 * - `error`
 * - `promise`
 * - `loading`
 *
 * You cannot have both an `action` and a `closeButton:true` at the same time, the toast will prioritise the action in this case.
 *
 * You can use the `dismiss` method to dismiss a toast by its id.
 */
export const toast = Object.assign(basicToast, {
  success: ToastState.success,
  info: ToastState.info,
  warning: ToastState.warning,
  error: ToastState.error,
  promise: ToastState.promise,
  dismiss: ToastState.dismiss,
  loading: ToastState.loading,
});
