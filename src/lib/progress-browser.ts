"use client";

import { useMemo, useSyncExternalStore } from "react";
import type {
  LessonMeta,
  LessonProgress,
  LessonProgressMap,
  ProgressSummary,
} from "@/lib/types";

const STORAGE_KEY = "applied-ai-engineer-progress:v1";
const PROGRESS_EVENT = "applied-ai-engineer-progress";
const EMPTY_PROGRESS_STORE: LessonProgressMap = {};

let cachedRawProgress = "";
let cachedProgressStore: LessonProgressMap = EMPTY_PROGRESS_STORE;

function isDefinedProgress(item: LessonProgress | undefined): item is LessonProgress {
  return item !== undefined;
}

function parseStoredProgress(raw: string | null): LessonProgressMap {
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).map(([lessonSlug, value]) => {
        if (!value || typeof value !== "object" || Array.isArray(value)) {
          return [lessonSlug, undefined];
        }

        const candidate = value as Partial<LessonProgress>;
        const status =
          candidate.status === "completed" ||
          candidate.status === "in_progress" ||
          candidate.status === "not_started"
            ? candidate.status
            : "not_started";

        return [
          lessonSlug,
          {
            lessonSlug,
            status,
            lastOpenedAt:
              typeof candidate.lastOpenedAt === "string" ? candidate.lastOpenedAt : null,
            completedAt:
              typeof candidate.completedAt === "string" ? candidate.completedAt : null,
          } satisfies LessonProgress,
        ];
      }),
    );
  } catch {
    return {};
  }
}

function readProgressStore(): LessonProgressMap {
  if (typeof window === "undefined") {
    return EMPTY_PROGRESS_STORE;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY) ?? "";
  if (raw === cachedRawProgress) {
    return cachedProgressStore;
  }

  cachedRawProgress = raw;
  cachedProgressStore = parseStoredProgress(raw);
  return cachedProgressStore;
}

function emitProgressChange() {
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

function writeProgressStore(progress: LessonProgressMap) {
  if (typeof window === "undefined") {
    return;
  }

  const serialized = JSON.stringify(progress);
  cachedRawProgress = serialized;
  cachedProgressStore = progress;
  window.localStorage.setItem(STORAGE_KEY, serialized);
  emitProgressChange();
}

function updateProgress(
  lessonSlug: string,
  updater: (existing: LessonProgress | undefined) => LessonProgress,
) {
  const progress = readProgressStore();
  progress[lessonSlug] = updater(progress[lessonSlug]);
  writeProgressStore(progress);
}

export function markLessonOpened(lessonSlug: string) {
  const now = new Date().toISOString();

  updateProgress(lessonSlug, (existing) => {
    if (existing?.status === "completed") {
      return {
        ...existing,
        lessonSlug,
        lastOpenedAt: now,
      };
    }

    return {
      lessonSlug,
      status: "in_progress",
      lastOpenedAt: now,
      completedAt: existing?.completedAt ?? null,
    };
  });
}

export function markLessonCompleted(lessonSlug: string) {
  const now = new Date().toISOString();

  updateProgress(lessonSlug, () => ({
    lessonSlug,
    status: "completed",
    lastOpenedAt: now,
    completedAt: now,
  }));
}

function subscribeToProgress(callback: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleChange = () => callback();
  window.addEventListener(PROGRESS_EVENT, handleChange);
  window.addEventListener("storage", handleChange);

  return () => {
    window.removeEventListener(PROGRESS_EVENT, handleChange);
    window.removeEventListener("storage", handleChange);
  };
}

export function getProgressSummary(
  allLessons: LessonMeta[],
  progress: LessonProgressMap,
): ProgressSummary {
  const completed = allLessons.filter(
    (lesson) => progress[lesson.slug]?.status === "completed",
  ).length;
  const inProgress = allLessons.filter(
    (lesson) => progress[lesson.slug]?.status === "in_progress",
  ).length;

  const layerSummaries = allLessons.reduce<Record<string, { total: number; completed: number }>>(
    (acc, lesson) => {
      acc[lesson.layerSlug] ??= { total: 0, completed: 0 };
      acc[lesson.layerSlug].total += 1;
      if (progress[lesson.slug]?.status === "completed") {
        acc[lesson.layerSlug].completed += 1;
      }
      return acc;
    },
    {},
  );

  const currentLessonSlug =
    Object.values(progress)
      .filter(isDefinedProgress)
      .filter((item) => item.status === "in_progress")
      .sort((a, b) => {
        const aTime = a.lastOpenedAt ? new Date(a.lastOpenedAt).getTime() : 0;
        const bTime = b.lastOpenedAt ? new Date(b.lastOpenedAt).getTime() : 0;
        return bTime - aTime;
      })
      .map((item) => item.lessonSlug)[0] ??
    allLessons.find((lesson) => progress[lesson.slug]?.status !== "completed")?.slug ??
    allLessons[0]?.slug ??
    null;

  return {
    completed,
    inProgress,
    total: allLessons.length,
    currentLessonSlug,
    layerSummaries,
  };
}

export function useProgressStore() {
  return useSyncExternalStore<LessonProgressMap>(
    subscribeToProgress,
    readProgressStore,
    () => EMPTY_PROGRESS_STORE,
  );
}

export function useLessonProgress(lessonSlug: string) {
  const progress = useProgressStore();
  return progress[lessonSlug];
}

export function useProgressSummary(allLessons: LessonMeta[]) {
  const progress = useProgressStore();

  return useMemo(() => getProgressSummary(allLessons, progress), [allLessons, progress]);
}
