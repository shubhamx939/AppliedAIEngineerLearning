import Link from "next/link";
import { ListTree } from "lucide-react";
import { cn } from "@/lib/utils";

export type LessonOutlineItem = {
  level: 2 | 3;
  text: string;
  id: string;
};

export function LessonOutline({
  items,
  lessonId,
  className,
}: {
  items: LessonOutlineItem[];
  lessonId: string;
  className?: string;
}) {
  return (
    <aside className={cn("panel rounded-[2rem] p-5", className)}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(30,143,134,0.08)] text-[var(--teal-600)]">
          <ListTree className="h-4 w-4" />
        </div>
        <div>
          <p className="eyebrow">{lessonId}</p>
          <h2 className="display-title text-2xl">Lesson map</h2>
        </div>
      </div>
      <div className="smart-scroll mt-5 max-h-[calc(100vh-18rem)] space-y-2 pr-1">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            className={`block rounded-[1.2rem] px-4 py-3 text-sm transition hover:bg-[rgba(16,100,95,0.08)] ${
              item.level === 2
                ? "bg-[rgba(216,154,43,0.08)] font-semibold text-[rgba(29,29,27,0.84)]"
                : "ml-4 text-[rgba(29,29,27,0.64)]"
            }`}
          >
            {item.text}
          </Link>
        ))}
      </div>
    </aside>
  );
}
