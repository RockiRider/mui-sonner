import React from "react";
import {
  useState,
  useRef,
  useMemo,
  useEffect,
  useLayoutEffect,
  useCallback,
  ReactNode,
  CSSProperties,
  Dispatch,
  SetStateAction,
} from "react";
import { Loader } from "./assets";
import {
  ToastT,
  HeightT,
  Position,
  ToastSeverity,
  ToastVariant,
} from "./types";
import {
  GAP,
  SWIPE_THRESHOLD,
  TIME_BEFORE_UNMOUNT,
  TOAST_LIFETIME,
} from "./constants";
import {
  Alert,
  AlertTitle,
  Button,
  IconButton,
  Typography,
} from "@mui/material";

interface ToastProps {
  toast: ToastT;
  toasts: ToastT[];
  index: number;
  expanded: boolean;
  invert: boolean;
  heights: HeightT[];
  setHeights: Dispatch<SetStateAction<HeightT[]>>;
  removeToast: (toast: ToastT) => void;
  gap?: number;
  position: Position;
  visibleToasts: number;
  expandByDefault: boolean;
  interacting: boolean;
  style?: CSSProperties;
  cancelButtonStyle?: CSSProperties;
  actionButtonStyle?: CSSProperties;
  duration?: number;
  unstyled?: boolean;
  loadingIcon?: ReactNode;
  closeIcon?: ReactNode;
  closeButtonAriaLabel?: string;
  severity?: ToastSeverity;
  color?: ToastSeverity;
  variant?: ToastVariant;
}

export const Toast = ({
  invert: ToasterInvert,
  toast,
  unstyled,
  interacting,
  setHeights,
  visibleToasts,
  heights,
  index,
  toasts,
  expanded,
  removeToast,
  closeIcon: closeIconFromToaster,
  style,
  actionButtonStyle,
  duration: durationFromToaster,
  position,
  gap = GAP,
  loadingIcon: loadingIconProp,
  expandByDefault,
  closeButtonAriaLabel = "Close toast",
  severity = "info",
  variant = "filled",
  color,
}: ToastProps) => {
  const [mounted, setMounted] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [swiping, setSwiping] = useState(false);
  const [swipeOut, setSwipeOut] = useState(false);
  const [offsetBeforeRemove, setOffsetBeforeRemove] = useState(0);
  const [initialHeight, setInitialHeight] = useState(0);
  const dragStartTime = useRef<Date | null>(null);
  const toastRef = useRef<HTMLLIElement>(null);
  const isFront = index === 0;
  const isVisible = index + 1 <= visibleToasts;
  const toastType = toast.type;
  const dismissible = toast.dismissible !== false;
  // Height index is used to calculate the offset as it gets updated before the toast array, which means we can calculate the new layout faster.
  const heightIndex = useMemo(
    () => heights.findIndex((height) => height.toastId === toast.id) || 0,
    [heights, toast.id]
  );

  const duration = useMemo(
    () => toast.duration || durationFromToaster || TOAST_LIFETIME,
    [toast.duration, durationFromToaster]
  );
  const closeTimerStartTimeRef = useRef(0);
  const offset = useRef(0);
  const lastCloseTimerStartTimeRef = useRef(0);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const [y, x] = position.split("-");
  const toastsHeightBefore = useMemo(() => {
    return heights.reduce((prev, curr, reducerIndex) => {
      // Calculate offset up until current  toast
      if (reducerIndex >= heightIndex) {
        return prev;
      }

      return prev + curr.height;
    }, 0);
  }, [heights, heightIndex]);
  const invert = toast.invert || ToasterInvert;
  const disabled = toastType === "loading";

  offset.current = useMemo(
    () => heightIndex * gap + toastsHeightBefore,
    [heightIndex, toastsHeightBefore]
  );

  useEffect(() => {
    // Trigger enter animation without using CSS animation
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;
    const toastNode = toastRef.current;
    if (toastNode) {
      const originalHeight = toastNode.style.height;
      toastNode.style.height = "auto";
      const newHeight = toastNode.getBoundingClientRect().height;
      toastNode.style.height = originalHeight;

      setInitialHeight(newHeight);

      setHeights((heights) => {
        const alreadyExists = heights.find(
          (height) => height.toastId === toast.id
        );
        if (!alreadyExists) {
          return [
            {
              toastId: toast.id,
              height: newHeight,
              position: toast.position,
            } as HeightT,
            ...heights,
          ];
        } else {
          return heights.map((height) =>
            height.toastId === toast.id
              ? { ...height, height: newHeight }
              : height
          );
        }
      });
    }
  }, [mounted, toast.title, toast.description, setHeights, toast.id]);

  const deleteToast = useCallback(() => {
    // Save the offset for the exit swipe animation
    setRemoved(true);
    setOffsetBeforeRemove(offset.current);
    setHeights((h) => h.filter((height) => height.toastId !== toast.id));

    setTimeout(() => {
      removeToast(toast);
    }, TIME_BEFORE_UNMOUNT);
  }, [toast, removeToast, setHeights, offset]);

  useEffect(() => {
    if (
      (toast.promise && toastType === "loading") ||
      toast.duration === Infinity ||
      toast.type === "loading"
    )
      return;
    let timeoutId: NodeJS.Timeout;
    let remainingTime = duration;
    // Pause the timer on each hover
    const pauseTimer = () => {
      if (lastCloseTimerStartTimeRef.current < closeTimerStartTimeRef.current) {
        // Get the elapsed time since the timer started
        const elapsedTime =
          new Date().getTime() - closeTimerStartTimeRef.current;

        remainingTime = remainingTime - elapsedTime;
      }

      lastCloseTimerStartTimeRef.current = new Date().getTime();
    };

    const startTimer = () => {
      closeTimerStartTimeRef.current = new Date().getTime();

      // Let the toast know it has started
      timeoutId = setTimeout(() => {
        toast.onAutoClose?.(toast);
        deleteToast();
      }, remainingTime);
    };

    if (expanded || interacting) {
      pauseTimer();
    } else {
      startTimer();
    }

    return () => clearTimeout(timeoutId);
  }, [
    expanded,
    interacting,
    expandByDefault,
    toast,
    duration,
    deleteToast,
    toast.promise,
    toastType,
  ]);

  useEffect(() => {
    const toastNode = toastRef.current;

    if (toastNode) {
      const height = toastNode.getBoundingClientRect().height;

      // Add toast height tot heights array after the toast is mounted
      setInitialHeight(height);
      setHeights((h) => [
        { toastId: toast.id, height, position: toast.position } as HeightT,
        ...h,
      ]);

      return () =>
        setHeights((h) => h.filter((height) => height.toastId !== toast.id));
    }
  }, [setHeights, toast.id]);

  useEffect(() => {
    if (toast.delete) {
      deleteToast();
    }
  }, [deleteToast, toast.delete]);

  function getLoadingIcon() {
    if (loadingIconProp) {
      return (
        <div className="sonner-loader" data-visible={toastType === "loading"}>
          {loadingIconProp}
        </div>
      );
    }
    return <Loader visible={toastType === "loading"} />;
  }

  return (
    <li
      aria-live={toast.important ? "assertive" : "polite"}
      aria-atomic="true"
      role="status"
      tabIndex={0}
      ref={toastRef}
      data-sonner-toast=""
      data-styled={!Boolean(toast.jsx || toast.unstyled || unstyled)}
      data-mounted={mounted}
      data-promise={Boolean(toast.promise)}
      data-removed={removed}
      data-visible={isVisible}
      data-y-position={y}
      data-x-position={x}
      data-index={index}
      data-front={isFront}
      data-swiping={swiping}
      data-dismissible={dismissible}
      data-invert={invert}
      data-swipe-out={swipeOut}
      data-expanded={Boolean(expanded || (expandByDefault && mounted))}
      style={
        {
          "--index": index,
          "--toasts-before": index,
          "--z-index": toasts.length - index,
          "--offset": `${removed ? offsetBeforeRemove : offset.current}px`,
          "--initial-height": expandByDefault ? "auto" : `${initialHeight}px`,
          ...style,
          ...toast.style,
          padding: 0,
        } as React.CSSProperties
      }
      onPointerDown={(event) => {
        if (disabled || !dismissible) return;
        dragStartTime.current = new Date();
        setOffsetBeforeRemove(offset.current);
        // Ensure we maintain correct pointer capture even when going outside of the toast (e.g. when swiping)
        (event.target as HTMLElement).setPointerCapture(event.pointerId);
        if ((event.target as HTMLElement).tagName === "BUTTON") return;
        setSwiping(true);
        pointerStartRef.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={() => {
        if (swipeOut || !dismissible) return;

        pointerStartRef.current = null;
        const swipeAmount = Number(
          toastRef.current?.style
            .getPropertyValue("--swipe-amount")
            .replace("px", "") || 0
        );
        const timeTaken = dragStartTime.current
          ? new Date().getTime() - dragStartTime.current.getTime()
          : 0;
        const velocity = Math.abs(swipeAmount) / timeTaken;

        // Remove only if threshold is met
        if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) {
          setOffsetBeforeRemove(offset.current);
          toast.onDismiss?.(toast);
          deleteToast();
          setSwipeOut(true);
          return;
        }

        toastRef.current?.style.setProperty("--swipe-amount", "0px");
        setSwiping(false);
      }}
      onPointerMove={(event) => {
        if (!pointerStartRef.current || !dismissible) return;

        const yPosition = event.clientY - pointerStartRef.current.y;
        const xPosition = event.clientX - pointerStartRef.current.x;

        const clamp = y === "top" ? Math.min : Math.max;
        const clampedY = clamp(0, yPosition);
        const swipeStartThreshold = event.pointerType === "touch" ? 10 : 2;
        const isAllowedToSwipe = Math.abs(clampedY) > swipeStartThreshold;

        if (isAllowedToSwipe) {
          toastRef.current?.style.setProperty(
            "--swipe-amount",
            `${yPosition}px`
          );
        } else if (Math.abs(xPosition) > swipeStartThreshold) {
          // User is swiping in wrong direction so we disable swipe gesture
          // for the current pointer down interaction
          pointerStartRef.current = null;
        }
      }}
    >
      <Alert
        sx={{ width: "100%" }}
        severity={severity}
        icon={toast.icon}
        variant={isFront ? variant : expanded ? variant : "outlined"}
        color={color}
        action={
          toast.action ? (
            <Button
              variant="contained"
              style={toast.actionButtonStyle || actionButtonStyle}
              onClick={(event) => {
                toast.action?.onClick(event);
                if (event.defaultPrevented) return;
                deleteToast();
              }}
            >
              {toast.action.label}
            </Button>
          ) : toast.closeButton ? (
            <IconButton
              size="small"
              color="inherit"
              aria-label={closeButtonAriaLabel}
              onClick={() => {
                deleteToast();
              }}
            >
              {closeIconFromToaster}
            </IconButton>
          ) : undefined
        }
      >
        {toast.title && <AlertTitle>{toast.title}</AlertTitle>}
        <>
          {toast.promise && (
            <>
              {toast.promise || toast.type === "loading"
                ? getLoadingIcon()
                : null}
            </>
          )}
          <div data-content="">
            {toast.description && (
              <div data-description="">
                <Typography>{toast.description}</Typography>
              </div>
            )}
          </div>
        </>
      </Alert>
    </li>
  );
};
