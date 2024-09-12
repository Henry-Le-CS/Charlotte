import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: '@babel/eslint-parser',  // Use Babel parser to handle JSX
      parserOptions: {
        ecmaVersion: 'latest',         // Enables modern ECMAScript features
        sourceType: 'module',          // Enables `import`/`export`
        ecmaFeatures: {
          jsx: true                    // Allows JSX syntax
        }
      }
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
