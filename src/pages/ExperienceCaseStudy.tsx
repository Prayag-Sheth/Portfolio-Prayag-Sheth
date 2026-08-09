import { Link, useParams } from "react-router-dom";
import {
  caseStudySections,
  getCaseStudyBySlug,
  type CaseStudyContent,
  type CaseStudyMeta,
} from "../data/caseStudies";
import { GlassButton } from "../components/GlassButton";
import "./ExperienceCaseStudy.css";

function PublishedSections({ content }: { content: CaseStudyContent }) {
  return (
    <div className="case-study__sections">
      <section id="overview" className="case-study__section" aria-labelledby="overview-title">
        <h2 id="overview-title" className="heading">
          Overview
        </h2>
        {content.overview.paragraphs.map((p) => (
          <p key={p.slice(0, 48)} className="muted case-study__prose">
            {p}
          </p>
        ))}
        <div className="case-study__table-wrap">
          <table className="case-study__table">
            <thead>
              <tr>
                <th scope="col">Layer</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              {content.overview.layers.map((layer) => (
                <tr key={layer.name}>
                  <th scope="row">{layer.name}</th>
                  <td>{layer.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted case-study__prose">
          <strong className="case-study__em">Flow:</strong> {content.overview.flow}
        </p>
      </section>

      <section
        id="architecture"
        className="case-study__section"
        aria-labelledby="architecture-title"
      >
        <h2 id="architecture-title" className="heading">
          Architecture
        </h2>
        <pre className="case-study__diagram" tabIndex={0}>
          {content.architecture.diagram}
        </pre>
        <p className="muted case-study__prose">
          <strong className="case-study__em">Messaging:</strong>{" "}
          {content.architecture.messaging}
        </p>
        <p className="muted case-study__prose">
          <strong className="case-study__em">Deploy:</strong>{" "}
          {content.architecture.deploy}
        </p>
      </section>

      <section
        id="challenges"
        className="case-study__section"
        aria-labelledby="challenges-title"
      >
        <h2 id="challenges-title" className="heading">
          Challenges &amp; Decisions
        </h2>
        <div className="case-study__table-wrap">
          <table className="case-study__table">
            <thead>
              <tr>
                <th scope="col">Challenge</th>
                <th scope="col">Decision</th>
              </tr>
            </thead>
            <tbody>
              {content.challenges.map((row) => (
                <tr key={row.challenge}>
                  <th scope="row">{row.challenge}</th>
                  <td>{row.decision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="impact" className="case-study__section" aria-labelledby="impact-title">
        <h2 id="impact-title" className="heading">
          Impact
        </h2>
        <ul className="case-study__list">
          {content.impact.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="next" className="case-study__section" aria-labelledby="next-title">
        <h2 id="next-title" className="heading">
          What&apos;s Next
        </h2>
        <ol className="case-study__list case-study__list--ordered">
          {content.next.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function PendingSections({ study }: { study: CaseStudyMeta }) {
  return (
    <>
      <p className="case-study__pending-banner" role="status">
        Detailed write-up pending review — structure only for{" "}
        <strong>{study.title}</strong>.
      </p>
      <div className="case-study__sections">
        {caseStudySections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="case-study__section"
            aria-labelledby={`${section.id}-title`}
          >
            <h2 id={`${section.id}-title`} className="heading">
              {section.title}
            </h2>
            <div className="case-study__placeholder">
              <p className="muted">Content pending owner review for this section.</p>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

export function ExperienceCaseStudy() {
  const { slug = "" } = useParams();
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return (
      <main className="case-study case-study--missing">
        <div className="container">
          <h1 className="heading">Case study not found</h1>
          <p className="muted">
            No experience write-up matches this URL. Return to the experience
            section on the home page.
          </p>
          <GlassButton variant="purple" href="/#experience">
            Back to Experience
          </GlassButton>
        </div>
      </main>
    );
  }

  return (
    <main className="case-study">
      <div className="container">
        <Link className="case-study__back" to="/#experience">
          ← Back to Experience
        </Link>

        <header className="case-study__header">
          <p className="section-label">Case study</p>
          <h1 className="heading case-study__title">{study.title}</h1>
          <dl className="case-study__meta">
            <div>
              <dt>Role</dt>
              <dd>{study.role}</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>{study.timeline}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{study.stack.join(" · ")}</dd>
            </div>
          </dl>
          <img
            className="case-study__hero-img"
            src={study.image}
            alt=""
            loading="eager"
            decoding="async"
          />
        </header>

        {study.content ? (
          <PublishedSections content={study.content} />
        ) : (
          <PendingSections study={study} />
        )}
      </div>
    </main>
  );
}
