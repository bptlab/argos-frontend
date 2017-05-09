import { StyleSheet } from 'aphrodite';
import config from './config/config';

const AppStyles = StyleSheet.create({
	dFlex: {
		display: 'flex',
	},

	flexDirectionColumn: {
		flexDirection: 'column',
	},

	justifyContentCenter: {
		justifyContent: 'center',
	},

	alignItemsCenter: {
		alignItems: 'center',
	},

	rotate90: {
		transform: 'rotate(90)',
	},

	w50: {
		width: '50%',
	},

	w100: {
		width: '100%',
	},

	elementMarginTop: {
		marginTop: '30px'
	},

	headerBorderDetail: {
		borderBottom: '10px solid',
	},

	capitalize: {
		textTransform: 'capitalize',
		fontWeight: 'bold'
	},
	alternateTextColor: {
		color: config.colors.textAlternate
	},
    fontSize24: {
		fontSize: '24px'
	}
});

export default AppStyles;