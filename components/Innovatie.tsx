import SectionHeading from './SectionHeading';
import InnovatieProject from './InnovatieProject';
import { innovatieProjecten } from '@/content/innovatie';
import { innovatieIntro } from '@/content/copy';

export default function Innovatie() {
  return (
    <section
      id="innovatie"
      className="bg-havennacht py-[clamp(4rem,10vw,8rem)] text-wit"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          dark
          eyebrow={innovatieIntro.eyebrow}
          title={innovatieIntro.h2}
          intro={innovatieIntro.intro}
        />
        {/* FOTO-SLOT: werkplaats/projectfoto */}
        <div className="mt-12 divide-y divide-staal border-y border-staal">
          {innovatieProjecten.map((project) => (
            <InnovatieProject key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
