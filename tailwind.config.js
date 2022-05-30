const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
		},
		extend: {
			colors: {
				"dept-purple": "#7837af",
				"dept-blue": "#3f7bae",
			},
		},
	},
	plugins: [],
};
