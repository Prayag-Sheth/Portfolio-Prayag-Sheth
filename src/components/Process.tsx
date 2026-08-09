import { images, processSteps } from "../data/content";
import { GlassButton } from "./GlassButton";
import { Reveal } from "./Reveal";
import "./Process.css";

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
            <img
              src={images.process}
              alt="Engineering collaboration and systems work"
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
