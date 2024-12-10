/** @type {import('prettier').Config} */
export default {
  semi: false,
  singleQuote: true,
  printWidth: 80,
  trailingComma: "all",
  tabWidth: 2,
  jsxSingleQuote: false,
  quoteProps: "as-needed",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "avoid",
  endOfLine: "lf",
  plugins: ["prettier-plugin-tailwindcss"],
};
