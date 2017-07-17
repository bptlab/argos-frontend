import {StyleSheet} from 'aphrodite';
import config from './config/config';

const AppStyles = StyleSheet.create({
	
	thumbOffColor: {
		backgroundColor: config.colors.toggleOff,
	},
	
	thumbSwitchedColor: {
		backgroundColor: config.colors.error
	},

	errorColor: {
		color: config.colors.error
	},
	
	contentBox: {
		background: config.colors.primaryDarkAlpha,
		borderColor: config.colors.primaryDark,
		color: config.colors.primaryDark
	},

	subHeadline: {
		color: config.colors.primaryDark,
		fontSize: '20px',
		fontWeight: "normal",
		marginBottom: '-10px'
	},
	
	tableCell: {
		textAlign: 'left',
		padding: '15px 20px',
		fontSize: '13px',
		borderTop: '1px solid ' + config.colors.border
	},
	
	tableRow: {
		":nth-child(odd)": {
			background: config.colors.border,
		},
		":nth-child(even)": {
			background: config.colors.textAlternate,
		},
	},
	
	tableHeaderCell: {
		padding: '20px 20px',
		color: config.colors.primaryDark,
		textTransform: 'capitalize'
	},
});

export default AppStyles;