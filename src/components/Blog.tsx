import { blogPosts, profile } from "../data/content";
import { GlassButton } from "./GlassButton";
import "./Blog.css";

export function Blog() {
  return (
    <section id="projects" className="blog section">
      <div className="container">
        <p className="blog__eyebrow">Projects</p>
        <h2 className="heading blog__title">
          Selected Work &amp;{" "}
          <span className="accent">Impact</span>
        </h2>
        <p className="muted blog__subtitle">
          From hackathon-winning hardware to enterprise Kafka pipelines and
          Excel automation that cut report time from hours to seconds.
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
          <GlassButton variant="purple" href={profile.github}>
            View GitHub
          </GlassButton>
        </div>
      </div>
    </section>
  );
}
