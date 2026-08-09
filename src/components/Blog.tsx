import { blogPosts, profile } from "../data/content";
import { GitHubIcon } from "./icons/SocialIcons";
import { Reveal } from "./Reveal";
import "./Blog.css";
import "./GlassButton.css";

export function Blog() {
  return (
    <section id="projects" className="blog section">
      <div className="container">
        <Reveal>
          <p className="blog__eyebrow">Projects</p>
          <h2 className="heading blog__title">
            Independent Work &amp; <span className="accent">Learning</span>
          </h2>
          <p className="muted blog__subtitle">
            Personal and hackathon work outside day-to-day role delivery —
            from SIH hardware prototyping to an LLM-powered insights platform
            under active development.
          </p>
        </Reveal>

        <Reveal className="blog__grid" stagger>
          {blogPosts.map((post) => (
            <article key={post.title} className="blog__card">
              <img src={post.image} alt="" loading="lazy" decoding="async" />
              <div className="blog__card-meta">
                <time>{post.date}</time>
                {post.badge ? (
                  <span className="blog__badge">{post.badge}</span>
                ) : null}
              </div>
              <h3>{post.title}</h3>
              {post.tech ? <p className="blog__tech">{post.tech}</p> : null}
              <p>{post.excerpt}</p>
              {post.links && post.links.length > 0 ? (
                <ul className="blog__links">
                  {post.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </Reveal>

        <Reveal className="blog__cta" delay={80}>
          <a
            className="glass-btn glass-btn--purple blog__github-btn"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            <span className="glass-btn__label">View GitHub</span>
            <span className="glass-btn__arrow" aria-hidden>
              <GitHubIcon size={16} />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
