//import config from "eslint-config-standard";
//import js from "@eslint/js";
import globals from "globals";
import typescriptEslintParser from "@typescript-eslint/parser";

export default [
  //js.configs.recommended,

  {
    ignores: [".config/*"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: typescriptEslintParser,
      //parserOptions: {
      //  project: ["./tsconfig.json"],
      //createDefaultProgram: true,
      //},
      globals: {
        ...globals.browser,
        ...globals.jasmine,
        require: true,
        process: true,
        test: true,
        //cy: true,
        //Cypress: true,
      },
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
    },
  },
];
