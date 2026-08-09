import { useState } from "react";
import { testimonials } from "../data/content";
import { Reveal } from "./Reveal";
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
        <Reveal>
          <p className="testimonials__eyebrow">Skills</p>
          <h2 className="heading testimonials__title">
            Tools I Use to <span className="accent">Ship Systems</span>
          </h2>
          <p className="muted testimonials__subtitle">
            Languages, platforms, and AI tooling from day-to-day full-stack work.
          </p>
        </Reveal>

        <Reveal className="testimonials__grid" stagger key={index}>
          {visible.map((item) => (
            <article key={`${item.name}-${index}`} className="testimonials__card">
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

        <Reveal className="testimonials__nav" delay={60}>
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
        </Reveal>
      </div>
    </section>
  );
}
