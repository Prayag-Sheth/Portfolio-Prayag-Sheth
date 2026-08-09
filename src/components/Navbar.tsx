import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { navLinks, profile } from "../data/content";
import { GlassButton } from "./GlassButton";
import "./Navbar.css";

function sectionIdFromHref(href: string) {
  const hash = href.includes("#") ? href.slice(href.indexOf("#")) : href;
  return hash;
}

export function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("/#home");

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActive("");
      return;
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const sections = navLinks
        .map((link) => {
          const id = sectionIdFromHref(link.href);
          return document.querySelector(id);
        })
        .filter(Boolean) as HTMLElement[];

      const offset = window.scrollY + 120;
      let current = "/#home";
      for (const section of sections) {
        if (section.offsetTop <= offset) {
          current = `/#${section.id}`;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close mobile menu on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${open ? "navbar--menu-open" : ""}`}>
      {open ? (
        <button
          type="button"
          className="navbar__backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      ) : null}

      <div className="navbar__inner">
        <a className="navbar__brand" href="/#home" onClick={closeMenu}>
          <span className="navbar__mark" aria-hidden />
          <span>{profile.name}</span>
        </a>

        <nav className={`navbar__links ${open ? "navbar__links--open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link ${active === link.href ? "navbar__link--active" : ""}`}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <GlassButton
            className="glass-btn--nav navbar__cta-mobile"
            variant="glass"
            withArrow={false}
            href="/#contact"
            onClick={closeMenu}
          >
            Get in Touch
          </GlassButton>
        </nav>

        <GlassButton
          className="glass-btn--nav navbar__cta"
          variant="glass"
          withArrow={false}
          href="/#contact"
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
