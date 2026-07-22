import { useState } from "react";
import { testimonials } from "../data/content";
import "./Testimonials.css";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const visible = [
    testimonials[index % testimonials.length],
    testimonials[(index + 1) % testimonials.length],
    testimonials[(index + 2) % testimonials.length],
  ];

  return (
    <section id="skills" className="testimonials section">
      <div className="container">
        <p className="testimonials__eyebrow">Skills</p>
        <h2 className="heading testimonials__title">
          Tools I Use to{" "}
          <span className="accent">Ship Systems</span>
        </h2>
        <p className="muted testimonials__subtitle">
          Languages, platforms, and AI tooling from day-to-day full-stack work.
        </p>

        <div className="testimonials__grid">
          {visible.map((item) => (
            <article key={`${item.name}-${index}`} className="testimonials__card">
              <div className="testimonials__card-top">
                <span className="testimonials__link-icon" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L13 20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="testimonials__quote" aria-hidden>
                  ”
                </span>
              </div>
              <p className="testimonials__text">{item.quote}</p>
              <div className="testimonials__author">
                <img src={item.avatar} alt="" />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="testimonials__nav">
          <button
            type="button"
            className="testimonials__btn"
            aria-label="Previous skill groups"
            onClick={() =>
              setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
            }
          >
            ←
          </button>
          <button
            type="button"
            className="testimonials__btn testimonials__btn--dark"
            aria-label="Next skill groups"
            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
