/** @type {import("prettier").Config} */
export default {
  endOfLine: "lf",

  plugins: ["prettier-plugin-tailwindcss"],

  tailwindStylesheet: "./src/index.css",

  tailwindFunctions: ["cn", "cva"],
};
