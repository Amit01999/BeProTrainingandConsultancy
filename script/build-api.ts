import { build as esbuild } from "esbuild";
import { readFile } from "fs/promises";

async function buildApi() {
  console.log("building API serverless function...");

  const pkg = JSON.parse(await readFile("package.json", "utf-8"));

  // External packages that Vercel will provide
  const externalPackages = [
    "@google/generative-ai",
    "axios",
    "bcrypt",
    "bufferutil",
    "dotenv",
    "nodemailer",
    "openai",
    "pg",
    "stripe",
    "utf-8-validate",
  ];

  await esbuild({
    entryPoints: ["api/index.ts"],
    platform: "node",
    target: "node18",
    bundle: true,
    format: "esm",
    outfile: "api/index.js",
    external: externalPackages,
    logLevel: "info",
    minify: false, // Keep readable for debugging
    sourcemap: true,
    banner: {
      js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);"
    }
  });

  console.log("API build complete!");
}

buildApi().catch((err) => {
  console.error(err);
  process.exit(1);
});
