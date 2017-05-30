const help = {
	display: {
		hierarchyStepper: "This gives an overview of the hierarchy, showing the types of parent entities and possible types of child entities.<br><br>It can also be used to navigate back to parental types.",
		entityAttributes: "Shows most important attributes and their values for the open entity.",
	},
	input: {
		toggleChildrenEvents: "If turned on, all events from subsidiary entities are shown as well.",
		eventTableFilterBar: "Use these input fields to filter events in the table below. "
		+ "By default, your search term will be evaluated on all columns. "
		+ "To specify in which column(s) the search should be performed, separate the column name with \":\" from the search term.<br><br>"
		+ "Example: \"ab\" will list all events having any attribute containing this string. \"Attr1:ab\" will show all events having \"ab\" in the value of \"Attr1\".",
	},
	button: {
		inspectEntity: "Click to view details and events for this entity.",
		showChildrenOfEntity: "Click to view all child entities for this entity."
	},
	diagram: {
		eventsOverTime: "This diagram shows the timeline of occured events of the currently selected event type. This graph will also be affected by filters set below.",
		childEntitiesStatus: "This bar gives a brief overview over the current status of child entities.",
	},
};

export default help;