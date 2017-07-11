const help_en = {
	display: {
		hierarchyStepper: "This gives an overview of the hierarchy, showing the types of parent entities and possible types of child entities.<br><br>It can also be used to navigate back to parental types.",
		entityAttributes: "Shows most important attributes and their values for the open entity.",
		settingsView: {
			textNumberOfEvents: "Number of events",
			eventTypes: "This is a list containing all defined event types. Here you can add, edit or delete their mappings and queries. If an event type is no longer needed, you may delete it here too.",
			eventTypeAttributes: "Shows a list containing all attributes defined on the selected event type.",
			eventTypeQueries: "Shows a list of all queries defined on the selected event type. They can be edited and deleted here.<br><br>"
				+ "Explanation: A query defines the rules when a new event is triggered and how the attributes are composed.",
			entityMappings: "All defined entity mappings are displayed here. New mappings can be added and existing ones edited or deleted."
		},
		scrollDown: "Scroll down to view more Events.",
	},
	input: {
		detailView: {
			toggleChildrenEvents: "Show events of children?",
			toggleChildrenEventsHelp: "If turned on, all events from subsidiary entities are shown as well.",
			eventTableFilterBar: "Use these input fields to filter events in the table below. "
			+ "By default, your search term will be evaluated on all columns. "
			+ "To specify in which column(s) the search should be performed, separate the column name with \":\" from the search term.<br><br>"
			+ "Example: \"ab\" will list all events having any attribute containing this string. \"Attr1:ab\" will show all events having \"ab\" in the value of \"Attr1\".",
		},
		gridViewFilterBar: "Filter all childentities by their name or attribute values.",
		eventQueryView: {
			exampleQuery: "INSERT INTO ExampleType SELECT * FROM PATTERN [[2] SimpleType]",
			queryHint: "Esper EPL Query",
			descriptionHint: 'Description for query',
			description: "Provide a short description for this query.",
			query: "Define the query when events for the current event type should be triggered. For the queries, only EPL is accepted."
				+ " You may find an extensive EPL documentation <a target=\"_blank\" href=\"http://www.espertech.com/esper/release-5.3.0/esper-reference/html/epl_clauses.html#epl-intro\">here</a>.<br><br>"
				+ "Example:<br>"
				+ "INSERT INTO newEventType SELECT * FROM eventType1 WHERE attribute1=\"alert\"<br><br>"
				+ "Explanation:<br>"
				+ "'INSERT INTO newEventType' will create new events for newEventType each time the query matches.<br>"
				+ "'SELECT *' selects all attributes from eventType1 to be included into events of the current event type.<br>"
				+ "'FROM eventType1' defines that this query should be evaluated for each event occurring for eventType1.<br>"
				+ "'WHERE attribute1=\"alert\"' filters all events so the query will only match if the event has \"alert\" in its value for attribute1."
		},
		eventTypeView: {
			name: "Provide a name for the new event type.<br>You can use lower and upper case letters, digits (not at the beginning), underscore and minus.",
			timestamp: "Set a name for the timestamp attribute. This attribute is independent from value attributes defined below and will contain the timestamp of occurrence.",
			attributes: "Define names for all attributes belonging to the new event type."
		},
		entityMappingView: {
			targetStatus: "If an status is selected here, each event fitting a mapping will trigger a status-change on the mapped entity.",
			eventTypeSelection: "Select the event type where a mapping should be defined on.",
			entityTypeSelection: "Select an entity type where the mapping should point to.",
			attributesSelection: "Connect attributes from an event type to attributes of an entity type."
				+ " An event will be mapped to an entity if their values match for all defined attributes.<br><br>"
				+ "Example:<br>Given the mapping \"EventType1 > entityName to EntityType1 > name\".<br>"
				+ "For each event of EventType1 the value of 'entityName' will be checked against each entity of EntityType1."
				+ " If the value matches the 'name' attribute, the event will be assigned to this entity.",
			selectEntityTypeHint: "Select Entity Type",
			selectEventTypeHint: "Select Event Type",
			selectTargetStatusHint: "Target Status, leave empty if no status update is required",
			selectEntityTypeAttributeHint: "Select Entity Type Attribute",
			selectEventTypeAttributeHint: "Select Event Type Attribute",
		},
		search: {
			hint: "Search",
			for: "Search for",
			value: "Search Value",
			columnNameSearch: "Column Name: Search Value",
		},
	},
	button: {
		addMapping: "Add Mapping Condition",
		inspectEntity: "Click to view details and events for this entity.",
		showChildrenOfEntity: "Click to view all child entities for this entity.",
		showHelpBullets: "Click to show help bullets",
		hideHelpBullets: "Click to hide help bullets",
		deleteFilter: "Click here to delete this filter.",
		createEventQuery: "Click here to create a new event query.",
		createEventType: "Click here to create a new event type.",
		createEntityMapping: "Click here to create a new mapping between an entity type and an event type.",
		deleteEventQuery: "Click here to delete this event query.",
		deleteEventType: "Click here to delete this event type.",
		deleteEntityMapping: "Click here to delete this mapping between an entity type and an event type.",
		deleteEntityMappingCondition: "Click here to delete this mapping condition between an entity type attribute and an event type attribute.",
		editEventQuery: "Click here to edit this event query.",
		editEntityMapping: "Click here to edit this mapping between an entity type and an event type."				
	},
	diagram: {
		eventsOverTime: "This diagram shows the timeline of occured events of the currently selected event type. This graph will also be affected by filters set below.",
		childEntitiesStatus: "This bar gives a brief overview over the current status of child entities.",
	},
	descriptions: {
		children: "Children",
		inspect: "Inspect",
		attributes: "Attributes",
		queries: "Event Queries",
		entityMappings: "Entity Mappings",
		eventTypes: "Event Types",
		confirm: "Confirm",
		abort: "Abort",
		save: "Save",
		confirmationTitle: "Please confirm this action.",
		createEntityMappingView: "Create Entity Mapping",
		editEntityMappingView: "Edit EntityMapping",
		createEventTypeView: "Create Event Type",
		createEventQueryView: "Create Event Query for",
		editEventQueryView: "Edit Event Query for",
		availableAttributes: "Available Attributes",
		eventTypeName: "Event Type Name",
		attributeName: "Attribute Name",
		timestampName: "Timestamp Attribute Name",
		attributeDistributionDiagram: "Distribution of Attribute Values",
		attributeDistributionDiagramName: "Attribute Distribution for ",
		analyticsView: "Analytics",
	},
	messages: {
		notFound: "Error 404. The requested page does not exist. You found a glitch in the matrix.",
		noEventTypes: "No event types",
		noEventQueries: "There are no event queries yet.",
		noEntityMappings: "There are no event entity mappings yet.",
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
		requiredFieldMessage: 'Please fill out this field',
		missingData: "The requested diagram cannot be displayed due to lack of data.",
		noSpaceInInput: "This input field does not allow spaces."
	},
};

export default help_en;