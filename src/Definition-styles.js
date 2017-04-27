import { StyleSheet } from 'aphrodite';
import config from './config/config';

const definitionStyles = StyleSheet.create({
	primaryBackgroundColor: {
		backgroundColor: config.colors.primaryColor,
	},
	secondaryBackgroundColor: {
		backgroundColor: config.colors.secondaryColor,
	},
	tertiaryBackgroundColor: {
		backgroundColor: config.colors.tertiaryColor,
	},
	errorColor: {
		color: config.colors.errorColor,
	},
});

export default definitionStyles;