import { HomePageClient } from "@/components/home-page-client";
import { getGroupedLessons } from "@/lib/content";

export default async function HomePage() {
  const grouped = await getGroupedLessons();
  return <HomePageClient grouped={grouped} />;
}
