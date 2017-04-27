import { StyleSheet } from 'aphrodite';

const AppStyles = StyleSheet.create({
	container: {
		maxWidth: '900px',
		margin: '0 auto',
	},

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
});

export default AppStyles;