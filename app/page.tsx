import About from "../components/About";
import Achievements from "../components/Achievements";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Journey from "../components/Journey";
import Skills from "../components/Skills";
import Work from "../components/Work";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Journey />
        <Achievements />
      </main>
    </>
  );
}
