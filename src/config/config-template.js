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
	descriptions: {
		textNumberOfEvents: "Number of events",
		exampleQuery: "INSERT INTO ExampleType SELECT * FROM PATTERN [[2] SimpleType]",
		queryInputFieldHint: "Esper EPL Query",
		queryDescriptionInputFieldHint: 'Description for query',
		addMapping: "Add Mapping Condition",
		toggleChildrenEvents: "Show events of children?",
		selectEntityTypeHint: "Select Entity Type",
		selectEventTypeHint: "Select Event Type",
		selectTargetStatusHint: "Target Status, leave empty if no status update is required",
		selectEntityTypeAttributeHint: "Select Entity Type Attribute",
		selectEventTypeAttributeHint: "Select Event Type Attribute"
	},
	messages: {
		notFound: "Error 404. The requested page does not exist. You found a glitch in the matrix.",
		noEventTypes: "No event types",
		deleteQueryMessage: "Do you really want to delete this Query?",
		deleteEventTypeMessage: "Do you really want to delete this EventType?",
		deleteEntityMappingMessage: "Do you really want to delete this EntityMapping?",
		deletedQueryMessage: "Deleted event query.",
		deletedEventTypeMessage: "Deleted event type.",
		deletedEntityMappingMessage: "Deleted event entity mapping.",
		createdQueryMessage: "Submitted event query.",
		createdEventTypeMessage: "Submitted event type.",
		createdEntityMappingMessage: "Submitted entity mapping",
		updatedQueryMessage: "Updated event query.",
		updatedEventTypeMessage: "Updated event type.",
		updatedEntityMappingMessage: "Updated entity mapping",
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
	eventTableChunkSize: 50,
	notificationDisplayDuration: 5000,
};

export default config;
