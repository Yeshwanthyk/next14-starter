module.exports = {
	extends: ["eslint:recommended", "next", "turbo", "prettier"],
	rules: {
	  "@next/next/no-html-link-for-pages": "off",
	  "react/jsx-key": "off",
	},
	parserOptions: {
	  babelOptions: {
	    presets: [require.resolve("next/babel")],
	  },
	},
      };