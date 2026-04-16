import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : "standalone",
  trailingSlash: isStaticExport,
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    unoptimized: isStaticExport,
  },
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
