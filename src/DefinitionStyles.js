import { StyleSheet } from 'aphrodite';
import config from './config/config';

const DefinitionStyles = StyleSheet.create({
	// Colors //
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

	// Spacing //
	elementMarginTop: {
		marginTop: '30px'
	}
});

export default DefinitionStyles;