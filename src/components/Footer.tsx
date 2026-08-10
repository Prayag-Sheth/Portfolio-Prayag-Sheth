import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef, type CSSProperties } from "react";
import { navLinks, profile } from "../data/content";
import { GitHubIcon, GmailIcon, LinkedInIcon } from "./icons/SocialIcons";
import { Reveal } from "./Reveal";
import "./Footer.css";

/** Smooth ease for a continuous “water” wave instead of stepped pops. */
function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function letterAmount(progress: number, delay: number, window: number) {
  return smoothstep((progress - delay) / window);
}

function applyLetterWave(el: HTMLElement, progress: number) {
  const letters = el.querySelectorAll<HTMLElement>("[data-wm-letter]");
  letters.forEach((node) => {
    const delay = Number(node.dataset.delay ?? 0);
    const win = Number(node.dataset.window ?? 0.45);
    const amount = letterAmount(progress, delay, win);
    node.style.setProperty("--p", amount.toFixed(4));
  });
}

function syncWordmarkProgress(
  el: HTMLElement,
  scrollY: number,
  maxScroll: number,
) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.style.setProperty("--wm-progress", "1");
    applyLetterWave(el, 1);
    return;
  }

  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const mobile = window.matchMedia("(max-width: 700px)").matches;
  const start = mobile ? vh * 0.82 : vh * 0.92;
  const end = mobile ? vh * 0.28 : vh * 0.42;
  let progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));

  const limit = Math.max(1, maxScroll);
  if (scrollY >= limit - 4) {
    progress = 1;
  } else if (scrollY >= limit * 0.97) {
    const t = (scrollY / limit - 0.97) / 0.03;
    progress = Math.max(progress, Math.min(1, t));
  }

  el.style.setProperty("--wm-progress", progress.toFixed(4));
  applyLetterWave(el, progress);
}

/**
 * Two separate flows (Prayag | Sheth).
 * When “y” in Prayag starts rising, “S” in Sheth starts at the same time.
 */
function prayagDelay(index: number) {
  // P nearly settled; rest of Prayag is its own faster cascade
  if (index === 0) return -0.25;
  return 0.04 + (index - 1) * 0.055;
}

function shethDelay(index: number) {
  // Separate Sheth flow — S locked to the same start as Prayag’s “y”
  const yStart = prayagDelay(3);
  return yStart + index * 0.06;
}

const PRAYAG_WINDOW = 0.48;
const SHETH_WINDOW = 0.55;

export function Footer() {
  const [firstName, lastName] = profile.name.split(" ");
  const wordmarkRef = useRef<HTMLHeadingElement>(null);

  const updateProgress = useCallback((scrollY?: number, maxScroll?: number) => {
    const el = wordmarkRef.current;
    if (!el) return;
    const doc = document.documentElement;
    const y = scrollY ?? window.scrollY ?? doc.scrollTop ?? 0;
    const limit =
      maxScroll ?? Math.max(1, doc.scrollHeight - window.innerHeight);
    syncWordmarkProgress(el, y, limit);
  }, []);

  useLenis((lenis) => {
    updateProgress(lenis.scroll, lenis.limit);
  });

  useEffect(() => {
    updateProgress();
    const onResize = () => updateProgress();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [updateProgress]);

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <Reveal className="footer__nav">
          <nav className="footer__links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <a className="footer__email" href={`mailto:${profile.email}`}>
            <span className="footer__email-icon" aria-hidden>
              <GmailIcon size={14} />
            </span>
            {profile.email}
          </a>
        </Reveal>

        <h2
          ref={wordmarkRef}
          className="footer__wordmark"
          aria-label={profile.name}
          style={{ "--wm-progress": 0 } as CSSProperties}
        >
          <span className="footer__wordmark-first" aria-hidden="true">
            {firstName.split("").map((letter, index) => {
              const lower = letter.toLowerCase();
              const isDescender = lower === "y" || lower === "g";
              const descenderClass = isDescender
                ? ` footer__letter--descender${lower === "y" ? " footer__letter--y" : ""}`
                : "";
              return (
                <span
                  key={`f-${letter}-${index}`}
                  className={`footer__letter footer__letter--first${descenderClass}`}
                  data-wm-letter
                  data-delay={prayagDelay(index)}
                  data-window={PRAYAG_WINDOW}
                  style={{ "--p": 0 } as CSSProperties}
                >
                  {letter}
                </span>
              );
            })}
          </span>
          <span className="footer__wordmark-fade" aria-hidden="true">
            {lastName.split("").map((letter, index) => (
              <span
                key={`l-${letter}-${index}`}
                className="footer__letter footer__letter--last"
                data-wm-letter
                data-delay={shethDelay(index)}
                data-window={SHETH_WINDOW}
                style={{ "--p": 0 } as CSSProperties}
              >
                {letter}
              </span>
            ))}
          </span>
        </h2>

        <div className="footer__bottom">
          <div className="footer__legal-left">
            <span>© 2026 {profile.name}</span>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
              {profile.phone}
            </a>
          </div>

          <div className="footer__socials" aria-label="Social links">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="footer__social"
            >
              <LinkedInIcon size={16} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="footer__social"
            >
              <GitHubIcon size={18} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Gmail"
              className="footer__social"
            >
              <GmailIcon size={16} />
            </a>
          </div>

          <div className="footer__legal-right">
            <span>{profile.location}</span>
            <a href={profile.resumeUrl}>Resume</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
