// Bundles the panel into ONE ES module (Lit included) for custom_components/casita/frontend/.
//   npm run build            minified bundle
//   npm run watch            rebuild on change
//   npm run dev              watch + serve the work dir on http://localhost:8123 (dev harness: /frontend/dev/)
import * as esbuild from "esbuild";
import { statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const outfile = resolve(here, "../custom_components/casita/frontend/casita-panel.js");
const watch = process.argv.includes("--watch");
const serve = process.argv.includes("--serve");

const options = {
  entryPoints: [resolve(here, "src/casita-panel.ts")],
  outfile,
  bundle: true,
  format: "esm",
  target: ["es2021", "chrome100", "firefox100", "safari15"],
  minify: !watch,
  sourcemap: watch ? "inline" : false,
  legalComments: "none",
  charset: "utf8",
  logLevel: "info",
  banner: { js: "/* Casita panel for Home Assistant. Lit (BSD-3-Clause, Google LLC) bundled. */" },
};

if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  if (serve) {
    const { port } = await ctx.serve({ servedir: resolve(here, ".."), port: 8123 });
    console.log(`dev harness: http://localhost:${port}/frontend/dev/`);
  }
} else {
  await esbuild.build(options);
  const size = statSync(outfile).size;
  console.log(`${outfile} ${(size / 1024).toFixed(1)} KiB`);
}
