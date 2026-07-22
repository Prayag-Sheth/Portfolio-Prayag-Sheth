import { profile, services } from "../data/content";
import { GlassButton } from "./GlassButton";
import "./Services.css";

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
  return (
    <section id="experience" className="services section">
      <div className="container">
        <div className="services__header">
          <h2 className="heading services__title">
            Experience at{" "}
            <span className="accent">Satva Technolabs</span>
          </h2>
          <p className="muted services__intro">
            Software Engineer – Full Stack · Jul 2024 – Jul 2026 · Ahmedabad.
            Platforms that <strong>move enterprise data</strong> with
            reliability and speed.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service) => (
            <article
              key={service.title}
              className={`services__card ${service.active ? "services__card--active" : ""}`}
            >
              <div className="services__card-top">
                <span className="services__date">{service.date}</span>
                <ArrowCircle light={service.active} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <img src={service.image} alt="" />
            </article>
          ))}
        </div>

        <div className="services__cta">
          <GlassButton variant="purple" href={profile.resumeUrl}>
            Download Resume
          </GlassButton>
        </div>
      </div>
    </section>
  );
}
