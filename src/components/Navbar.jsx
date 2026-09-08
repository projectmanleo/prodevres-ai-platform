import { useEffect, useState } from "react";

const services = [
  ["AI Chatbots", 250],
  ["Workflow Automation", 350],
  ["Virtual Assistant Automation", 200],
  ["Email Automation", 150],
  ["AI Research", 100],
  ["AI-Aware Governance", 300]
];

export default function Navbar({ lang, setLang, t }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenus = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  return (
    <header className={scrolled ? "nav nav-scrolled" : "nav"}>
      <a className="brand" href="#top" onClick={closeMenus}>
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="ProDevRes AI"
          className="brand-logo"
        />
      </a>

      <button
        className="menu"
        onClick={() => setOpen(!open)}
        aria-label="Open navigation menu"
        aria-expanded={open}
      >
        {open ? "×" : "☰"}
      </button>

      <nav className={open ? "nav-links open" : "nav-links"}>
        <div
          className={`nav-dropdown ${servicesOpen ? "dropdown-open" : ""}`}
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
        >
          <button
            className="nav-dropdown-toggle"
            onClick={() => setServicesOpen(!servicesOpen)}
            aria-expanded={servicesOpen}
          >
            {t.nav[0]} <span className="dropdown-chevron">⌄</span>
          </button>

          <div className="nav-dropdown-menu">
            {services.map(([name, price]) => (
              <a
                key={name}
                href="#pricing"
                onClick={closeMenus}
              >
                <span>{name}</span>
                <strong>€{price}</strong>
              </a>
            ))}
          </div>
        </div>

        {t.nav.slice(1).map((label, index) => (
          <a
            key={label}
            href={["#industries", "#portfolio", "#pricing", "#contact"][index]}
            onClick={closeMenus}
          >
            {label}
          </a>
        ))}

        <button
          className="lang"
          onClick={() => setLang(lang === "en" ? "fr" : "en")}
          aria-label="Change language"
        >
          {lang === "en" ? "FR" : "EN"}
        </button>

        <a className="nav-cta" href="#contact" onClick={closeMenus}>
          {t.cta}
        </a>
      </nav>
    </header>
  );
}
