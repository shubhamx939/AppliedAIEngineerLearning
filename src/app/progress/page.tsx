import { ProgressPageClient } from "@/components/progress-page-client";
import { getAllLessonsMeta, getGroupedLessons } from "@/lib/content";

export default async function ProgressPage() {
  const grouped = await getGroupedLessons();
  const lessons = await getAllLessonsMeta();
  return <ProgressPageClient grouped={grouped} lessons={lessons} />;
}
