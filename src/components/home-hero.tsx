"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Flame, Layers3, PlayCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

export function HomeHero({
  continueHref,
}: {
  continueHref: string;
}) {
  return (
    <section className="panel-dark relative overflow-hidden rounded-[2.5rem] px-6 py-10 sm:px-8 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-12 lg:py-14">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,18,18,0.96),rgba(18,16,14,0.9))]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(247,240,227,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(247,240,227,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(216,154,43,0.22),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(30,143,134,0.22),transparent_30%)]" />
      <motion.div
        className="relative space-y-6"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
      >
        <p className="eyebrow text-[rgba(247,240,227,0.78)]">
          A learner-first studio for senior AI engineering
        </p>
        <div className="space-y-5">
          <h1 className="display-title max-w-4xl text-5xl leading-[0.95] text-white md:text-6xl lg:text-7xl">
            Learn modern AI systems in a way that actually feels designed.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[rgba(247,240,227,0.84)]">
            A cinematic self-study LMS that turns a 30-topic applied AI roadmap
            into an intentional reading experience with curated short videos,
            thoughtful progression, and durable local progress tracking.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={continueHref} className="gap-2">
            Continue learning
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink
            href="/curriculum"
            variant="secondary"
            className="gap-2 border-white/15 bg-white/8 text-[var(--ivory-50)]"
          >
            Explore roadmap
            <Layers3 className="h-4 w-4" />
          </ButtonLink>
        </div>
      </motion.div>
      <motion.div
        className="relative mt-8 grid gap-4 lg:mt-0"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.12 }}
      >
        {[
          {
            icon: BookOpen,
            title: "30 cinematic lessons",
            copy: "Written for serious learners, not generic content templates.",
          },
          {
            icon: PlayCircle,
            title: "Short video anchors",
            copy: "Only attached when a sub-10-minute explainer is actually worth your time.",
          },
          {
            icon: Flame,
            title: "Progress that persists",
            copy: "Simple local tracking so the LMS remembers where you left off.",
          },
        ].map(({ icon: Icon, title, copy }) => (
          <div
            key={title}
            className="rounded-[1.75rem] border border-white/12 bg-white/8 p-5 backdrop-blur"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(216,154,43,0.16)]">
              <Icon className="h-5 w-5 text-[var(--ivory-50)]" />
            </div>
            <h2 className="display-title mt-4 text-2xl text-[var(--ivory-50)]">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-7 text-[rgba(247,240,227,0.7)]">
              {copy}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
