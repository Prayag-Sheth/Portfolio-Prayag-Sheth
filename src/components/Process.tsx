import { useEffect, useId, useState, type CSSProperties } from "react";
import { images, processSteps } from "../data/content";
import { GlassButton } from "./GlassButton";
import { Reveal } from "./Reveal";
import "./Process.css";

const TOUR_STEPS = [
  {
    id: "understand",
    label: "Understand",
    kicker: "01",
    blurb: "Clarify the problem, map requirements, and align on success metrics.",
    focus: "0",
  },
  {
    id: "architect",
    label: "Architect",
    kicker: "02",
    blurb: "Design the event-driven blueprint — data flow, services, and reliability.",
    focus: "1",
  },
  {
    id: "develop",
    label: "Develop",
    kicker: "03",
    blurb: "Build, containerize, and ship iteratively toward production-ready systems.",
    focus: "2",
  },
  {
    id: "full",
    label: "Full map",
    kicker: "All",
    blurb: "See the end-to-end flow. Swipe the map on phone, tap a section to open it.",
    focus: "full",
  },
] as const;

/** Exact card regions on process-how-i-build (1600×800) for full-map hotspots */
const MAP_HOTSPOTS = [
  {
    tourIndex: 0,
    label: "Understand",
    style: {
      left: "1.25%",
      top: "14.75%",
      width: "31.25%",
      height: "66.25%",
    } satisfies CSSProperties,
  },
  {
    tourIndex: 1,
    label: "Architect",
    style: {
      left: "32.5%",
      top: "14.75%",
      width: "30.63%",
      height: "66.25%",
    } satisfies CSSProperties,
  },
  {
    tourIndex: 2,
    label: "Develop",
    style: {
      left: "62.5%",
      top: "14.75%",
      width: "36.25%",
      height: "66.25%",
    } satisfies CSSProperties,
  },
] as const;

function StepArrow() {
  return (
    <span className="process__step-icon" aria-hidden>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M3 7h8M7 3l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Process() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [isPhone, setIsPhone] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 900px)").matches
      : false,
  );
  const titleId = useId();
  const activeTour = TOUR_STEPS[tourIndex] ?? TOUR_STEPS[0];

  const closeLightbox = () => {
    setLightboxOpen(false);
    setTourIndex(0);
  };

  const openLightbox = () => {
    setTourIndex(0);
    setLightboxOpen(true);
  };

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => setIsPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") {
        setTourIndex((i) => Math.min(TOUR_STEPS.length - 1, i + 1));
      }
      if (event.key === "ArrowLeft") {
        setTourIndex((i) => Math.max(0, i - 1));
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen]);

  return (
    <section className="process section">
      <div className="container">
        <Reveal className="process__header">
          <h2 className="heading process__title">
            <span className="accent">How I Build</span>, Simplified.
          </h2>
          <GlassButton variant="purple" href="#projects">
            Learn More
          </GlassButton>
        </Reveal>

        <div className="process__grid">
          <Reveal className="process__steps" stagger>
            {processSteps.map((step) =>
              step.expanded ? (
                <article key={step.title} className="process__expanded">
                  <div className="process__expanded-top">
                    <h3>{step.title}</h3>
                    <StepArrow />
                  </div>
                  <p>{step.body}</p>
                </article>
              ) : (
                <div key={step.title} className="process__step">
                  <p>{step.title}</p>
                  <StepArrow />
                </div>
              ),
            )}
            <p className="process__launch">
              Ship reliable systems that scale
              <span className="process__launch-arrow" aria-hidden>
                →
              </span>
            </p>
          </Reveal>

          <Reveal className="process__media" delay={140}>
            <button
              type="button"
              className="process__media-open"
              onClick={openLightbox}
              aria-label="Open interactive How I Build tour"
            >
              <img
                src={images.process}
                alt="How I Build process diagram"
                loading="lazy"
                decoding="async"
              />
              <span className="process__media-hint">Explore steps</span>
            </button>
          </Reveal>
        </div>
      </div>

      {lightboxOpen ? (
        <div
          className="process__lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={closeLightbox}
        >
          <div
            className="process__lightbox-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="process__tour-top">
              <div className="process__tour-heading">
                <p className="process__tour-eyebrow">Interactive walkthrough</p>
                <h3 id={titleId} className="process__tour-title">
                  How I Build
                </h3>
              </div>
              <button
                type="button"
                className="process__lightbox-close"
                aria-label="Close diagram"
                onClick={closeLightbox}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M3 3l8 8M11 3L3 11"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>

            <div
              className="process__tour-stage"
              data-focus={activeTour.focus}
              style={{ "--focus": activeTour.focus } as CSSProperties}
            >
              <div className="process__tour-frame">
                {activeTour.focus === "full" ? (
                  <div className="process__tour-map">
                    <img
                      src={images.process}
                      alt="Full How I Build process diagram"
                      className="process__tour-img"
                    />
                    <div className="process__tour-hotspots">
                      {MAP_HOTSPOTS.map((spot) => (
                        <button
                          key={spot.label}
                          type="button"
                          className="process__tour-hotspot"
                          style={spot.style}
                          onClick={() => setTourIndex(spot.tourIndex)}
                        >
                          <span className="process__tour-hotspot-label">
                            {spot.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="process__tour-back"
                    onClick={() => setTourIndex(TOUR_STEPS.length - 1)}
                    aria-label="Back to full map"
                  >
                    <img
                      src={images.process}
                      alt=""
                      className="process__tour-img process__tour-img--focus"
                    />
                    <img
                      src={images.process}
                      alt=""
                      className="process__tour-img process__tour-img--blur"
                      aria-hidden
                    />
                    <div className="process__tour-vignette" aria-hidden />
                  </button>
                )}
              </div>

              {activeTour.focus === "full" ? (
                <p className="process__tour-scroll-hint">
                  {isPhone
                    ? "Swipe to explore · tap a section to open"
                    : "Tap a section to zoom in · tap the zoomed image to return here"}
                </p>
              ) : (
                <p className="process__tour-scroll-hint">Tap the image to return to the full map</p>
              )}
            </div>

            <footer className="process__tour-footer">
              <div className="process__tour-copy">
                <span className="process__tour-kicker">{activeTour.kicker}</span>
                <strong>{activeTour.label}</strong>
                <p>{activeTour.blurb}</p>
              </div>

              <div className="process__tour-controls">
                <div className="process__tour-tabs" role="tablist" aria-label="Process steps">
                  {TOUR_STEPS.map((step, i) => (
                    <button
                      key={step.id}
                      type="button"
                      role="tab"
                      aria-selected={i === tourIndex}
                      className={`process__tour-tab ${i === tourIndex ? "process__tour-tab--active" : ""}`}
                      onClick={() => setTourIndex(i)}
                    >
                      {step.label}
                    </button>
                  ))}
                </div>

                <div className="process__tour-nav">
                  <button
                    type="button"
                    className="process__tour-nav-btn"
                    aria-label="Previous step"
                    disabled={tourIndex === 0}
                    onClick={() => setTourIndex((i) => Math.max(0, i - 1))}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="process__tour-nav-btn process__tour-nav-btn--next"
                    aria-label="Next step"
                    disabled={tourIndex === TOUR_STEPS.length - 1}
                    onClick={() =>
                      setTourIndex((i) => Math.min(TOUR_STEPS.length - 1, i + 1))
                    }
                  >
                    →
                  </button>
                </div>
              </div>
            </footer>
          </div>
        </div>
      ) : null}
    </section>
  );
}
