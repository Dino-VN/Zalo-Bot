import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  {
    files: ["**/*.js"],
    // rules: {
    //   "no-unused-vars": ["error", { 
    //     "vars": "none", 
    //     "args": "after-used", 
    //     "ignoreRestSiblings": true,
    //     "varsIgnorePattern": "^(React|_)$" // Bỏ qua các biến bắt đầu bằng React hoặc _
    //   }]
    // }
  }
];