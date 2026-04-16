"use client";

import { ArrowRight, BookOpenText, Brain, DatabaseZap, Sparkles } from "lucide-react";
import { HomeHero } from "@/components/home-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { useProgressSummary } from "@/lib/progress-browser";
import type { LessonGroup } from "@/lib/types";

export function HomePageClient({ grouped }: { grouped: LessonGroup[] }) {
  const allLessons = grouped.flatMap((item) => item.lessons);
  const summary = useProgressSummary(allLessons);
  const continueHref = summary.currentLessonSlug
    ? `/curriculum#${summary.currentLessonSlug}`
    : "/curriculum";

  return (
    <div className="dashboard-page smart-scroll">
      <div className="dashboard-card space-y-8 px-4 py-5 sm:px-6 lg:space-y-10 lg:px-8">
        <HomeHero continueHref={continueHref} />

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="panel rounded-[2rem] p-6 lg:p-8">
            <p className="eyebrow">Why this feels different</p>
            <h2 className="display-title mt-2 text-4xl">An LMS built for deep reading, not noise.</h2>
            <p className="body-copy mt-4">
              The product is designed like an editorial learning studio: strong
              narrative lessons, cinematic pacing, and just enough interface to
              keep your momentum. No notebook clutter. No dashboard overload.
            </p>
            <div className="mt-6 grid gap-4">
              {[
                {
                  icon: BookOpenText,
                  title: "Written material comes first",
                  copy: "Each lesson is structured so you can learn even if you skip the video.",
                },
                {
                  icon: Brain,
                  title: "Topic-specific teaching",
                  copy: "Theory uses diagrams and tradeoffs. Systems use flows and failure modes. Code appears only when it helps.",
                },
                {
                  icon: DatabaseZap,
                  title: "Browser-local progress",
                  copy: "Each learner keeps their own progress in local storage with no account or backend required.",
                },
              ].map(({ icon: Icon, title, copy }) => (
                <div
                  key={title}
                  className="rounded-[1.5rem] border border-[rgba(32,26,17,0.08)] bg-white/40 p-5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(30,143,134,0.08)]">
                    <Icon className="h-5 w-5 text-[var(--teal-600)]" />
                  </div>
                  <h3 className="display-title mt-4 text-2xl">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[rgba(29,29,27,0.74)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-dark rounded-[2rem] p-6 lg:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-[rgba(247,240,227,0.64)]">Your journey</p>
                <h2 className="display-title mt-2 text-4xl">Six layers, thirty lessons, one clear path.</h2>
              </div>
              <Sparkles className="mt-2 h-6 w-6 text-[var(--gold-400)]" />
            </div>
            <div className="mt-6 grid gap-4">
              {grouped.map((group) => {
                const layerProgress = summary.layerSummaries[group.layer.slug];
                const completion = layerProgress
                  ? Math.round((layerProgress.completed / layerProgress.total) * 100)
                  : 0;

                return (
                  <div
                    key={group.layer.slug}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="eyebrow text-[rgba(247,240,227,0.62)]">{group.layer.title}</p>
                        <h3 className="display-title mt-1 text-2xl text-[var(--ivory-50)]">
                          {group.layer.subtitle}
                        </h3>
                      </div>
                      <span className="rounded-full bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[rgba(247,240,227,0.74)]">
                        {completion}%
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[rgba(247,240,227,0.68)]">
                      {group.layer.description}
                    </p>
                  </div>
                );
              })}
            </div>
            <ButtonLink href="/curriculum" className="mt-6 gap-2">
              Open curriculum
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </section>
      </div>
    </div>
  );
}
