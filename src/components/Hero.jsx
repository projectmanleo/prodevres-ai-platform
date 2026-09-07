import { useEffect, useState } from "react";

export default function Hero({ t }) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((current) => (current + 1) % 3);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="top" className="hero">

      {/* Background slideshow */}
      <div className={`hero-photo hero-${slide}`}>
        <div className="photo-grid"></div>
        <div className="glow"></div>
      </div>

      <div className="hero-overlay"></div>

      {/* Main content */}
      <div className="hero-content">

        <div className="hero-badge">
          <span></span>
          {t.badge}
        </div>

        <h1 key={`${t.heroTitle}-${slide}`}>
          {t.heroTitle}
        </h1>

        <p>
          {t.heroText}
        </p>

        <div className="hero-actions">

          <a
            className="btn primary"
            href="#contact"
          >
            {t.cta}
            <span>↗</span>
          </a>

          <a
            className="btn ghost"
            href="#services"
          >
            {t.nav[0]}
          </a>

        </div>

        {/* Slideshow controls */}
        <div className="dots">

          {[0, 1, 2].map((number) => (
            <button
              key={number}
              className={number === slide ? "active" : ""}
              onClick={() => setSlide(number)}
              aria-label={`Show slide ${number + 1}`}
            ></button>
          ))}

        </div>

      </div>

      <div className="hero-scroll">
        SCROLL TO EXPLORE <span>↓</span>
      </div>

    </section>
  );
}