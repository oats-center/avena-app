module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			logo: ['B612 Mono', 'monospace'],
			mono: ['Roboto', 'monospace']
		},
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			// {
			// 	mytheme: {
			// 		primary: '#8E6F3E',
			// 		'primary-focus': '#CFB991',
			// 		'primary-content': '#ffffff',
			// 		secondary: '#DAAA00',
			// 		'secondary-focus': '#9D9795',
			// 		'secondary-content': '#ffffff',
			// 		accent: '#EBD99F',
			// 		'accent-focus': '#C4BFC0',
			// 		'accent-content': '#ffffff',
			// 		neutral: '#9D9795',
			// 		'neutral-focus': '#CFB991',
			// 		'neutral-content': '#ffffff',
			// 		'base-100': '#ffffff',
			// 		// 'base-200': '#f9fafb',
			// 		'base-300': '#d1d5db',
			// 		'base-content': '#1f2937',
			// 		info: '#2094f3',
			// 		success: '#009485',
			// 		warning: '#ff9900',
			// 		error: '#ff5724'
			// 	}
			// }
			// 'bumblebee',
			'halloween'
		],
		darkTheme: 'halloween'
	}
};
