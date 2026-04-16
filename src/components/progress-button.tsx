"use client";

import { useState, useSyncExternalStore } from "react";
import { CheckCircle2 } from "lucide-react";
import { markLessonCompleted, useLessonProgress } from "@/lib/progress-browser";
import { cn } from "@/lib/utils";

function subscribeToHydration() {
  return () => undefined;
}

export function ProgressButton({
  lessonSlug,
  className,
}: {
  lessonSlug: string;
  className?: string;
}) {
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const [optimisticCompleted, setOptimisticCompleted] = useState(false);
  const progress = useLessonProgress(lessonSlug);
  const isCompleted = optimisticCompleted || progress?.status === "completed";

  return (
    <button
      type="button"
      disabled={!isHydrated || isCompleted}
      onClick={() => {
        setOptimisticCompleted(true);
        markLessonCompleted(lessonSlug);
      }}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#a84427,#ca5f3e)] px-4 py-3 text-sm font-semibold text-[var(--ivory-50)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70",
        className,
      )}
    >
      <CheckCircle2 className="h-4 w-4" />
      {isCompleted ? "Completed" : "Mark complete"}
    </button>
  );
}
