module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['plugin:react/recommended', 'standard'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: ['react'],
	rules: {
		indent: 'off',
		'no-tabs': 'off',
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'always',
				named: 'never',
				asyncArrow: 'always'
			}
		],
		quotes: ['error', 'single', { avoidEscape: false }],
		'no-mixed-spaces-and-tabs': 0,
		'object-curly-spacing': ['error', 'always', { objectsInObjects: false }],
		'comma-dangle': ['error', 'never']
	}
}
