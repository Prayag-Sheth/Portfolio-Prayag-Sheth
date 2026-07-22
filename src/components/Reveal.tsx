import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

type Props = {
  children: ReactNode;
  className?: string;
  /** Extra delay after the element becomes visible (ms). */
  delay?: number;
  /** Stagger direct children when revealed. */
  stagger?: boolean;
  as?: ElementType;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  stagger = false,
  as: Tag = "div",
}: Props) {
  const ref = useReveal<HTMLElement>();

  const style =
    delay > 0
      ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
      : undefined;

  return (
    <Tag
      ref={ref}
      className={`reveal${stagger ? " reveal--stagger" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  );
}
