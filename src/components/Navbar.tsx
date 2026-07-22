import { useEffect, useState } from "react";
import { navLinks, profile } from "../data/content";
import { GlassButton } from "./GlassButton";
import "./Navbar.css";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const sections = navLinks
        .map((link) => document.querySelector(link.href))
        .filter(Boolean) as HTMLElement[];

      const offset = window.scrollY + 120;
      let current = "#home";
      for (const section of sections) {
        if (section.offsetTop <= offset) {
          current = `#${section.id}`;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <a className="navbar__brand" href="#home" onClick={() => setOpen(false)}>
          <span className="navbar__mark" aria-hidden />
          <span>{profile.name}</span>
        </a>

        <nav className={`navbar__links ${open ? "navbar__links--open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link ${active === link.href ? "navbar__link--active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <GlassButton
            className="glass-btn--nav navbar__cta-mobile"
            variant="glass"
            withArrow={false}
            href="#contact"
          >
            Get in Touch
          </GlassButton>
        </nav>

        <GlassButton
          className="glass-btn--nav navbar__cta"
          variant="glass"
          withArrow={false}
          href="#contact"
        >
          Get in Touch
        </GlassButton>

        <button
          type="button"
          className={`navbar__toggle ${open ? "navbar__toggle--open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
