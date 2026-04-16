import { CurriculumPageClient } from "@/components/curriculum-page-client";
import { getAllLessonsMeta, getGroupedLessons } from "@/lib/content";

export default async function CurriculumPage() {
  const grouped = await getGroupedLessons();
  const lessons = await getAllLessonsMeta();
  return <CurriculumPageClient grouped={grouped} lessons={lessons} />;
}
