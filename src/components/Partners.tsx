import { partners } from "../data/content";
import "./Partners.css";

export function Partners() {
  const row1 = partners.slice(0, 5);
  const row2 = partners.slice(5);

  return (
    <section className="partners section" aria-labelledby="partners-title">
      <div className="container">
        <h2 id="partners-title" className="partners__title">
          Tech &amp; Tools
        </h2>
        <div className="partners__grid partners__grid--cards">
          {row1.map((name) => (
            <div key={name} className="partners__cell partners__cell--card">
              <span>{name}</span>
            </div>
          ))}
        </div>
        <div className="partners__grid">
          {row2.map((name) => (
            <div key={name} className="partners__cell">
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
