const config = {
	projectName: "Argos",
	useBackendMock: false,
	basename: '/',
	backendRESTRoute: "http://localhost:3000/",
	backendWebSocketURL: "ws://localhost:8989/argos/notifications",
	enableCaching: true,
	language: "en",
	colors: {
		primaryDark: "#000051",
		primaryDarkAlpha: "rgba(0, 0, 81, 0.2)",
		primary: "#1a237e",
		primaryLight: "#534bae",
		accent: "#C99700",
		accentLight: "#ffc107",
		text: "#424242",
		textAlternate: "#ffffff",
		border: "#e0e0e0",
		toggleOff: '#9E9E9E',
		error: "#B71C1C",
		success: "#558B2F"
	},
	statuses: [
		{
			name:"RUNNING",
			color: "#4CAF50",
			colorLight: '#81C784'
		},
		{
			name:"FAILURE",
			color: "#E53935",
			colorLight: "#E57373"
		},
		{
			name:"UNDEFINED",
			color: "#757575",
			colorLight: "#BDBDBD"
		},
	],
	eventTableChunkSize: 50,
	notificationDisplayDuration: 5000,
};

export default config;
