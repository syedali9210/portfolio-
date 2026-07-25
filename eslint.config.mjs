import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored/generated output from the design-sync tool, not project
    // source — already gitignored, but flat config doesn't read .gitignore,
    // so without this ESLint walks into a bundled copy of React and reports
    // thousands of false positives against it.
    "ds-bundle/**",
    ".ds-sync/**",
    ".design-sync/**",
    // Other git worktrees (see /.worktrees in .gitignore) are separate
    // checkouts with their own build output — "**/.next/**" alone doesn't
    // catch a nested .next inside one of them.
    ".worktrees/**",
  ]),
]);

export default eslintConfig;
