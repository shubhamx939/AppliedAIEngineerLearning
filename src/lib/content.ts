import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { mdxComponents } from "@/components/mdx";
import { getLayerMeta } from "@/lib/curriculum-manifest";
import type { Lesson, LessonMeta } from "@/lib/types";
import { VIDEO_CATALOG } from "@/lib/video-catalog";
import type { LessonOutlineItem } from "@/components/lesson-outline";

const contentRoot = path.join(process.cwd(), "src", "content", "lessons");

const frontmatterSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  layer: z.string(),
  order: z.number(),
  summary: z.string(),
  estimatedMinutes: z.number(),
  difficulty: z.enum(["Foundation", "Intermediate", "Advanced"]),
  prerequisites: z.array(z.string()),
  tags: z.array(z.string()),
  updatedAt: z.string(),
  video: z
    .object({
      youtubeId: z.string(),
      title: z.string(),
      channel: z.string(),
      durationMinutes: z.number(),
      whyThisVideo: z.string(),
    })
    .optional(),
  resources: z.array(
    z.object({
      title: z.string(),
      href: z.string(),
      note: z.string(),
    }),
  ),
});

async function getAllLessonPaths() {
  const layerDirs = await fs.readdir(contentRoot);
  const allPaths = await Promise.all(
    layerDirs.map(async (layerDir) => {
      const lessonFiles = await fs.readdir(path.join(contentRoot, layerDir));
      return lessonFiles
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => path.join(contentRoot, layerDir, file));
    }),
  );
  return allPaths.flat();
}

export async function getAllLessonsMeta() {
  const lessonPaths = await getAllLessonPaths();
  const entries = await Promise.all(
    lessonPaths.map(async (lessonPath) => {
      const source = await fs.readFile(lessonPath, "utf8");
      const { data } = matter(source);
      const frontmatter = frontmatterSchema.parse(data);
      const layerSlug = frontmatter.layer;

      return {
        ...frontmatter,
        video: frontmatter.video ?? VIDEO_CATALOG[frontmatter.id],
        layerSlug,
      } satisfies LessonMeta;
    }),
  );

  return entries.sort((a, b) => a.order - b.order);
}

export async function getGroupedLessons() {
  const lessons = await getAllLessonsMeta();
  return lessons.reduce<
    Array<{
      layer: NonNullable<ReturnType<typeof getLayerMeta>>;
      lessons: LessonMeta[];
    }>
  >((acc, lesson) => {
    const layer = getLayerMeta(lesson.layerSlug);

    if (!layer) {
      return acc;
    }

    const existing = acc.find((item) => item.layer.slug === layer.slug);
    if (existing) {
      existing.lessons.push(lesson);
      return acc;
    }

    acc.push({ layer, lessons: [lesson] });
    return acc;
  }, []);
}

export async function getLessonBySlug(layerSlug: string, lessonSlug: string) {
  const filePath = path.join(contentRoot, layerSlug, `${lessonSlug}.mdx`);
  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = frontmatterSchema.parse(data);
  const outline = extractOutline(content);
  const compiled = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
      parseFrontmatter: false,
    },
  });

  return {
    ...frontmatter,
    video: frontmatter.video ?? VIDEO_CATALOG[frontmatter.id],
    layerSlug,
    outline,
    content: compiled.content,
  } satisfies Lesson;
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractOutline(content: string): LessonOutlineItem[] {
  return content
    .split("\n")
    .map((line) => {
      const match = line.match(/^(##|###)\s+(.+)/);
      if (!match) {
        return null;
      }

      return {
        level: match[1] === "##" ? 2 : 3,
        text: match[2].trim(),
        id: slugifyHeading(match[2].trim()),
      } satisfies LessonOutlineItem;
    })
    .filter((item): item is LessonOutlineItem => item !== null);
}
