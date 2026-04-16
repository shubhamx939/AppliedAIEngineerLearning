import { PlayCircle } from "lucide-react";
import type { LessonVideo } from "@/lib/types";

export function VideoCard({ video }: { video: LessonVideo }) {
  return (
    <section className="panel overflow-hidden rounded-[2rem]">
      <div className="grid gap-0 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="aspect-video bg-[var(--ink-950)]">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="flex flex-col justify-between gap-4 p-6">
          <div>
            <p className="eyebrow">Short explainer</p>
            <h3 className="display-title mt-2 text-2xl">{video.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[rgba(29,29,27,0.72)]">
              {video.whyThisVideo}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[rgba(29,29,27,0.72)]">
            <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(216,154,43,0.12)] px-3 py-1.5">
              <PlayCircle className="h-4 w-4 text-[var(--gold-500)]" />
              {video.durationMinutes} min
            </span>
            <span>{video.channel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
