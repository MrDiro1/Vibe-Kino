module.exports = {
	plugins: {
		'postcss-pxtorem': {
			rootValue: 16,
			propList: ['*'],
			unitPrecision: 5,
			replace: true,
			mediaQuery: false,
			minPixelValue: 0,
		},
	},
}
