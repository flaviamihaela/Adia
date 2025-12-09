import Reveal from "./Reveal";

export default function Section({
  id,
  label,
  title,
  children,
}: {
  id?: string;
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8 items-start">
        <Reveal>
          <div className="md:col-span-3 text-xs tracking-wideish uppercase text-mist/60">
            {label}
          </div>
        </Reveal>

        <div className="md:col-span-9 space-y-8">
          <Reveal delay={0.05}>
            <h2 className="font-serif text-2xl md:text-4xl leading-tight">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="text-mist/80 text-base md:text-lg leading-relaxed">
              {children}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
