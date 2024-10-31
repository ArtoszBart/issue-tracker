import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				facebook: '#0866ff',
				githubbg: '#010409',
				githublogo: '#f0f6fc',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
export default config;
