import Link from "next/link";
import { Compass, LayoutTemplate, Sparkles, Trophy } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Sparkles },
  { href: "/curriculum", label: "Curriculum", icon: LayoutTemplate },
  { href: "/progress", label: "Progress", icon: Trophy },
  { href: "/about-method", label: "Method", icon: Compass },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(32,26,17,0.08)] bg-[rgba(252,248,240,0.72)] backdrop-blur-xl">
      <div className="app-frame flex w-full flex-col gap-2 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:px-6 xl:px-8 2xl:px-10">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(32,26,17,0.08)] bg-[linear-gradient(135deg,#1d1d1b,#0f5b55)] text-[var(--ivory-50)] shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <p className="eyebrow">Applied AI Engineer</p>
              <p className="display-title text-xl leading-none">Learning Studio</p>
            </div>
          </Link>
        </div>
        <nav className="hidden items-center gap-2 md:flex lg:shrink-0">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-full border border-[rgba(32,26,17,0.08)] bg-white/60 px-4 py-2 text-sm text-[rgba(29,29,27,0.82)] transition hover:-translate-y-0.5 hover:border-[rgba(16,100,95,0.24)] hover:bg-white"
            >
              <Icon className="h-4 w-4 text-[var(--teal-600)]" />
              {label}
            </Link>
          ))}
        </nav>
        <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:hidden">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex shrink-0 items-center gap-2 rounded-full border border-[rgba(32,26,17,0.08)] bg-white/70 px-4 py-2 text-sm text-[rgba(29,29,27,0.82)]"
            >
              <Icon className="h-4 w-4 text-[var(--teal-600)]" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
