"use client";

import { CurriculumSearch } from "@/components/curriculum-search";
import { ProgressStatusChip } from "@/components/progress-status-chip";
import { NavPill } from "@/components/ui/nav-pill";
import { ButtonLink } from "@/components/ui/button-link";
import { useProgressStore } from "@/lib/progress-browser";
import type { LessonGroup, LessonMeta } from "@/lib/types";

export function CurriculumPageClient({
  grouped,
  lessons,
}: {
  grouped: LessonGroup[];
  lessons: LessonMeta[];
}) {
  const progress = useProgressStore();
  const nextLesson =
    lessons.find((lesson) => (progress[lesson.slug]?.status ?? "not_started") !== "completed") ??
    lessons[0];

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell dashboard-shell-duo">
        <aside className="dashboard-pane space-y-6 lg:h-full lg:overflow-y-auto lg:overscroll-contain lg:pr-1 lg:pb-3">
          <section className="panel-dark rounded-[2.5rem] px-6 py-8">
            <p className="eyebrow text-[rgba(247,240,227,0.68)]">Curriculum map</p>
            <h1 className="display-title mt-3 text-4xl text-[var(--ivory-50)] md:text-5xl">
              Navigate the roadmap like a learning dashboard.
            </h1>
            <p className="mt-4 text-sm leading-7 text-[rgba(247,240,227,0.72)]">
              Search concepts, jump layers, and keep momentum through the next
              best lesson instead of getting lost in one endless page.
            </p>
          </section>
          <section className="panel rounded-[2rem] p-5">
            <p className="eyebrow">Continue learning</p>
            <h2 className="display-title mt-2 text-2xl">{nextLesson.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[rgba(29,29,27,0.72)]">
              {nextLesson.summary}
            </p>
            <div className="mt-5 space-y-3">
              <ButtonLink href={`/learn/${nextLesson.layerSlug}/${nextLesson.slug}`}>
                Open next lesson
              </ButtonLink>
              <NavPill
                href="/progress"
                direction="next"
                label="Open progress dashboard"
                detail="See completion and resume points"
              />
            </div>
          </section>
        </aside>

        <section className="dashboard-card dashboard-pane flex min-h-0 flex-col overflow-hidden">
          <div className="border-b border-[rgba(32,26,17,0.08)] px-6 py-5 lg:px-8">
            <p className="eyebrow">Explore the full roadmap</p>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[rgba(29,29,27,0.68)]">
              Browse by layer, search concepts, and jump straight into a lesson.
            </p>
          </div>
          <div className="smart-scroll space-y-6 px-4 py-5 sm:px-6 lg:px-8">
            <CurriculumSearch lessons={lessons} progress={progress} />

            <div className="grid gap-6">
              {grouped.map(({ layer, lessons: layerLessons }) => (
                <section key={layer.slug} className="panel rounded-[2rem] p-6 lg:p-8">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <p className="eyebrow">{layer.title}</p>
                      <h2 className="display-title mt-2 text-4xl">{layer.subtitle}</h2>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-[rgba(29,29,27,0.7)]">
                        {layer.description}
                      </p>
                    </div>
                    <div className="rounded-full border border-[rgba(32,26,17,0.08)] bg-white/60 px-4 py-2 text-sm text-[rgba(29,29,27,0.68)]">
                      {layerLessons.length} lessons
                    </div>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {layerLessons.map((lesson) => (
                      <article
                        id={lesson.slug}
                        key={lesson.slug}
                        className="rounded-[1.6rem] border border-[rgba(32,26,17,0.08)] bg-white/58 p-5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="eyebrow">{lesson.id}</p>
                            <h3 className="display-title mt-2 text-2xl">{lesson.title}</h3>
                          </div>
                          <ProgressStatusChip
                            status={progress[lesson.slug]?.status ?? "not_started"}
                            compact
                          />
                        </div>
                        <p className="mt-4 text-sm leading-7 text-[rgba(29,29,27,0.72)]">
                          {lesson.summary}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {lesson.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-[rgba(30,143,134,0.08)] px-3 py-1 text-xs text-[var(--teal-600)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-5">
                          <ButtonLink href={`/learn/${lesson.layerSlug}/${lesson.slug}`}>
                            Open lesson
                          </ButtonLink>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
