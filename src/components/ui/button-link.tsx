import Link from "next/link";
import { cn } from "@/lib/utils";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5",
        variant === "primary"
          ? "bg-[linear-gradient(135deg,#0f5b55,#1e8f86)] text-[var(--ivory-50)] shadow-lg"
          : "border border-[rgba(32,26,17,0.08)] bg-white/70 text-[var(--ink-900)]",
        className,
      )}
    >
      {children}
    </Link>
  );
}
