import type { Linter } from "eslint";
import nextPlugin from "@next/eslint-plugin-next";

const config: Linter.Config[] = [
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },
];

export default config;
