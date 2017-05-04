const config = {
	projectName: "Argos",
	useBackendMock: false,
	backendRESTRoute: "http://localhost:3000/",
	colors: {
		primaryDark: "#000051",
		primary: "#1a237e",
		primaryLight: "#534bae",
		accent: "#ffc107",
		accentLight: "#fff350",
		text: "#424242",
		textAlternate: "#ffffff",
		border: "#e0e0e0",
		diagramLine: '#9E9E9E',
		diagramBackground: "rgba(224, 224, 224, 0.6)",
		error: "#B71C1C",
	},
	descriptions: {
		textNumberOfEvents: "Number of events"
	},
	messages: {
		notFound: "Error 404. The requested page does not exist. You found a glitch in the matrix.",
		noEventTypes: "No event types",
	},
	status: {
		"RUNNING": "green",
		"FAILURE": "red",
	}
};

export default config;
