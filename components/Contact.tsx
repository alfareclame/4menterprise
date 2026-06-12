import SectionHeading from './SectionHeading';
import { contact } from '@/content/copy';
import { site } from '@/content/site';

export default function Contact() {
  return (
    <section id="contact" className="border-t border-lijn py-[clamp(4rem,10vw,8rem)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow={contact.eyebrow}
          title={contact.h2}
          intro={contact.body}
        />
        <a href={`mailto:${site.email}`} className="btn-primary mt-9">
          {contact.buttonLabel}
        </a>
        <p className="mt-6 font-mono text-sm text-staal">{contact.subline}</p>
      </div>
    </section>
  );
}
