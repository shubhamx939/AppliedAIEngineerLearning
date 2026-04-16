import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/callout";
import { KeyPoints } from "@/components/mdx/key-points";
import { ResourceGrid } from "@/components/mdx/resource-grid";
import { SectionIntro } from "@/components/mdx/section-intro";

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export const mdxComponents: MDXComponents = {
  Callout,
  KeyPoints,
  ResourceGrid,
  SectionIntro,
  h2: ({ children }) => {
    const text = typeof children === "string" ? children : String(children);
    const id = slugifyHeading(text);
    return <h2 id={id}>{children}</h2>;
  },
  h3: ({ children }) => {
    const text = typeof children === "string" ? children : String(children);
    const id = slugifyHeading(text);
    return <h3 id={id}>{children}</h3>;
  },
};
