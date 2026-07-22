import { blogPosts, profile } from "../data/content";
import { GitHubIcon } from "./icons/SocialIcons";
import "./Blog.css";
import "./GlassButton.css";

export function Blog() {
  return (
    <section id="projects" className="blog section">
      <div className="container">
        <p className="blog__eyebrow">Projects</p>
        <h2 className="heading blog__title">
          Selected Work &amp; <span className="accent">Impact</span>
        </h2>
        <p className="muted blog__subtitle">
          Enterprise Kafka pipelines, multi-platform order sync, and Excel
          automation that cut report time from hours to seconds.
        </p>

        <div className="blog__grid">
          {blogPosts.map((post) => (
            <article key={post.title} className="blog__card">
              <img src={post.image} alt="" />
              <time>{post.date}</time>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </div>

        <div className="blog__cta">
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
        </div>
      </div>
    </section>
  );
}
