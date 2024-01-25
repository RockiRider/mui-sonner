// rollup.config.mjs
import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
// import { nodeResolve } from "@rollup/plugin-node-resolve";
// import css from "rollup-plugin-import-css";
import copy from "rollup-plugin-copy";

const config = defineConfig([
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "es",
    },
    plugins: [
      typescript({
        outDir: "dist",
        declaration: true,
        sourceMap: false,
      }),
      copy({
        targets: [{ src: "src/style.css", dest: "dist" }],
      }),
    ],
    external: ["react", "react-dom", "@mui/material", /\.css$/u],
  },
]);

export default config;
