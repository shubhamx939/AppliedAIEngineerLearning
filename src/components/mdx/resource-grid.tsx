import Link from "next/link";
import type { LessonResource } from "@/lib/types";

export function ResourceGrid({ items }: { items: LessonResource[] }) {
  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="panel rounded-[1.5rem] p-5 transition hover:-translate-y-1"
        >
          <p className="display-title text-xl">{item.title}</p>
          <p className="mt-2 text-sm leading-7 text-[rgba(29,29,27,0.72)]">
            {item.note}
          </p>
          <p className="mt-3 text-sm text-[var(--teal-600)]">Open resource</p>
        </Link>
      ))}
    </div>
  );
}
