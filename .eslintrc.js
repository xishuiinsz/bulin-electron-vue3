module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/essential"],
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018,
  },
  plugins: ["vue"],
  rules: {
    "vue/no-multiple-template-root": "off",
    "vue/no-v-model-argument": "off",
    "no-unused-vars": [
      "error",
      // we are only using this rule to check for unused arguments since TS
      // catches unused variables but not args.
      { varsIgnorePattern: ".*", args: "none" },
    ],
  },
};
