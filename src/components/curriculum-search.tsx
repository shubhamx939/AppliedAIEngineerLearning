"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { ProgressStatusChip } from "@/components/progress-status-chip";
import type { LessonMeta, LessonProgress } from "@/lib/types";

export function CurriculumSearch({
  lessons,
  progress,
}: {
  lessons: LessonMeta[];
  progress: Record<string, LessonProgress | undefined>;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return lessons;
    }

    return lessons.filter((lesson) =>
      [
        lesson.title,
        lesson.summary,
        lesson.layerSlug,
        ...lesson.tags,
        ...lesson.prerequisites,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [lessons, query]);

  return (
    <div className="space-y-6">
      <label className="panel flex items-center gap-3 rounded-full px-5 py-3">
        <Search className="h-4 w-4 text-[var(--teal-600)]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by lesson, concept, or prerequisite"
          className="w-full bg-transparent outline-none placeholder:text-[rgba(29,29,27,0.45)]"
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((lesson) => {
          const status = progress[lesson.slug]?.status ?? "not_started";
          return (
            <Link
              key={lesson.slug}
              href={`/learn/${lesson.layerSlug}/${lesson.slug}`}
              className="panel rounded-[1.75rem] p-5 transition hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="eyebrow">{lesson.id}</p>
                  <h3 className="display-title mt-2 text-2xl">{lesson.title}</h3>
                </div>
                <ProgressStatusChip status={status} compact />
              </div>
              <p className="mt-4 text-sm leading-7 text-[rgba(29,29,27,0.74)]">
                {lesson.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {lesson.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[rgba(30,143,134,0.08)] px-3 py-1 text-xs text-[var(--teal-600)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
