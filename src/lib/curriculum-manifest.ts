export const LAYERS = [
  {
    slug: "layer-1-foundations",
    title: "Layer 1",
    subtitle: "Foundations",
    description:
      "Programming depth, mathematical intuition, and data systems fluency.",
  },
  {
    slug: "layer-2-ai-ml-core",
    title: "Layer 2",
    subtitle: "AI / ML Core",
    description:
      "Classical ML, deep learning, and text engineering that underpin modern AI systems.",
  },
  {
    slug: "layer-3-llm-agentic",
    title: "Layer 3",
    subtitle: "LLM & Agentic AI",
    description:
      "Model behavior, prompting, fine-tuning, orchestration, and tool-augmented systems.",
  },
  {
    slug: "layer-4-systems-infra",
    title: "Layer 4",
    subtitle: "Systems & Infrastructure",
    description:
      "Retrieval, infra, memory, APIs, and cloud foundations for operational AI.",
  },
  {
    slug: "layer-5-production",
    title: "Layer 5",
    subtitle: "Production Engineering",
    description:
      "Evaluation, safety, system design, security, and serving under real constraints.",
  },
  {
    slug: "layer-6-frontier",
    title: "Layer 6",
    subtitle: "Frontier",
    description:
      "Multimodal systems, edge inference, structured generation, synthetic data, and long context.",
  },
] as const;

export function getLayerMeta(layerSlug: string) {
  return LAYERS.find((layer) => layer.slug === layerSlug);
}
