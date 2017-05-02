import { StyleSheet } from 'aphrodite';
import config from "./config/config";

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

	borderBottomStatusFirst: {
		borderBottom: '10px solid ' + config.status[0].color
	},

	capitalize: {
		textTransform: 'capitalize',
		fontWeight: 'bold'
	}
});

export default AppStyles;