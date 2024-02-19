// rollup.config.mjs
import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
// import banner2 from 'rollup-plugin-banner2'
import postcss from "rollup-plugin-postcss";

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
      postcss({
        sourceMap: true,
        extract: false,
        minimize: true,
      }),
    ],
    external: ["react", "react-dom", "@mui/material"],
  },
]);

export default config;
