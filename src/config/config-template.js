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
		error: "#B71C1C",
	},
	descriptions: {
		textNumberOfEvents: "Number of events",
		exampleQuery: "INSERT INTO ExampleType SELECT * FROM PATTERN [[2] SimpleType]",
		queryInputFieldHint: "Esper EPL Query",
		queryDescriptionInputFieldHint: 'Description for query',
		addMapping: "Add Mapping Condition",
	},
	messages: {
		notFound: "Error 404. The requested page does not exist. You found a glitch in the matrix.",
		noEventTypes: "No event types",
		deleteQueryMessage: "Do you really want to delete this Query?",
		deleteEventTypeMessage: "Do you really want to delete this EventType?",
		deleteEntityMappingMessage: "Do you really want to delete this EntityMapping?",
		requiredFieldMessage: 'Please fill out this field'
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
};

export default config;
