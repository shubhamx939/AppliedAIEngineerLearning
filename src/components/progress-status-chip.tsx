import { CheckCircle2, Circle, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProgressStatus } from "@/lib/types";

const statusConfig: Record<
  ProgressStatus,
  {
    label: string;
    icon: typeof CheckCircle2;
    className: string;
  }
> = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className:
      "border-emerald-200/80 bg-emerald-50 text-emerald-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
  },
  in_progress: {
    label: "In Progress",
    icon: LoaderCircle,
    className:
      "border-amber-200/80 bg-amber-50 text-amber-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
  },
  not_started: {
    label: "Not Started",
    icon: Circle,
    className:
      "border-slate-200/90 bg-slate-50 text-slate-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
  },
};

export function ProgressStatusChip({
  status,
  label,
  compact = false,
  className,
}: {
  status: ProgressStatus;
  label?: string;
  compact?: boolean;
  className?: string;
}) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border font-medium uppercase tracking-[0.14em]",
        compact ? "px-3 py-1.5 text-[0.68rem]" : "px-3.5 py-2 text-[0.7rem]",
        config.className,
        className,
      )}
    >
      <Icon className={cn("shrink-0", compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
      {label ?? config.label}
    </span>
  );
}
