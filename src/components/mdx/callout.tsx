import { cn } from "@/lib/utils";

const variants = {
  note: "border-[rgba(30,143,134,0.22)] bg-[rgba(30,143,134,0.08)]",
  remember: "border-[rgba(216,154,43,0.28)] bg-[rgba(216,154,43,0.08)]",
  warning: "border-[rgba(202,95,62,0.28)] bg-[rgba(202,95,62,0.08)]",
};

export function Callout({
  title,
  tone = "note",
  children,
}: {
  title: string;
  tone?: keyof typeof variants;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("my-6 rounded-[1.5rem] border p-5", variants[tone])}>
      <p className="eyebrow mb-2">{title}</p>
      <div className="space-y-3 text-[0.98rem] leading-8 text-[rgba(29,29,27,0.78)]">
        {children}
      </div>
    </div>
  );
}
