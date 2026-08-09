import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./GlassButton.css";

type Variant = "glass" | "purple" | "glass-light";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
  withArrow?: boolean;
  href?: string;
};

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3 7h8M7 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GlassButton({
  variant = "glass",
  children,
  withArrow = true,
  className = "",
  href,
  ...rest
}: Props) {
  const classes = `glass-btn glass-btn--${variant} ${className}`.trim();

  const inner = (
    <>
      <span className="glass-btn__label">{children}</span>
      {withArrow ? (
        <span className="glass-btn__arrow" aria-hidden>
          <ArrowIcon />
        </span>
      ) : null}
    </>
  );

  if (href) {
    const external = href.startsWith("http");
    const isPdf = href.endsWith(".pdf");
    const { type: _type, ...anchorRest } = rest;
    return (
      <a
        className={classes}
        href={href}
        target={external || isPdf ? "_blank" : undefined}
        rel={external || isPdf ? "noreferrer" : undefined}
        download={isPdf ? true : undefined}
        {...anchorRest}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {inner}
    </button>
  );
}
