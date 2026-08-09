import { useLenis } from "lenis/react";
import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { getCaseStudyBySlug } from "../data/caseStudies";
import { profile, services } from "../data/content";
import { GlassButton } from "./GlassButton";
import { Reveal } from "./Reveal";
import "./Services.css";

function hasPublishedCaseStudy(slug: string) {
  return Boolean(getCaseStudyBySlug(slug)?.content);
}

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function applyCardWave(grid: HTMLElement, gridProgress: number) {
  const vh = window.innerHeight || 1;
  const mobile = window.matchMedia("(max-width: 700px)").matches;
  const cards = grid.querySelectorAll<HTMLElement>("[data-exp-card]");

  cards.forEach((card) => {
    const index = Number(card.dataset.index ?? 0);
    let amount: number;

    if (mobile) {
      // Per-card scrub — stacked layout was finishing the whole grid off-screen
      const rect = card.getBoundingClientRect();
      const start = vh * 0.9;
      const end = vh * 0.42;
      amount = smoothstep((start - rect.top) / Math.max(1, start - end));
    } else {
      const delay = index * 0.09;
      amount = smoothstep((gridProgress - delay) / 0.62);
    }

    const rounded = amount.toFixed(3);
    if (card.dataset.p === rounded) return;
    card.dataset.p = rounded;
    card.style.setProperty("--p", rounded);
  });
}

function readTargetProgress(grid: HTMLElement, scrollY: number, maxScroll: number) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return 1;
  }

  const rect = grid.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const mobile = window.matchMedia("(max-width: 700px)").matches;
  // Mobile: start later / finish later so motion happens on-screen
  const start = mobile ? vh * 0.88 : vh * 1.15;
  const end = mobile ? vh * 0.12 : vh * 0.22;
  let progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));

  const limit = Math.max(1, maxScroll);
  if (scrollY >= limit - 4) {
    progress = Math.max(progress, 1);
  }

  return progress;
}

function ArrowCircle({ light = false }: { light?: boolean }) {
  return (
    <span className={`services__arrow ${light ? "services__arrow--light" : ""}`}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path
          d="M3 7h8M7 3l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Services() {
  const gridRef = useRef<HTMLDivElement>(null);
  const targetProgress = useRef(0);
  const visualProgress = useRef(0);
  const rafRef = useRef(0);
  const running = useRef(false);
  const navigate = useNavigate();
  const openingRef = useRef(false);

  const tick = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) {
      running.current = false;
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      visualProgress.current = 1;
      applyCardWave(grid, 1);
      running.current = false;
      return;
    }

    const current = visualProgress.current;
    const target = targetProgress.current;
    const next = current + (target - current) * 0.14;
    visualProgress.current = Math.abs(target - next) < 0.001 ? target : next;
    applyCardWave(grid, visualProgress.current);

    if (visualProgress.current !== target) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      running.current = false;
    }
  }, []);

  const scheduleTick = useCallback(() => {
    if (running.current) return;
    running.current = true;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const updateTarget = useCallback(
    (scrollY?: number, maxScroll?: number) => {
      const grid = gridRef.current;
      if (!grid) return;
      const doc = document.documentElement;
      const y = scrollY ?? window.scrollY ?? doc.scrollTop ?? 0;
      const limit =
        maxScroll ?? Math.max(1, doc.scrollHeight - window.innerHeight);
      targetProgress.current = readTargetProgress(grid, y, limit);
      scheduleTick();
    },
    [scheduleTick],
  );

  useLenis((lenis) => {
    updateTarget(lenis.scroll, lenis.limit);
  });

  useEffect(() => {
    updateTarget();
    const onResize = () => updateTarget();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
      running.current = false;
    };
  }, [updateTarget]);

  const openCaseStudy = (
    event: MouseEvent<HTMLButtonElement>,
    slug: string,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (openingRef.current) return;

    const card = event.currentTarget.closest<HTMLElement>("[data-exp-card]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const go = () => {
      openingRef.current = false;
      navigate(`/experience/${slug}`);
    };

    if (reduce || !card) {
      go();
      return;
    }

    openingRef.current = true;
    card.classList.add("services__card--opening");
    window.setTimeout(go, 320);
  };

  return (
    <section id="experience" className="services section services--blur">
      <div className="container">
        <Reveal className="services__header">
          <div className="services__header-copy">
            <h2 className="heading services__title">
              <span className="accent">Professional</span> Experience
            </h2>
            <p className="muted services__intro">
              Software Engineer – Full Stack · Jul 2024 – Present · Ahmedabad.
              Platforms that <strong>move enterprise data</strong> with
              reliability and speed.
            </p>
          </div>
        </Reveal>

        <div
          ref={gridRef}
          className="services__grid"
          style={{ "--grid-progress": 0 } as CSSProperties}
        >
          {services.map((service, index) => (
            <article
              key={service.slug}
              data-exp-card
              data-index={index}
              className={`services__card ${service.active ? "services__card--active" : ""}`}
              style={
                {
                  "--card-i": index,
                  "--p": 0,
                } as CSSProperties
              }
            >
              <div className="services__card-surface">
                <div className="services__card-top">
                  <span className="services__date">{service.date}</span>
                  {hasPublishedCaseStudy(service.slug) ? (
                    <button
                      type="button"
                      className="services__arrow-link"
                      aria-label={`Open case study: ${service.title}`}
                      onClick={(event) => openCaseStudy(event, service.slug)}
                    >
                      <ArrowCircle light={service.active} />
                    </button>
                  ) : null}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="services__media">
                  <img
                    src={service.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        <Reveal className="services__cta" delay={100}>
          <GlassButton variant="purple" href={profile.resumeUrl}>
            Download Resume
          </GlassButton>
        </Reveal>
      </div>
    </section>
  );
}
