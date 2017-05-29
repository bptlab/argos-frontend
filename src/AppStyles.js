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

    alignItemsFlexEnd: {
        alignItems: 'flex-end',
    },

    textAlignCenter: {
		textAlign: "center",
	},

	rotate90: {
		transform: 'rotate(90)',
	},
	
	thumbOffColor: {
		backgroundColor: config.colors.diagramLine,	
	},
	
	thumbSwitchedColor: {
		backgroundColor: config.colors.error
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

	noMargin: {
		margin: '0px'
	},

	headerBorderDetail: {
		borderBottom: '10px solid',
	},

	capitalize: {
		textTransform: 'capitalize',
		fontWeight: 'bold'
	},

    fontSize24: {
		fontSize: '24px'
	},

	errorColor: {
		color: config.colors.error
	},
	
	contentBox: {
		background: config.colors.primaryDarkAlpha,
		padding: "10px 20px",
		border: "1px solid "+config.colors.primaryDark,
		color: config.colors.primaryDark
	}
});

export default AppStyles;