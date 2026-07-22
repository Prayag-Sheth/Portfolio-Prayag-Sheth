import { images } from "../data/content";
import "./Video.css";

export function Video() {
  return (
    <section className="video section">
      <div className="container">
        <div
          className="video__player"
          style={{ backgroundImage: `url(${images.video})` }}
          role="img"
          aria-label="Featured project: Kafka financial integration platform"
        >
          <button
            type="button"
            className="video__play"
            aria-label="Featured project highlight"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          </button>
          <p className="video__caption">
            Featured: Kafka financial data platform — NetSuite & QuickBooks sync
          </p>
        </div>
      </div>
    </section>
  );
}
