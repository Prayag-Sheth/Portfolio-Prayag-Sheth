import { education, images, profile } from "../data/content";
import { GlassButton } from "./GlassButton";
import "./About.css";

export function About() {
  return (
    <section id="about" className="about section">
      <div className="container about__grid">
        <div className="about__copy">
          <p className="section-label">About me</p>
          <h2 className="heading about__title">
            Meet {profile.name} —{" "}
            <span className="accent">Full-Stack Developer</span>
          </h2>
          <p className="muted about__body">
            Systems-focused Software Engineer with 2+ years of experience
            building enterprise data pipelines, backend infrastructure, and
            Kafka-driven integrations using TypeScript and PostgreSQL — with
            optimizations that reduced financial report retrieval from hours to
            seconds. Based in {profile.location}, currently at{" "}
            {profile.company}.
          </p>
          <p className="muted about__edu">
            {education.degree} · {education.school} (CGPA {education.cgpaDegree}
            ). {education.diploma} (CGPA {education.cgpaDiploma}).
          </p>
          <GlassButton variant="purple" href="#contact">
            Get in Touch
          </GlassButton>
        </div>

        <div className="about__media">
          <p className="about__note">
            Available for full-stack roles building reliable data platforms and
            product experiences.
          </p>
          <div className="about__frame">
            <img
              src={images.about}
              alt={`${profile.name}, Full-Stack Developer`}
            />
            <aside className="about__float">
              <img
                src={images.aboutThumb}
                alt=""
                className="about__float-thumb"
              />
              <div>
                <span className="about__float-kicker">Recognition</span>
                <strong>SIH Winner</strong>
                <p>
                  Smart India Hackathon (G20 Azadi Ka Amrit Mahotsav) — safety
                  wearable for industrial workers.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
