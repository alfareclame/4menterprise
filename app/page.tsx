import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Verhaal from '@/components/Verhaal';
import Ventures from '@/components/Ventures';
import Innovatie from '@/components/Innovatie';
import Werkwijze from '@/components/Werkwijze';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Verhaal />
        <Ventures />
        <Innovatie />
        <Werkwijze />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
