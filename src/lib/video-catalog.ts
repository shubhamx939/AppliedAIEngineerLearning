import type { LessonVideo } from "@/lib/types";

export const VIDEO_CATALOG: Record<string, LessonVideo> = {
  "NB-02": {
    youtubeId: "HMOI_lkzW08",
    title: "StatQuest: PCA main ideas in only 5 minutes!!!",
    channel: "StatQuest with Josh Starmer",
    durationMinutes: 6.1,
    whyThisVideo:
      "A fast, high-signal intuition primer for one of the most important dimensionality reduction ideas in the lesson.",
  },
  "NB-04": {
    youtubeId: "rIcB4zMYMas",
    title:
      "SQL Window Functions | Clearly Explained | PARTITION BY, ORDER BY, ROW_NUMBER, RANK, DENSE_RANK",
    channel: "Maven Analytics",
    durationMinutes: 7.9,
    whyThisVideo:
      "Window functions are one of the highest-leverage SQL ideas in the module, and this explainer is concise and practical.",
  },
  "NB-06": {
    youtubeId: "ZXiruGOCn9s",
    title: "What are Transformers (Machine Learning Model)?",
    channel: "IBM Technology",
    durationMinutes: 5.9,
    whyThisVideo:
      "A compact visual intro to transformer mechanics that complements the heavier PyTorch and attention sections in the lesson.",
  },
  "NB-08": {
    youtubeId: "5sLYAQS9sWQ",
    title: "How Large Language Models Work",
    channel: "IBM Technology",
    durationMinutes: 5.6,
    whyThisVideo:
      "A strong primer for the model-internals lesson before you dive into KV cache, quantization, and inference tradeoffs.",
  },
  "NB-09": {
    youtubeId: "vD0E3EUb8-8",
    title: "Context Engineering vs. Prompt Engineering: Smarter AI with RAG & Agents",
    channel: "IBM Technology",
    durationMinutes: 7.9,
    whyThisVideo:
      "Useful because it frames prompting as part of a larger context-design problem rather than a bag of prompt tricks.",
  },
  "NB-10": {
    youtubeId: "KEv-F5UkhxU",
    title: "What is LoRA? Low-Rank Adaptation for finetuning LLMs EXPLAINED",
    channel: "AI Coffee Break with Letitia",
    durationMinutes: 8.4,
    whyThisVideo:
      "A focused explainer on the central PEFT method in the lesson, with enough depth to be genuinely useful.",
  },
  "NB-11": {
    youtubeId: "sWH0T4Zez6I",
    title: "Multi Agent Systems Explained: How AI Agents & LLMs Work Together",
    channel: "IBM Technology",
    durationMinutes: 8,
    whyThisVideo:
      "A good visual primer for agent patterns, coordination, and how multi-step systems differ from plain chat interactions.",
  },
  "NB-12": {
    youtubeId: "qAF1NjEVHhY",
    title: "LangChain vs LangGraph: A Tale of Two Frameworks",
    channel: "IBM Technology",
    durationMinutes: 9.9,
    whyThisVideo:
      "Helpful because it directly compares orchestration approaches, which is exactly the decision pressure this lesson is about.",
  },
  "NB-13": {
    youtubeId: "h8gMhXYAv1k",
    title: "What is Tool Calling? Connecting LLMs to Your Data",
    channel: "IBM Technology",
    durationMinutes: 5,
    whyThisVideo:
      "A crisp primer on the interface boundary between model reasoning and real tool execution.",
  },
  "NB-14": {
    youtubeId: "T-D1OfcDW1M",
    title: "What is Retrieval-Augmented Generation (RAG)?",
    channel: "IBM Technology",
    durationMinutes: 6.6,
    whyThisVideo:
      "A strong short overview before the written lesson breaks the pipeline down into chunking, ranking, evaluation, and failure modes.",
  },
  "NB-15": {
    youtubeId: "dN0lsF2cvm4",
    title: "Vector Databases simply explained! (Embeddings & Indexes)",
    channel: "AssemblyAI",
    durationMinutes: 4.4,
    whyThisVideo:
      "Quickly grounds the lesson in embeddings, indexing, and retrieval behavior without overspending your attention.",
  },
  "NB-16": {
    youtubeId: "iduHPtBncBk",
    title: "Machine Learning Experiments with DVC (Hands-On Tutorial!)",
    channel: "DVCorg",
    durationMinutes: 7.5,
    whyThisVideo:
      "Useful because it shows experiment tracking through an actual workflow rather than just defining MLOps in the abstract.",
  },
  "NB-17": {
    youtubeId: "hltLrjabkiY",
    title: "APIs Explained in 6 Minutes!",
    channel: "ByteByteGo",
    durationMinutes: 6.7,
    whyThisVideo:
      "A clean systems primer for request-response thinking, which is essential before layering AI-specific streaming and orchestration on top.",
  },
  "NB-18": {
    youtubeId: "dGAgxozNWFE",
    title: "Cache Systems Every Developer Should Know",
    channel: "ByteByteGo",
    durationMinutes: 5.8,
    whyThisVideo:
      "A useful mental-model reset for how caching works before you map those ideas onto AI memory and session continuity.",
  },
  "NB-19": {
    youtubeId: "6-s_fUXP0FM",
    title: "Design a hybrid cloud infrastructure for and with AI",
    channel: "IBM Technology",
    durationMinutes: 9.2,
    whyThisVideo:
      "A concise platform-level perspective that pairs well with the lesson's cloud decision framework.",
  },
  "NB-20": {
    youtubeId: "TlHvYWVUZyc",
    title: "Kubernetes Explained in 6 Minutes | k8s Architecture",
    channel: "ByteByteGo",
    durationMinutes: 6.5,
    whyThisVideo:
      "A very efficient primer on the orchestration concepts that the written lesson then applies to AI workloads.",
  },
  "NB-21": {
    youtubeId: "trfUBIDeI1Y",
    title: "LLM as a Judge: Scaling AI Evaluation Strategies",
    channel: "IBM Technology",
    durationMinutes: 6.2,
    whyThisVideo:
      "Evaluation is broad, so this gives one sharp and current angle that is genuinely useful in modern LLM quality workflows.",
  },
  "NB-22": {
    youtubeId: "7XfBLutnxC8",
    title: "Guardrails AI Explained: Make Your LLM Outputs 100% RELIABLE and SAFE",
    channel: "STARP AI",
    durationMinutes: 5.9,
    whyThisVideo:
      "A concise guardrails-focused explainer that fits the lesson's risk-layering mindset.",
  },
  "NB-24": {
    youtubeId: "0oeD2Wf25wY",
    title: "Mastering AI Risk: NIST’s Risk Management Framework Explained",
    channel: "IBM Technology",
    durationMinutes: 8.8,
    whyThisVideo:
      "Security and compliance become easier to reason about when framed through an explicit risk-management lens.",
  },
  "NB-25": {
    youtubeId: "McLdlg5Gc9s",
    title: "What is vLLM? Efficient AI Inference for Large Language Models",
    channel: "IBM Technology",
    durationMinutes: 5,
    whyThisVideo:
      "A great short primer on a serving runtime that captures the lesson's main inference-efficiency concerns.",
  },
  "NB-26": {
    youtubeId: "J51oZYcNvP8",
    title: "What is Multimodal AI? How LLMs Process Text, Images, and More",
    channel: "IBM Technology",
    durationMinutes: 9.3,
    whyThisVideo:
      "A strong overview of the interface and representation jump from text-only models to multimodal systems.",
  },
  "NB-27": {
    youtubeId: "0Wwn5IEqFcg",
    title: "Small vs. Large AI Models: Trade-offs & Use Cases Explained",
    channel: "IBM Technology",
    durationMinutes: 9.5,
    whyThisVideo:
      "A useful product-level framing for when smaller models and edge constraints matter more than maximum model size.",
  },
  "NB-28": {
    youtubeId: "CllLqPwCjD4",
    title: "Getting Structured Output in JSON format",
    channel: "Telusko",
    durationMinutes: 9.3,
    whyThisVideo:
      "A direct and practical primer on turning model output into structured data that downstream systems can consume.",
  },
  "NB-29": {
    youtubeId: "83FFn7GqLu0",
    title: "Knowledge Distillation in Deep Neural Network",
    channel: "EscVM",
    durationMinutes: 4.2,
    whyThisVideo:
      "A focused short explainer on the core transfer idea behind distillation, which anchors the lesson's broader strategy discussion.",
  },
  "NB-30": {
    youtubeId: "Aw7iQjKAX2k",
    title: "GraphRAG vs. Traditional RAG: Higher Accuracy & Insight with LLM",
    channel: "IBM Technology",
    durationMinutes: 4.3,
    whyThisVideo:
      "A fast primer on the graph-enhanced retrieval angle that differentiates this capstone lesson from standard RAG.",
  },
};
