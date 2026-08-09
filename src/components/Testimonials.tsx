import { useEffect, useRef, useState } from "react";
import { testimonials } from "../data/content";
import { Reveal } from "./Reveal";
import "./Testimonials.css";

const AUTO_MS = 4200;
const MOBILE_MQ = "(max-width: 900px)";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isMobile || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [isMobile, paused]);

  useEffect(() => {
    return () => window.clearTimeout(resumeTimer.current);
  }, []);

  const pauseAutoplayBriefly = () => {
    setPaused(true);
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), AUTO_MS * 2);
  };

  const goPrev = () => {
    pauseAutoplayBriefly();
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  const goNext = () => {
    pauseAutoplayBriefly();
    setIndex((i) => (i + 1) % testimonials.length);
  };

  const goTo = (i: number) => {
    pauseAutoplayBriefly();
    setIndex(i);
  };

  const visible = isMobile
    ? [testimonials[index % testimonials.length]]
    : [
        testimonials[index % testimonials.length],
        testimonials[(index + 1) % testimonials.length],
        testimonials[(index + 2) % testimonials.length],
      ];

  return (
    <section id="skills" className="testimonials section">
      <div className="container">
        <Reveal>
          <p className="testimonials__eyebrow">Skills</p>
          <h2 className="heading testimonials__title">
            Tools I Use to <span className="accent">Ship Systems</span>
          </h2>
          <p className="muted testimonials__subtitle">
            Languages, platforms, and AI tooling from day-to-day full-stack work.
          </p>
        </Reveal>

        <Reveal
          className={`testimonials__grid ${isMobile ? "testimonials__grid--mobile" : ""}`}
          stagger={!isMobile}
          key={isMobile ? `m-${index}` : `d-${index}`}
        >
          {visible.map((item) => (
            <article
              key={`${item.name}-${index}`}
              className="testimonials__card"
            >
              <p className="testimonials__text">{item.quote}</p>
              <div className="testimonials__author">
                <img
                  src={item.avatar}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
            </article>
          ))}
        </Reveal>

        {isMobile ? (
          <div className="testimonials__dots" role="tablist" aria-label="Skill groups">
            {testimonials.map((item, i) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={item.name}
                className={`testimonials__dot ${i === index ? "testimonials__dot--active" : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        ) : null}

        <Reveal className="testimonials__nav" delay={60}>
          <button
            type="button"
            className="testimonials__btn"
            aria-label="Previous skill groups"
            onClick={goPrev}
          >
            ←
          </button>
          <button
            type="button"
            className="testimonials__btn testimonials__btn--dark"
            aria-label="Next skill groups"
            onClick={goNext}
          >
            →
          </button>
        </Reveal>
      </div>
    </section>
  );
}
