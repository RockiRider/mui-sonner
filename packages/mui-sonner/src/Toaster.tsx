import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { Toast } from "./Toast";
import {
  VISIBLE_TOASTS_AMOUNT,
  VIEWPORT_OFFSET,
  TOAST_WIDTH,
  GAP,
} from "./constants";
import { ToastState } from "./state";
import {
  ToastT,
  HeightT,
  ToastToDismiss,
  Position,
  ToasterProps,
} from "./types";
import "./style.css";

function getDocumentDirection(): ToasterProps["dir"] {
  if (typeof window === "undefined") return "ltr";
  if (typeof document === "undefined") return "ltr"; // For Fresh purpose

  const dirAttribute = document.documentElement.getAttribute("dir");

  if (dirAttribute === "auto" || !dirAttribute) {
    return window.getComputedStyle(document.documentElement)
      .direction as ToasterProps["dir"];
  }

  return dirAttribute as ToasterProps["dir"];
}

export const Toaster = ({
  position = "bottom-right",
  hotkey = ["altKey", "KeyT"],
  expand = false,
  closeIcon,
  offset,
  duration,
  visibleToasts = VISIBLE_TOASTS_AMOUNT,
  toastOptions,
  dir = getDocumentDirection(),
  gap,
  loadingIcon,
  alertSx,
  closeButtonSx,
  containerAriaLabel = "Notifications",
}: ToasterProps) => {
  const [toasts, setToasts] = useState<ToastT[]>([]);

  //Changed
  const possiblePositions = useMemo(() => {
    return Array.from(
      new Set(
        [position].concat(
          toasts
            .map((toast) => toast.position)
            .filter((position): position is Position => position !== undefined)
        )
      )
    );
  }, [toasts, position]);

  const [heights, setHeights] = useState<HeightT[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [interacting, setInteracting] = useState(false);

  const listRef = useRef<HTMLOListElement>(null);
  const hotkeyLabel = hotkey
    .join("+")
    .replace(/Key/g, "")
    .replace(/Digit/g, "");

  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const isFocusWithinRef = useRef(false);

  const removeToast = useCallback(
    (toast: ToastT) =>
      setToasts((toasts) => toasts.filter(({ id }) => id !== toast.id)),
    []
  );

  useEffect(() => {
    return ToastState.subscribe((toast) => {
      if ((toast as ToastToDismiss).dismiss) {
        setToasts((toasts) =>
          toasts.map((t) => (t.id === toast.id ? { ...t, delete: true } : t))
        );
        return;
      }

      // Prevent batching, temp solution.
      setTimeout(() => {
        ReactDOM.flushSync(() => {
          setToasts((toasts) => {
            const indexOfExistingToast = toasts.findIndex(
              (t) => t.id === toast.id
            );

            // Update the toast if it already exists
            if (indexOfExistingToast !== -1) {
              return [
                ...toasts.slice(0, indexOfExistingToast),
                { ...toasts[indexOfExistingToast], ...toast },
                ...toasts.slice(indexOfExistingToast + 1),
              ] as ToastT[];
            }

            return [toast, ...toasts] as ToastT[];
          });
        });
      });
    });
  }, []);

  useEffect(() => {
    // Ensure expanded is always false when no toasts are present / only one left
    if (toasts.length <= 1) {
      setExpanded(false);
    }
  }, [toasts]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isHotkeyPressed = hotkey.every(
        (key) => (event as any)[key] || event.code === key
      );

      if (isHotkeyPressed) {
        setExpanded(true);
        listRef.current?.focus();
      }

      if (
        event.code === "Escape" &&
        (document.activeElement === listRef.current ||
          listRef.current?.contains(document.activeElement))
      ) {
        setExpanded(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [hotkey]);

  useEffect(() => {
    if (listRef.current) {
      return () => {
        if (lastFocusedElementRef.current) {
          lastFocusedElementRef.current.focus({ preventScroll: true });
          lastFocusedElementRef.current = null;
          isFocusWithinRef.current = false;
        }
      };
    }
  }, [listRef.current]);

  if (!toasts.length) return null;

  return (
    // Remove item from normal navigation flow, only available via hotkey
    <section aria-label={`${containerAriaLabel} ${hotkeyLabel}`} tabIndex={-1}>
      {possiblePositions.map((position, index) => {
        const [y, x] = position.split("-");
        return (
          <ol
            key={position}
            dir={dir === "auto" ? getDocumentDirection() : dir}
            tabIndex={-1}
            ref={listRef}
            data-sonner-toaster
            data-y-position={y}
            data-x-position={x}
            style={
              {
                "--front-toast-height": `${heights[0]?.height}px`,
                "--offset":
                  typeof offset === "number"
                    ? `${offset}px`
                    : offset || VIEWPORT_OFFSET,
                "--width": `${TOAST_WIDTH}px`,
                "--gap": `${GAP}px`,
              } as CSSProperties
            }
            onBlur={(event) => {
              if (
                isFocusWithinRef.current &&
                !event.currentTarget.contains(event.relatedTarget)
              ) {
                isFocusWithinRef.current = false;
                if (lastFocusedElementRef.current) {
                  lastFocusedElementRef.current.focus({ preventScroll: true });
                  lastFocusedElementRef.current = null;
                }
              }
            }}
            onFocus={(event) => {
              const isNotDismissible =
                event.target instanceof HTMLElement &&
                event.target.dataset.dismissible === "false";

              if (isNotDismissible) return;

              if (!isFocusWithinRef.current) {
                isFocusWithinRef.current = true;
                lastFocusedElementRef.current =
                  event.relatedTarget as HTMLElement;
              }
            }}
            onMouseEnter={() => setExpanded(true)}
            onMouseMove={() => setExpanded(true)}
            onMouseLeave={() => {
              // Avoid setting expanded to false when interacting with a toast, e.g. swiping
              if (!interacting) {
                setExpanded(false);
              }
            }}
            onPointerDown={(event) => {
              const isNotDismissible =
                event.target instanceof HTMLElement &&
                event.target.dataset.dismissible === "false";

              if (isNotDismissible) return;
              setInteracting(true);
            }}
            onPointerUp={() => setInteracting(false)}
          >
            {toasts
              .filter(
                (toast) =>
                  (!toast.position && index === 0) ||
                  toast.position === position
              )
              .map((toast, index) => (
                <Toast
                  key={toast.id}
                  index={index}
                  toast={toast}
                  duration={toastOptions?.duration ?? duration}
                  visibleToasts={visibleToasts}
                  closeIcon={closeIcon}
                  interacting={interacting}
                  position={position}
                  removeToast={removeToast}
                  toasts={toasts.filter((t) => t.position == toast.position)}
                  heights={heights.filter((h) => h.position == toast.position)}
                  setHeights={setHeights}
                  expandByDefault={expand}
                  gap={gap}
                  loadingIcon={loadingIcon}
                  expanded={expanded}
                  severity={toast.severity}
                  color={toast.color}
                  variant={toast.variant}
                  alertSx={alertSx}
                />
              ))}
          </ol>
        );
      })}
    </section>
  );
};
