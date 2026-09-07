import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Industries from "./components/Industries";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";

import { copy } from "./data/i18n";

export default function App() {
  const [lang, setLang] = useState("en");

  const t = copy[lang];

  return (
    <>
      <Navbar lang={lang} setLang={setLang} t={t} />

      <main>
        <Hero t={t} />
        <Reveal><Services t={t} /></Reveal>
        <Reveal><Industries /></Reveal>
        <Reveal><Pricing t={t} /></Reveal>
        <Reveal><Portfolio /></Reveal>
        <Reveal><Contact t={t} /></Reveal>
      </main>

      <Footer />
    </>
  );
}