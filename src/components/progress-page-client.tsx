"use client";

import Link from "next/link";
import { ArrowRight, ChartSpline, Sparkles, Trophy } from "lucide-react";
import { ProgressStatusChip } from "@/components/progress-status-chip";
import { NavPill } from "@/components/ui/nav-pill";
import { getProgressSummary, useProgressStore } from "@/lib/progress-browser";
import type { LessonGroup, LessonMeta, ProgressStatus } from "@/lib/types";

function getStatusCounts(lessons: LessonMeta[], progressMap: Record<string, { status: ProgressStatus } | undefined>) {
  return lessons.reduce(
    (acc, lesson) => {
      const status = progressMap[lesson.slug]?.status ?? "not_started";
      acc[status] += 1;
      return acc;
    },
    {
      completed: 0,
      in_progress: 0,
      not_started: 0,
    } satisfies Record<ProgressStatus, number>,
  );
}

function getLayerAccentClass(
  percent: number,
  counts: Record<ProgressStatus, number>,
) {
  if (percent === 100) {
    return "border-emerald-200/80 bg-emerald-50 text-emerald-700";
  }

  if (counts.in_progress > 0 || counts.completed > 0) {
    return "border-amber-200/80 bg-[linear-gradient(135deg,rgba(255,251,235,0.96),rgba(236,253,245,0.9))] text-amber-700";
  }

  return "border-slate-200/80 bg-slate-50 text-slate-600";
}

export function ProgressPageClient({
  grouped,
  lessons,
}: {
  grouped: LessonGroup[];
  lessons: LessonMeta[];
}) {
  const progressMap = useProgressStore();
  const summary = getProgressSummary(lessons, progressMap);
  const currentLesson = lessons.find((lesson) => lesson.slug === summary.currentLessonSlug);

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell dashboard-shell-duo">
        <aside className="dashboard-pane space-y-6 lg:h-full lg:overflow-y-auto lg:overscroll-contain lg:pr-1 lg:pb-3">
          <section className="panel-dark rounded-[2.5rem] px-6 py-8">
            <p className="eyebrow text-[rgba(247,240,227,0.68)]">Progress dashboard</p>
            <h1 className="display-title mt-3 text-4xl text-[var(--ivory-50)] md:text-5xl">
              Keep the path visible while you learn.
            </h1>
            <div className="mt-6 grid gap-4">
              {[
                {
                  label: "Completed",
                  value: summary.completed,
                  accent: "text-emerald-300",
                  shell: "border-emerald-400/15 bg-emerald-400/8",
                },
                {
                  label: "In progress",
                  value: summary.inProgress,
                  accent: "text-amber-300",
                  shell: "border-amber-300/15 bg-amber-300/8",
                },
                {
                  label: "Total lessons",
                  value: summary.total,
                  accent: "text-sky-200",
                  shell: "border-sky-200/10 bg-white/6",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-[1.75rem] border p-5 ${stat.shell}`}
                >
                  <p className="eyebrow text-[rgba(247,240,227,0.62)]">{stat.label}</p>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <p className={`display-title text-4xl text-[var(--ivory-50)] ${stat.accent}`}>
                      {stat.value}
                    </p>
                    {stat.label === "Completed" ? (
                      <ProgressStatusChip status="completed" compact className="border-0 bg-white/10 text-[var(--ivory-50)]" />
                    ) : null}
                    {stat.label === "In progress" ? (
                      <ProgressStatusChip status="in_progress" compact className="border-0 bg-white/10 text-[var(--ivory-50)]" />
                    ) : null}
                    {stat.label === "Total lessons" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.14em] text-[rgba(247,240,227,0.72)]">
                        <Sparkles className="h-3.5 w-3.5" />
                        Curriculum
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {currentLesson ? (
            <section className="panel rounded-[2rem] p-6">
              <p className="eyebrow">Continue next</p>
              <h2 className="display-title mt-2 text-3xl">{currentLesson.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[rgba(29,29,27,0.72)]">
                {currentLesson.summary}
              </p>
              <div className="mt-5 space-y-3">
                <Link
                  href={`/learn/${currentLesson.layerSlug}/${currentLesson.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#0f5b55,#1e8f86)] px-5 py-3 text-sm font-semibold text-[var(--ivory-50)]"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <NavPill
                  href="/curriculum"
                  direction="previous"
                  label="Back to curriculum"
                  detail="Browse modules and lesson cards"
                />
              </div>
            </section>
          ) : null}
        </aside>

        <section className="dashboard-card dashboard-pane flex min-h-0 flex-col overflow-hidden">
          <div className="border-b border-[rgba(32,26,17,0.08)] px-6 py-5 lg:px-8">
            <p className="eyebrow">Layer-by-layer progress</p>
            <p className="mt-2 text-sm leading-7 text-[rgba(29,29,27,0.68)]">
              Scroll inside the dashboard while keeping your key learning status visible.
            </p>
          </div>
          <div className="smart-scroll grid gap-6 px-4 py-5 sm:px-6 lg:px-8">
            {grouped.map(({ layer, lessons: layerLessons }) => {
              const counts = getStatusCounts(layerLessons, progressMap);
              const layerSummary = summary.layerSummaries[layer.slug];
              const percent = layerSummary
                ? Math.round((layerSummary.completed / layerSummary.total) * 100)
                : 0;
              const layerAccentClass = getLayerAccentClass(percent, counts);

              return (
                <section
                  key={layer.slug}
                  className="panel rounded-[2rem] border border-[rgba(32,26,17,0.08)] bg-[linear-gradient(180deg,rgba(255,252,247,0.94),rgba(255,249,240,0.84))] p-6 shadow-[0_25px_45px_rgba(17,14,10,0.07)]"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="eyebrow">{layer.title}</p>
                      <h2 className="display-title mt-2 text-3xl">{layer.subtitle}</h2>
                    </div>
                    <div className="flex flex-col items-start gap-3 lg:items-end">
                      <div
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] ${layerAccentClass}`}
                      >
                        <Trophy className="h-4 w-4" />
                        {percent}% complete
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {counts.completed > 0 ? (
                          <ProgressStatusChip
                            status="completed"
                            compact
                            label={`${counts.completed} done`}
                          />
                        ) : null}
                        {counts.in_progress > 0 ? (
                          <ProgressStatusChip
                            status="in_progress"
                            compact
                            label={`${counts.in_progress} active`}
                          />
                        ) : null}
                        {counts.not_started > 0 ? (
                          <ProgressStatusChip
                            status="not_started"
                            compact
                            label={`${counts.not_started} queued`}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-[rgba(32,26,17,0.08)] bg-white/60">
                    <div className="flex h-2 w-full overflow-hidden bg-[rgba(32,26,17,0.05)]">
                      <div
                        className="bg-emerald-400"
                        style={{ width: `${(counts.completed / layerLessons.length) * 100}%` }}
                      />
                      <div
                        className="bg-amber-300"
                        style={{ width: `${(counts.in_progress / layerLessons.length) * 100}%` }}
                      />
                      <div
                        className="bg-slate-200"
                        style={{ width: `${(counts.not_started / layerLessons.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3">
                    {layerLessons.map((lesson) => {
                      const status = progressMap[lesson.slug]?.status ?? "not_started";

                      return (
                        <Link
                          key={lesson.slug}
                          href={`/learn/${lesson.layerSlug}/${lesson.slug}`}
                          className="group flex items-center justify-between rounded-[1.25rem] border border-[rgba(32,26,17,0.08)] bg-white/65 px-4 py-3 text-sm transition hover:-translate-y-0.5 hover:border-[rgba(16,100,95,0.2)] hover:bg-white"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(16,100,95,0.06)] text-[0.72rem] font-semibold text-[rgba(29,29,27,0.6)]">
                              {lesson.id.replace("NB-", "")}
                            </span>
                            <span className="truncate text-[rgba(29,29,27,0.86)] group-hover:text-[rgba(16,100,95,0.92)]">
                              {lesson.id} — {lesson.title}
                            </span>
                          </div>
                          <ProgressStatusChip status={status} />
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
