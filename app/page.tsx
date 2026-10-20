import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Verhaal from '@/components/Verhaal';
import Groep from '@/components/Groep';
import Innovatie from '@/components/Innovatie';
import Werkwijze from '@/components/Werkwijze';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { homePageJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd()) }} />
      <Nav />
      <main id="main">
        <Hero />
        <Groep />
        <Verhaal />
        <Innovatie />
        <Werkwijze />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
