import { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const CloseIcon = ({ className = "" }) => (
  <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" className={className} aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.4697 13.5303L13 14.0607L14.0607 13L13.5303 12.4697L9.06065 7.99999L13.5303 3.53032L14.0607 2.99999L13 1.93933L12.4697 2.46966L7.99999 6.93933L3.53032 2.46966L2.99999 1.93933L1.93933 2.99999L2.46966 3.53032L6.93933 7.99999L2.46966 12.4697L1.93933 13L2.99999 14.0607L3.53032 13.5303L7.99999 9.06065L12.4697 13.5303Z"
    />
  </svg>
);

let root = null;
let toastId = 0;

const toastStore = {
  toasts: [],
  listeners: new Set(),

  add(text, type = "message", preserve = false) {
    const id = toastId++;
    const toast = { id, text, type, preserve };

    if (!preserve) {
      toast.remaining = 3000;
      toast.start = Date.now();

      const close = () => {
        this.remove(id);
      };

      toast.timeout = window.setTimeout(close, toast.remaining);
      toast.pause = () => {
        if (!toast.timeout) return;
        window.clearTimeout(toast.timeout);
        toast.timeout = undefined;
        toast.remaining -= Date.now() - toast.start;
      };
      toast.resume = () => {
        if (toast.timeout) return;
        toast.start = Date.now();
        toast.timeout = window.setTimeout(close, toast.remaining);
      };
    }

    this.toasts.push(toast);
    this.notify();
  },

  remove(id) {
    const toast = this.toasts.find((item) => item.id === id);
    if (toast?.timeout) window.clearTimeout(toast.timeout);
    this.toasts = this.toasts.filter((item) => item.id !== id);
    this.notify();
  },

  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  },

  notify() {
    this.listeners.forEach((listener) => listener());
  },
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  const [shownIds, setShownIds] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const measureRef = (toast) => (node) => {
    if (node && toast.measuredHeight == null) {
      toast.measuredHeight = node.getBoundingClientRect().height;
      toastStore.notify();
    }
  };

  useEffect(() => {
    setToasts([...toastStore.toasts]);
    return toastStore.subscribe(() => setToasts([...toastStore.toasts]));
  }, []);

  useEffect(() => {
    const unseen = toasts.filter((toast) => !shownIds.includes(toast.id)).map((toast) => toast.id);
    if (unseen.length) {
      requestAnimationFrame(() => {
        setShownIds((current) => [...current, ...unseen]);
      });
    }
  }, [shownIds, toasts]);

  const lastVisibleCount = 3;
  const lastVisibleStart = Math.max(0, toasts.length - lastVisibleCount);

  const getFinalTransform = (index, length) => {
    if (index === length - 1) return "none";
    const offset = length - 1 - index;
    let translateY = toasts[length - 1]?.measuredHeight || 63;

    for (let i = length - 1; i > index; i--) {
      translateY += isHovered ? (toasts[i - 1]?.measuredHeight || 63) + 10 : 20;
    }

    const scale = isHovered ? 1 : 1 - 0.05 * offset;
    return `translate3d(0, calc(100% - ${translateY}px), ${-offset}px) scale(${scale})`;
  };

  const visibleToasts = toasts.slice(lastVisibleStart);
  const containerHeight = visibleToasts.reduce((height, toast) => height + (toast.measuredHeight ?? 63), 0);

  return (
    <div className="toast-viewport" style={{ height: containerHeight || 63 }} aria-live="polite" aria-atomic="true">
      <div
        className="toast-stack"
        style={{ height: containerHeight || 63 }}
        onMouseEnter={() => {
          setIsHovered(true);
          toastStore.toasts.forEach((toast) => toast.pause?.());
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          toastStore.toasts.forEach((toast) => toast.resume?.());
        }}
      >
        {toasts.map((toast, index) => {
          const isVisible = index >= lastVisibleStart;

          return (
            <div
              key={toast.id}
              ref={measureRef(toast)}
              className={`toast-card toast-${toast.type}${isVisible ? " is-visible" : ""}`}
              style={{
                transform: shownIds.includes(toast.id)
                  ? getFinalTransform(index, toasts.length)
                  : "translate3d(0, 100%, 150px) scale(1)",
              }}
            >
              <span>{toast.text}</span>
              <button className="toast-close" type="button" aria-label="Dismiss" onClick={() => toastStore.remove(toast.id)}>
                <CloseIcon />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function mountContainer() {
  if (root) return;
  const element = document.createElement("div");
  document.body.appendChild(element);
  root = createRoot(element);
  root.render(<ToastContainer />);
}

export const toast = {
  message(text, preserve) {
    mountContainer();
    toastStore.add(text, "message", preserve);
  },
  success(text) {
    mountContainer();
    toastStore.add(text, "success");
  },
  warning(text) {
    mountContainer();
    toastStore.add(text, "warning");
  },
  error(text) {
    mountContainer();
    toastStore.add(text, "error");
  },
};

export const useToasts = () => ({
  message: useCallback(({ text, preserve }) => toast.message(text, preserve), []),
  success: useCallback((text) => toast.success(text), []),
  warning: useCallback((text) => toast.warning(text), []),
  error: useCallback((text) => toast.error(text), []),
});
