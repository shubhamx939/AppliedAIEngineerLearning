"use client";

import { useEffect } from "react";
import { markLessonOpened } from "@/lib/progress-browser";

export function LessonProgressTracker({ lessonSlug }: { lessonSlug: string }) {
  useEffect(() => {
    markLessonOpened(lessonSlug);
  }, [lessonSlug]);

  return null;
}
