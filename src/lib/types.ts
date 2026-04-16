export type LessonDifficulty = "Foundation" | "Intermediate" | "Advanced";

export type LessonVideo = {
  youtubeId: string;
  title: string;
  channel: string;
  durationMinutes: number;
  whyThisVideo: string;
};

export type LessonResource = {
  title: string;
  href: string;
  note: string;
};

export type LessonFrontmatter = {
  id: string;
  slug: string;
  title: string;
  layer: string;
  order: number;
  summary: string;
  estimatedMinutes: number;
  difficulty: LessonDifficulty;
  prerequisites: string[];
  tags: string[];
  updatedAt: string;
  video?: LessonVideo;
  resources: LessonResource[];
};

export type LessonMeta = LessonFrontmatter & {
  layerSlug: string;
};

export type CurriculumLayer = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
};

export type LessonGroup = {
  layer: CurriculumLayer;
  lessons: LessonMeta[];
};

export type Lesson = LessonMeta & {
  outline: Array<{
    level: 2 | 3;
    text: string;
    id: string;
  }>;
  content: React.ReactNode;
};

export type ProgressStatus = "not_started" | "in_progress" | "completed";

export type LessonProgress = {
  lessonSlug: string;
  status: ProgressStatus;
  lastOpenedAt: string | null;
  completedAt: string | null;
};

export type LessonProgressMap = Record<string, LessonProgress | undefined>;

export type ProgressSummary = {
  completed: number;
  inProgress: number;
  total: number;
  currentLessonSlug: string | null;
  layerSummaries: Record<string, { total: number; completed: number }>;
};
