module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			sans: ["Open Sans"],
		},
		extend: {
			colors: {
				"dept-purple": "#723daf",
				"dept-blue": "#4d6caf",
			},
		},
	},
	plugins: [],
};
