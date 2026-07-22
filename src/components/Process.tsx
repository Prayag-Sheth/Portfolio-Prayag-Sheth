import { images, processSteps } from "../data/content";
import { GlassButton } from "./GlassButton";
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
        <div className="process__header">
          <h2 className="heading process__title">
            <span className="accent">How I Build</span>, Simplified.
          </h2>
          <GlassButton variant="purple" href="#about">
            Learn More
          </GlassButton>
        </div>

        <div className="process__grid">
          <div className="process__steps">
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
          </div>

          <div className="process__media">
            <img
              src={images.process}
              alt="Engineering collaboration and systems work"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
