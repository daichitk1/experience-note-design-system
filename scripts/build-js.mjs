// React部品を1つのESMファイルにまとめる。reactは利用側のものを使う。
import { build } from "esbuild";

await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  jsx: "automatic",
  external: ["react", "react-dom", "react/jsx-runtime"],
  outfile: "dist/index.js",
  logLevel: "info",
});
