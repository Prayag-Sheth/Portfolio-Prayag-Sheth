import { useEffect, useRef } from "react";

type Options = {
  /** Once visible, stop observing (default true). */
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
};

/**
 * Adds `is-revealed` when the element enters the viewport.
 * Respects prefers-reduced-motion by revealing immediately.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: Options = {},
) {
  const {
    once = true,
    rootMargin = "0px 0px -10% 0px",
    threshold = 0.12,
  } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      el.classList.add("is-revealed");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        el.classList.add("is-revealed");
        if (once) io.unobserve(el);
      },
      { rootMargin, threshold },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, rootMargin, threshold]);

  return ref;
}
