import config from './config/config';

const ThemeStyles = {
	fontFamily: 'Roboto, sans-serif',
	palette: {
		primary1Color: config.colors.primaryDark,
		primary2Color: config.colors.primary,
		primary3Color: config.colors.primaryLight,
		accent1Color: config.colors.accent,
		accent2Color: config.colors.accentLight,
		accent3Color: config.colors.primary,
		textColor: config.colors.text,
		alternateTextColor: config.colors.textAlternate,
		canvasColor: '#ffffff',
		borderColor: config.colors.border,
		pickerHeaderColor: config.colors.accent,
		shadowColor: config.colors.primary,
		},
};

export default ThemeStyles;