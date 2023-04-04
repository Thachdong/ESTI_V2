const themeTypography = (options: any) => ({
	fontFamily: 'SF Pro Display',
	h1: {
		// // color: options.textBold,
		// fontWeight: 900,
		// // fontSize: '18px',
		// // lineHeight: '21px',
		// // letterSpacing: '0.05em'
		color: options.textBold,
		fontWeight: 600,
		fontSize: '32px',
		// lineHeight: '38px',
		letterSpacing: '0.05em'
	},
	h2: {
		color: options.textBold,
		fontWeight: 900,
		fontSize: '18px',
		// lineHeight: '21px',
		letterSpacing: '0.05em'
	},
	h3: {
		color: options.textBold,
		fontWeight: 600,
		fontSize: '14px',
		// lineHeight: '17px',
		letterSpacing: '0.02em'
	},
	h4: {
		color: options.textBold,
		fontWeight: 600,
		fontSize: '18px',
		// lineHeight: '17px',
		letterSpacing: '0.02em'
	},
	h5: {
		color: options.textBold,
		fontWeight: 600,
		fontSize: '16px',
		// lineHeight: '17px',
		letterSpacing: '0.02em'
	},
	h6: {},
	body1: {
		// color: options.textContent,
		fontWeight: 400,
		fontSize: '14px',
		// lineHeight: '17px',
		letterSpacing: '0.02em'
	},
	subtitle1: {
		color: options.textSubColor,
		fontWeight: 600,
		fontSize: '12px',
		lineHeight: '14px',
		letterSpacing: '0.02em'
	},
	subtitle2: {
		// fontWeight: 400,
		// fontSize: '12px',
		// lineHeight: '14px',
		// fontStyle: 'italic'
		// letterSpacing: '0.02em'
	},
	largeTitle: {
		color: options.textBold,
		fontWeight: 600,
		fontSize: '32px',
		// lineHeight: '38px',
		letterSpacing: '0.02em'
	},
	largeNumber: {
		fontWeight: 300,
		lineHeight: '57px',
		fontSize: '48px'
	}
})

export default themeTypography
