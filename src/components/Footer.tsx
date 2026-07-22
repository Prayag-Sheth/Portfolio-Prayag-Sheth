import { navLinks, profile } from "../data/content";
import { GitHubIcon, GmailIcon, LinkedInIcon } from "./icons/SocialIcons";
import "./Footer.css";

export function Footer() {
  const [firstName, lastName] = profile.name.split(" ");

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer__nav">
          <nav className="footer__links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <a className="footer__email" href={`mailto:${profile.email}`}>
            <span className="footer__email-icon" aria-hidden>
              <GmailIcon size={14} />
            </span>
            {profile.email}
          </a>
        </div>

        <h2 className="footer__wordmark" aria-label={profile.name}>
          <span>{firstName}</span>
          <span className="footer__wordmark-fade">{lastName}</span>
        </h2>

        <div className="footer__bottom">
          <div className="footer__legal-left">
            <span>© 2026 {profile.name}</span>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
              {profile.phone}
            </a>
          </div>

          <div className="footer__socials" aria-label="Social links">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="footer__social"
            >
              <LinkedInIcon size={16} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="footer__social"
            >
              <GitHubIcon size={18} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Gmail"
              className="footer__social"
            >
              <GmailIcon size={16} />
            </a>
          </div>

          <div className="footer__legal-right">
            <span>{profile.location}</span>
            <a href={profile.resumeUrl}>Resume</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
