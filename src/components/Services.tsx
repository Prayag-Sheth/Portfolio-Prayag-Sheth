import { Link } from "react-router-dom";
import { profile, services } from "../data/content";
import { GlassButton } from "./GlassButton";
import { Reveal } from "./Reveal";
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
        <Reveal className="services__header">
          <h2 className="heading services__title">
            <span className="accent">Professional</span> Experience
          </h2>
          <p className="muted services__intro">
            Software Engineer – Full Stack · Jul 2024 – Present · Ahmedabad.
            Platforms that <strong>move enterprise data</strong> with
            reliability and speed.
          </p>
        </Reveal>

        <Reveal className="services__grid" stagger>
          {services.map((service) => (
            <article
              key={service.slug}
              className={`services__card ${service.active ? "services__card--active" : ""}`}
            >
              <div className="services__card-top">
                <span className="services__date">{service.date}</span>
                <Link
                  to={`/experience/${service.slug}`}
                  className="services__arrow-link"
                  aria-label={`Open case study: ${service.title}`}
                >
                  <ArrowCircle light={service.active} />
                </Link>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <img
                src={service.image}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </article>
          ))}
        </Reveal>

        <Reveal className="services__cta" delay={100}>
          <GlassButton variant="purple" href={profile.resumeUrl}>
            Download Resume
          </GlassButton>
        </Reveal>
      </div>
    </section>
  );
}
