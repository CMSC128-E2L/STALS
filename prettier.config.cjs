/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  printWidth: 80,
  trailingComma: "all",
  semi: true,
  useTabs: false,
  tabWidth: 2,
  singleQuote: false,
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
};

module.exports = config;
