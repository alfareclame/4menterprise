import SectionHeading from './SectionHeading';
import { verhaal } from '@/content/copy';

export default function Verhaal() {
  return (
    <section id="verhaal" className="border-t border-lijn py-[clamp(4rem,10vw,8rem)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading eyebrow={verhaal.eyebrow} title={verhaal.h2} />
        {/* FOTO-SLOT: portret M — wordt later aangeleverd */}
        <div className="mt-10 max-w-[44rem] space-y-6">
          {verhaal.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
