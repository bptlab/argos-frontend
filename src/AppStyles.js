import { StyleSheet } from 'aphrodite';

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

	textAlignCenter: {
		textAlign: "center",
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

    marginAllSites: {
		margin: '30px'
	},

	headerBorderDetail: {
		borderBottom: '10px solid',
	},

	capitalize: {
		textTransform: 'capitalize',
		fontWeight: 'bold'
	}
});

export default AppStyles;