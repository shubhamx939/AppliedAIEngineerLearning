import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavPill({
  href,
  direction,
  label,
  detail,
  className,
}: {
  href: string;
  direction: "previous" | "next";
  label: string;
  detail?: string;
  className?: string;
}) {
  const Icon = direction === "previous" ? ArrowLeft : ArrowRight;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between gap-4 rounded-[1.4rem] border border-[rgba(32,26,17,0.08)] bg-white/70 px-4 py-3 transition hover:-translate-y-0.5 hover:bg-white",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(30,143,134,0.08)] text-[var(--teal-600)]">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="eyebrow">{direction === "previous" ? "Previous" : "Next"}</p>
          <p className="truncate text-sm font-semibold text-[rgba(29,29,27,0.84)]">
            {label}
          </p>
          {detail ? (
            <p className="truncate text-xs text-[rgba(29,29,27,0.56)]">{detail}</p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
