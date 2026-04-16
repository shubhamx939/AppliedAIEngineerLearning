import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3, Layers3 } from "lucide-react";
import { ProgressButton } from "@/components/progress-button";
import { ReadingProgress } from "@/components/reading-progress";
import { cn } from "@/lib/utils";
import type { LessonMeta } from "@/lib/types";

export function LessonRail({
  lesson,
  previousLesson,
  nextLesson,
  className,
}: {
  lesson: LessonMeta;
  previousLesson?: LessonMeta;
  nextLesson?: LessonMeta;
  className?: string;
}) {
  return (
    <aside className={cn("panel-dark rounded-[2rem] p-5 lg:p-6", className)}>
      <div className="space-y-4">
        <div>
          <p className="eyebrow text-[rgba(247,240,227,0.64)]">{lesson.id}</p>
          <h2 className="display-title mt-2 text-2xl">{lesson.title}</h2>
        </div>
        <div className="grid gap-2 text-sm text-[rgba(247,240,227,0.72)]">
          <div className="flex items-center gap-2">
            <Layers3 className="h-4 w-4 text-[var(--gold-400)]" />
            {lesson.layer.replaceAll("-", " ")}
          </div>
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-[var(--gold-400)]" />
            {lesson.estimatedMinutes} min
          </div>
        </div>
        <ReadingProgress />
        <ProgressButton lessonSlug={lesson.slug} />
      </div>
      <div className="mt-6 grid gap-3 text-sm">
        {previousLesson ? (
          <Link
            href={`/learn/${previousLesson.layerSlug}/${previousLesson.slug}`}
            className="flex items-center justify-between rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-3 text-[rgba(247,240,227,0.8)] transition hover:bg-white/10"
          >
            <span className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Previous
            </span>
            <span className="max-w-[70%] truncate">{previousLesson.id}</span>
          </Link>
        ) : null}
        {nextLesson ? (
          <Link
            href={`/learn/${nextLesson.layerSlug}/${nextLesson.slug}`}
            className="flex items-center justify-between rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-3 text-[rgba(247,240,227,0.8)] transition hover:bg-white/10"
          >
            <span className="max-w-[70%] truncate">{nextLesson.id}</span>
            <span className="inline-flex items-center gap-2">
              Next
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ) : null}
      </div>
    </aside>
  );
}
