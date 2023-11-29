module.exports = {
  root: true,
  extends: ["custom", "plugin:tailwindcss/recommended"],
  plugins: ["tailwindcss"],
  rules: {
    "tailwindcss/no-custom-classname": "off",
  },
  settings: {
    tailwindcss: {
      callees: ["cn"],
    },
  },
}
