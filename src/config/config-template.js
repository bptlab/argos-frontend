const config = {
	projectName: "Argos",
	useBackendMock: false,
	backendRESTRoute: "http://localhost:3000/",
	backendWebSocketURL: "ws://localhost:8989/argos/notifications",
	enableCaching: true,
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
	},
	descriptions: {
		textNumberOfEvents: "Number of events",
		exampleQuery: "INSERT INTO ExampleType SELECT * FROM PATTERN [[2] SimpleType]",
		queryInputFieldHint: "Esper EPL Query",
		queryDescriptionInputFieldHint: 'Description for query',
		addMapping: "Add Mapping Condition",
		toggleChildrenEvents: "Show events of children?"
	},
	messages: {
		notFound: "Error 404. The requested page does not exist. You found a glitch in the matrix.",
		noEventTypes: "No event types",
		deleteQueryMessage: "Do you really want to delete this Query?",
		deleteEventTypeMessage: "Do you really want to delete this EventType?",
		deleteEntityMappingMessage: "Do you really want to delete this EntityMapping?",
		requiredFieldMessage: 'Please fill out this field'
	},
	explanations: {
		entityAttributes: "Shows most important attributes and their values for the open entity.",
		toggleChildrenEvents: "If turned on, all events from subsidiary entities are shown as well.",
		eventTableFilterBar: "Use these input fields to filter events in the table below. "
		+ "By default, your search term will be evaluated on all columns. "
		+ "To specify in which column(s) the search should be performed, separate the column name with \":\" from the search term.<br><br>"
		+ "Example: \"ab\" will list all events having any attribute containing this string. \"Attr1:ab\" will show all events having \"ab\" in the value of \"Attr1\".",
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
};

export default config;
