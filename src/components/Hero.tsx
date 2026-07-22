import { images, profile, stats } from "../data/content";
import { GlassButton } from "./GlassButton";
import { GitHubIcon, GmailIcon, LinkedInIcon } from "./icons/SocialIcons";
import "./Hero.css";

function StatIcon({ type }: { type: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "users":
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "growth":
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="M7 14l4-4 4 4 5-6" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      );
  }
}

export function Hero() {
  return (
    <section
      id="home"
      className="hero"
      style={{ backgroundImage: `url(${images.hero})` }}
    >
      <div className="hero__overlay" />
      <div className="hero__content container">
        <p className="hero__eyebrow">{profile.title}</p>
        <h1 className="hero__title">
          Systems-Focused
          <br />
          Full-Stack Engineer.
        </h1>

        <div className="hero__cta-row">
          <GlassButton variant="glass" href="#contact">
            Get in Touch
          </GlassButton>
          <GlassButton
            variant="glass"
            href={profile.resumeUrl}
            className="hero__resume-btn"
          >
            Download Resume
          </GlassButton>
          <div className="hero__socials" aria-label="Social links">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hero__social"
            >
              <GitHubIcon size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hero__social"
            >
              <LinkedInIcon size={16} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Gmail"
              className="hero__social"
            >
              <GmailIcon size={16} />
            </a>
          </div>
          <p className="hero__support">
            Building enterprise data pipelines, Kafka-driven integrations, and
            TypeScript backends that turn hours of reporting into seconds.
          </p>
        </div>

        <div className="hero__stats">
          {stats.map((stat) => (
            <div key={stat.label} className="hero__stat">
              <span className="hero__stat-icon">
                <StatIcon type={stat.icon} />
              </span>
              <div>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
