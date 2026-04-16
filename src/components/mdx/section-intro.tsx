export function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="my-10 rounded-[2rem] border border-[rgba(32,26,17,0.08)] bg-[rgba(255,251,245,0.78)] p-6 md:p-8">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display-title mt-2 text-3xl md:text-4xl">{title}</h2>
      <div className="mt-4 space-y-4 text-[1rem] leading-8 text-[rgba(29,29,27,0.78)]">
        {children}
      </div>
    </section>
  );
}
