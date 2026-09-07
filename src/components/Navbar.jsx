import { useEffect, useState } from "react";

export default function Navbar({ lang, setLang, t }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={scrolled ? "nav nav-scrolled" : "nav"}>

      <a className="brand" href="#top">
  <img
    src="/logo.png"
    alt="ProDevRes AI"
    className="brand-logo"
  />
</a>

      <button
        className="menu"
        onClick={() => setOpen(!open)}
        aria-label="Open navigation menu"
      >
        {open ? "×" : "☰"}
      </button>

      <nav className={open ? "nav-links open" : "nav-links"}>

        {t.nav.map((label, index) => (
          <a
            key={label}
            href={
              [
                "#services",
                "#industries",
                "#portfolio",
                "#pricing",
                "#contact"
              ][index]
            }
            onClick={() => setOpen(false)}
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

        <a className="nav-cta" href="#contact">
          {t.cta}
        </a>

      </nav>
    </header>
  );
}