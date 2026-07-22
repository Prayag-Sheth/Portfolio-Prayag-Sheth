import { useEffect, useRef, useState } from "react";
import "./CustomCursor.css";

function parseRgba(color: string): [number, number, number, number] | null {
  const m = color.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/i,
  );
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3]), m[4] === undefined ? 1 : Number(m[4])];
}

function isDarkAtPoint(x: number, y: number): boolean {
  const el = document.elementFromPoint(x, y);
  if (!el) return false;

  if (
    el.closest(
      ".hero, .navbar, .navbar__inner, .services__card--active, .process__expanded, .footer__social--filled",
    )
  ) {
    return true;
  }

  let node: Element | null = el;
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node);
    const bg = parseRgba(style.backgroundColor);
    if (bg && bg[3] >= 0.45) {
      const luminance = (0.299 * bg[0] + 0.587 * bg[1] + 0.114 * bg[2]) / 255;
      return luminance < 0.45;
    }
    node = node.parentElement;
  }

  return false;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const scrollTimer = useRef(0);
  const clickTimer = useRef(0);
  const lastScrollY = useRef(typeof window !== "undefined" ? window.scrollY : 0);

  const [enabled, setEnabled] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [clickKey, setClickKey] = useState(0);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const updateEnabled = () => setEnabled(mq.matches);
    updateEnabled();
    mq.addEventListener("change", updateEnabled);
    return () => mq.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-on");

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      setOnDark(isDarkAtPoint(e.clientX, e.clientY));
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const interactive = el?.closest(
        "a, button, [role='button'], input, textarea, select, label",
      );
      setHovering(Boolean(interactive));
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      if (Math.abs(delta) > 0.5) {
        setDirection(delta > 0 ? "down" : "up");
        setScrolling(true);
        window.clearTimeout(scrollTimer.current);
        scrollTimer.current = window.setTimeout(() => setScrolling(false), 180);
      }
      lastScrollY.current = y;
      setOnDark(isDarkAtPoint(target.current.x, target.current.y));
    };

    const onDown = () => {
      setClicking(true);
      setClickKey((k) => k + 1);
      window.clearTimeout(clickTimer.current);
      clickTimer.current = window.setTimeout(() => setClicking(false), 420);
    };

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.42;
      pos.current.y += (target.current.y - pos.current.y) * 0.42;
      const node = cursorRef.current;
      if (node) {
        node.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousedown", onDown);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-on");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousedown", onDown);
      window.clearTimeout(scrollTimer.current);
      window.clearTimeout(clickTimer.current);
      cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className={[
        "custom-cursor",
        onDark ? "custom-cursor--on-dark" : "",
        scrolling ? "custom-cursor--scrolling" : "",
        hovering ? "custom-cursor--hover" : "",
        clicking ? "custom-cursor--click" : "",
        `custom-cursor--${direction}`,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <span className="custom-cursor__ring" />
      <span className="custom-cursor__dot" />
      <span key={clickKey} className="custom-cursor__ripple" />
      <span className="custom-cursor__arrow">
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 2.5v9M3.5 7.5 7 11l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
