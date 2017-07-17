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

	containerMarginTop: {
		marginTop: '64px'
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

	floatingActionButton: {
		position: "fixed",
		right: "30px",
		bottom: "30px"
	},

	positionFixedTop: {
		position: "fixed",
		top: "0px"
	},

	paperPadding: {
		paddingLeft: 20,
		paddingRight: 20,
		marginTop: 84,
		paddingTop: 20
	},

	fixMarginRight: {
		marginLeft: '25px !important',
	},

	tableWrapper: {
		width: '100%',
		overflow: 'auto',
		marginBottom: '20px'
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
	
	eventTable: {
		width: '100%',
		borderSpacing: '0px',
	}
});

export default AppStyles;