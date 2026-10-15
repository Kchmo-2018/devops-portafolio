import About from "../components/About";
import Achievements from "../components/Achievements";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Journey from "../components/Journey";
import Skills from "../components/Skills";
import Work from "../components/Work";
import { PROFILE, SITE } from "../content/data";

/* Datos estructurados: ayudan a los buscadores a entender quién eres. */
const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  jobTitle: PROFILE.role,
  url: SITE.url,
  sameAs: [PROFILE.github, PROFILE.linkedin],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Journey />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
