import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "playwright-report/**",
      "test-results/**",
      "next-env.d.ts",
      // Sandbox-only working directories (never pushed to the published repo)
      "skills/**",
      "upload/**",
      "tool-results/**",
      "examples/**",
      "mini-services/**",
      ".zscripts/**",
      "db/**",
      "download/**",
      "prisma/**",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Stylistic rule only: raw apostrophes in JSX text are valid React;
      // the codebase intentionally uses natural prose.
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
