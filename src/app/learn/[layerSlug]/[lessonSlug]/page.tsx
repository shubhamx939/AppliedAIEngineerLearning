import { notFound } from "next/navigation";
import { LessonOutline } from "@/components/lesson-outline";
import { LessonProgressTracker } from "@/components/lesson-progress-tracker";
import { ProgressButton } from "@/components/progress-button";
import { NavPill } from "@/components/ui/nav-pill";
import { VideoCard } from "@/components/video-card";
import { getAllLessonsMeta, getLessonBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const lessons = await getAllLessonsMeta();
  return lessons.map((lesson) => ({
    layerSlug: lesson.layerSlug,
    lessonSlug: lesson.slug,
  }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ layerSlug: string; lessonSlug: string }>;
}) {
  const { layerSlug, lessonSlug } = await params;
  const allLessons = await getAllLessonsMeta();
  const lessonIndex = allLessons.findIndex(
    (item) => item.layerSlug === layerSlug && item.slug === lessonSlug,
  );

  if (lessonIndex === -1) {
    notFound();
  }

  const lesson = await getLessonBySlug(layerSlug, lessonSlug);
  const previousLesson = allLessons[lessonIndex - 1];
  const nextLesson = allLessons[lessonIndex + 1];

  return (
    <div className="dashboard-page">
      <LessonProgressTracker lessonSlug={lesson.slug} />

      <div className="dashboard-shell lesson-dashboard-shell">
        <div className="dashboard-pane hidden xl:block xl:h-full xl:overflow-hidden">
          <LessonOutline
            items={lesson.outline}
            lessonId={lesson.id}
            className="h-full"
          />
        </div>

        <article className="dashboard-card dashboard-pane flex min-h-0 flex-col overflow-hidden">
          <div className="border-b border-[rgba(32,26,17,0.08)] px-5 py-3 md:px-6 lg:px-7">
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start">
              <div>
                <p className="eyebrow">{lesson.id}</p>
                <h1 className="display-title mt-1.5 max-w-4xl text-[2.15rem] leading-[0.98] text-balance md:text-[2.35rem] xl:text-[2.55rem]">
                  {lesson.title}
                </h1>
                <p className="mt-2 max-w-4xl text-[0.95rem] leading-7 text-[rgba(29,29,27,0.74)]">
                  {lesson.summary}
                </p>
                {lesson.prerequisites.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {lesson.prerequisites.map((prerequisite) => (
                      <span
                        key={prerequisite}
                        className="rounded-full border border-[rgba(32,26,17,0.08)] bg-white/72 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-[rgba(29,29,27,0.58)]"
                      >
                        Builds on {prerequisite}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="xl:pt-1">
                <div className="inline-flex max-w-full flex-wrap items-center justify-end gap-2 rounded-[1.5rem] border border-[rgba(32,26,17,0.08)] bg-[rgba(255,251,245,0.82)] px-3 py-2 shadow-[0_16px_35px_rgba(17,14,10,0.06)]">
                  <span className="rounded-full bg-[rgba(30,143,134,0.08)] px-3 py-1.5 text-sm text-[var(--teal-600)]">
                    {lesson.difficulty}
                  </span>
                  <span className="rounded-full bg-[rgba(216,154,43,0.1)] px-3 py-1.5 text-sm text-[var(--gold-500)]">
                    {lesson.estimatedMinutes} min
                  </span>
                  {previousLesson ? (
                    <span className="rounded-full border border-[rgba(32,26,17,0.08)] px-3 py-1.5 text-sm text-[rgba(29,29,27,0.6)]">
                      Prev: <span className="font-medium text-[rgba(29,29,27,0.78)]">{previousLesson.id}</span>
                    </span>
                  ) : null}
                  {nextLesson ? (
                    <span className="rounded-full border border-[rgba(32,26,17,0.08)] px-3 py-1.5 text-sm text-[rgba(29,29,27,0.6)]">
                      Next: <span className="font-medium text-[rgba(29,29,27,0.78)]">{nextLesson.id}</span>
                    </span>
                  ) : null}
                  <ProgressButton lessonSlug={lesson.slug} className="w-auto px-4 py-2 text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="smart-scroll space-y-6 px-4 py-4 sm:px-6 md:px-6 lg:px-7 xl:px-8">
            <LessonOutline
              items={lesson.outline}
              lessonId={lesson.id}
              className="xl:hidden"
            />

            {lesson.video ? <VideoCard video={lesson.video} /> : null}

            <section className="rounded-[2rem] border border-[rgba(32,26,17,0.08)] bg-white/40 p-6 md:p-8">
              <div className="prose-lesson">{lesson.content}</div>
            </section>

            <div className="grid gap-3 md:grid-cols-2">
              {previousLesson ? (
                <NavPill
                  href={`/learn/${previousLesson.layerSlug}/${previousLesson.slug}`}
                  direction="previous"
                  label={previousLesson.title}
                  detail="Step back if you want a prerequisite refresh"
                />
              ) : <div />}
              {nextLesson ? (
                <NavPill
                  href={`/learn/${nextLesson.layerSlug}/${nextLesson.slug}`}
                  direction="next"
                  label={nextLesson.title}
                  detail="Move forward when this lesson feels solid"
                />
              ) : null}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
