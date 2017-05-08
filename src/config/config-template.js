const config = {
	projectName: "Argos",
	useBackendMock: false,
	backendRESTRoute: "http://localhost:3000/",
	colors: {
		primaryDark: "#000051",
		primary: "#1a237e",
		primaryLight: "#534bae",
		accent: "#C99700",
		accentLight: "#ffc107",
		text: "#424242",
		textAlternate: "#ffffff",
		border: "#e0e0e0",
		diagramLine: '#9E9E9E',
		diagramBackground: "rgba(224, 224, 224, 0.6)",
		error: "#B71C1C",
	},
	descriptions: {
		textNumberOfEvents: "Number of events",
        exampleQuery: "INSERT INTO ExampleType SELECT * FROM PATTERN [[2] SimpleType]",
		queryInputFieldHint: "Esper EPL Query",
		deleteQueryMessage: "Do you really want to delete this Query?"
	},
	messages: {
		notFound: "Error 404. The requested page does not exist. You found a glitch in the matrix.",
		noEventTypes: "No event types",
		actionRejected: "The requested action has been rejected."
	},
    status: {
        "RUNNING": {color: "green", colorLight: 'rgba(0, 128, 0, 0.5)'},
        "FAILURE": {color: "red", colorLight: 'rgba(255, 0, 0, 0.5)'},
    },
};

export default config;
