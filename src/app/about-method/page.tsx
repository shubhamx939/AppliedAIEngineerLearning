export default function AboutMethodPage() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-card smart-scroll space-y-8 px-4 py-5 sm:px-6 lg:px-8">
        <section className="panel-dark rounded-[2.5rem] px-6 py-10 lg:px-10">
          <p className="eyebrow text-[rgba(247,240,227,0.68)]">Learning method</p>
          <h1 className="display-title mt-3 max-w-4xl text-5xl text-[var(--ivory-50)] md:text-6xl">
            This LMS is designed to teach like a strong mentor, not a content dump.
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[rgba(247,240,227,0.72)]">
            The experience is reading-first, cinematic, and structured for serious
            self-study. Lessons are shaped around understanding, judgment, and
            real-world engineering context rather than checklist-style note-taking.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {[
            {
              title: "How lessons are written",
              copy:
                "Each lesson is authored as long-form MDX with custom teaching blocks. Theory-heavy topics use mental models, tradeoffs, and annotated comparisons. Implementation-heavy topics use selective code, architecture flows, and API patterns.",
            },
            {
              title: "Why videos are optional",
              copy:
                "A short YouTube embed appears only when a genuinely strong explainer exists under 10 minutes. The written lesson must stand on its own, so the video acts like a sharp primer, not a crutch.",
            },
            {
              title: "How progress works",
              copy:
                "Progress is intentionally simple. Opening a lesson can mark it in progress, and you can mark it complete when you feel ready to move on. SQLite keeps the state locally with no account system required.",
            },
            {
              title: "How to study this roadmap",
              copy:
                "Move through layers in order, revisit prerequisites when a topic feels dense, and use the further reading cards for depth. The path is designed so each lesson unlocks better intuition for the next one.",
            },
          ].map((item) => (
            <div key={item.title} className="panel rounded-[2rem] p-6">
              <p className="display-title text-3xl">{item.title}</p>
              <p className="mt-4 text-[1rem] leading-8 text-[rgba(29,29,27,0.74)]">
                {item.copy}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
