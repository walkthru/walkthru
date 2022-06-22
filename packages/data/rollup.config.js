import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import externals from 'rollup-plugin-node-externals'
import json from "@rollup/plugin-json";
const analyze = require('rollup-plugin-analyzer')
import babel from 'rollup-plugin-babel';

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      externals(),
      resolve(),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-env"],
      }),
      json(),
      commonjs(),
      analyze({ summaryOnly: true })
    ],
  }
];
