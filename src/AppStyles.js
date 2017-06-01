import { StyleSheet } from 'aphrodite';
import config from './config/config';

const AppStyles = StyleSheet.create({
	pAbsolute: {
		position: 'absolute',
	},

	pRelative: {
		position: 'relative',
	},

	dFlex: {
		display: 'flex',
	},

	flexDirectionColumn: {
		flexDirection: 'column',
	},

	flexDirectionRow: {
		flexDirection: 'row',
	},

	justifyContentCenter: {
		justifyContent: 'center',
	},

	justifyContentSpace: {
		justifyContent: 'space-between',
	},

	flexBasis100: {
		flexBasis: '100%',
	},

	flexGrow1: {
		flexGrow: '1',
	},

	flexWrap: {
		flexWrap: 'wrap',
	},

	floatRight: {
		float: 'right',
	},

	autoOverFlow: {
		overflow: 'auto',
	},

	r0: {
		right: '0px',
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

	lineHeight25: {
		lineHeight: '25px',
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

	marginRight: {
		marginRight: '5px'
	},

	marginRightBig: {
		marginRight: '20px'
	},

	marginBottom: {
		marginBottom: '30px'
	},

	marginBottomSmall: {
		marginBottom: '5px'
	},

	headerBorderDetail: {
		borderBottom: '10px solid',
	},

	capitalize: {
		textTransform: 'capitalize',
		fontWeight: 'bold'
	},

	capitalizeFirstLetter: {
		"::first-letter" : {
			textTransform: 'capitalize'
		}
	},

    fontSize24: {
		fontSize: '24px'
	},

	errorColor: {
		color: config.colors.error
	},

	colorWhite: {
		color: 'white'
	},
	
	textLabel: {
		color: 'red'
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
	}
});

export default AppStyles;