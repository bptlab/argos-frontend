const help_de = {
	display: {
		hierarchyStepper: "Zeigt eine Übersicht der Typen-Hierarchy an. Dabei werden die aktuell übergeordneten Typen, sowie mögliche Kind-Typen der ersten Ebene angezeigt.<br><br>Die Ansicht kann auch zur Navigation zurück in übergeordnete Ebenen genutzt werden.",
		entityAttributes: "Zeigt die wichtigsten Attribute und deren Werte für die aktuelle Entität an.",
		settingsView: {
			textNumberOfEvents: "Anzahl der Ereignisse",
			eventTypes: "Diese Liste beinhaltet alle definierten Eventtypen. Hier können Zuordnungen (mappings) und Anfragen (queries) angelegt, verändert und gelöscht werden. Ungenutzte Eventtypen können hier auch entfernt werden.",
			eventTypeAttributes: "Zeigt eine Liste aller Attribute, die auf dem ausgewählten Eventtyp definiert sind.",
			eventTypeQueries: "Zeigt eine Liste aller Anfragen (queries), die auf dem ausgewählten Eventtyp definiert sind. Sie können hier bearbeitet und gelöscht werden.<br><br>"
			+ "Erklärung: Eine Anfrage (query) definiert die Regeln, wonach ein neues Event und seine Attribute erzeugt werden.",
			entityMappings: "Alle gespeicherten Entitätsverknüpfungen (entity mappings) werden hier angezeigt. Verknüpfungen können neu angelegt, bearbeitet oder gelöscht werden.",
		},
		scrollDown: "Herunterscrollen um mehr Events zu laden.",
	},
	input: {
		detailView: {
			toggleChildrenEvents: "Ereignisse von Kind-Entitäten anzeigen?",
			toggleChildrenEventsHelp: "Wenn aktiv, werden alle Events von Kind-Entitäten mit angezeigt.",
			eventTableFilterBar: "Mithilfe dieser Eingabefelder kann die untenstehende Event-Tabelle gefiltert werden."
			+ "Standardmäßig werden dabei alle Spalten durchsucht. "
			+ "Um Filter auf eine Spalte einzuschränken, wird der Spaltenname mit \":\" von dem Suchbegriff getrennt.<br><br>"
			+ "Beispiel: \"ab\" zeigt alle Events, wo ein beliebiges Attribut diese Zeichenkette beinhaltet. \"Attr1:ab\" zeigt alle Events mit \"ab\" in der Spalte \"Attr1\".",
		},
		gridViewFilterBar: "Filtert alle Kind-Entitäten nach ihrem Namen oder ihren Attributwerten.",
		eventQueryView: {
			exampleQuery: "INSERT INTO ExampleType SELECT * FROM PATTERN [[2] SimpleType]",
			queryHint: "Esper EPL Abfrage",
			descriptionHint: 'Beschreibung für Abfrage',
			description: "Geben Sie eine kurze Beschreibung für diese Anfrage (query) an.",
			query: "Definieren Sie eine Anfrage (query) nach welcher Events für den aktuellen Eventtypen erzeugt werden sollen. Benutzen Sie die EPL-Syntax. "
			+ "Eine ausführliche EPL Dokumentation befindet sich <a target=\"_blank\" href=\"http://www.espertech.com/esper/release-5.3.0/esper-reference/html/epl_clauses.html#epl-intro\">hier</a>.<br><br>"
			+ "Beispiel:<br>"
			+ "INSERT INTO neuerEventtyp SELECT * FROM eventtyp1 WHERE attribut1=\"hinweis\"<br><br>"
			+ "Erklärung:<br>"
			+ "'INSERT INTO neuerEventtyp' erzeugt bei jedem Zutreffen der Anfrage neue Events für neuerEventtyp.<br>"
			+ "'SELECT *' fügt alle Attribute von eventtyp1 in die Events von neuerEventtyp ein.<br>"
			+ "'FROM eventtyp1' definiert, dass diese Anfrage für jedes Event von eventtyp1 ausgewertet wird.<br>"
			+ "'WHERE attribut1=\"hinweis\"' filtert alle Events, sodass die Anfrage nur zutrifft, wenn \"hinweis\" in attribut1 des Events steht.",
		},
		eventTypeView: {
			name: "Geben Sie einen Namen für den neuen Eventtypen an.<br>Dieser kann aus Groß- und Kleinbuchstaben, Ziffern (jedoch nicht am Anfang), sowie Minus und Unterstrich bestehen.",
			timestamp: "Vergeben Sie hier einen Namen für das Zeitstempel (timestamp) Attribut. "
			+ "Dieses Attribut ist unabhängig von den Wert-Attributen, welche weiter unten konfiguriert werden können und beinhaltet den Zeitstempel des Auftretens des Events.",
			attributes: "Definieren Sie die Namen aller Attribute für den neuen Eventtypen.",
		},
		entityMappingView: {
			targetStatus: "Wenn hier ein Status ausgewählt ist, wird jedes Event welches einer Zuordnung (Mapping) genügt, den Status der entsprechenden Entität (Entity) ändern.",
			eventTypeSelection: "Wählen Sie einen Eventtypen aus, um eine Zuordnung (Mapping) für diesen zu definieren.",
			entityTypeSelection: "Wählen Sie einen Entitätstypen als Ziel für diese Zuordnung (Mapping) aus.",
			attributesSelection: "Ordnet Attribute eines Eventtypen den Attributen eines Entitätstypen zu."
			+ " Ein Event wird einer Entität zugeordnen, wenn alle ausgewählten Attribute in ihrem Wert übereinstimmen.<br><br>"
			+ "Beispiel:<br>Gegeben die Zuordnung (Mapping) \"Eventtyp1 > entitätsName zu Entitätstyp1 > name\".<br>"
			+ "Für jedes eintreffende Event vom Typ Eventtyp1 wird nun eine Entität vom Typ Entitätstyp1 gesucht, sodass Event > 'entitätsName' mit Entität > 'name' übereinstimmt."
			+ " Sollt eine solche Übereinstimmung gefunden werden, so wird das Event der Entität zugeordnet.",
			selectEntityTypeHint: "Entitätstyp wählen",
			selectEventTypeHint: "Ereignistyp wählen",
			selectTargetStatusHint: "Gewünschte Statusänderung (leer, falls keine Statusänderung erforderlich)",
			selectEntityTypeAttributeHint: "Attribut von Entitätstyp wählen",
			selectEventTypeAttributeHint: "Attribut von Ereignistyp wählen",
		},
		search: {
			hint: "Suche",
			for: "Suchen nach",
			value: "Suchbegriff",
			columnNameSearch: "Spaltenname: Suchbegriff",
		},
	},
	button: {
		addMapping: "Entitätsverknüpfung hinzufügen",
		inspectEntity: "Klicken Sie hier, um sich Details und Events für diese Entität anzusehen.",
		showChildrenOfEntity: "Klicken Sie hier, um sich alle Kinder-Entitäten dieser Entität anzusehen.",
		showHelpBullets: "Klicken Sie hier, um Hilfekreise angezeigt zu bekommen.",
		hideHelpBullets: "Klicken Sie hier, um Hilfekreise nicht mehr angezeigt zu bekommen.",
		deleteFilter: "Klicken Sie hier, um diesen Filter zu löschen.",
		createEventQuery: "Klicken Sie hier, um eine neue Ereignisabfrage anzulegen.",
		createEventType: "Klicken Sie hier, um einen neuen Ereignistypen anzulegen.",
		createEntityMapping: "Klicken Sie hier, um ein neues Mapping zwischen einem Ereignistypen und einem Entitätstypen anzulegen.",
		deleteEventQuery: "Klicken Sie hier, um diese Ereignisabfrage zu löschen.",
		deleteEventType: "Klicken Sie hier, um diesen Ereignistypen zu löschen.",
		deleteEntityMapping: "Klicken Sie hier, um dieses Mapping zwischen einem Ereignistypen und einem Entitätstypen zu löschen.",
		deleteEntityMappingCondition: "Klicken Sie hier, um diese Mapping Bedingung zwischen den zwei Attributen zu löschen.",
		editEventQuery: "Klicken Sie hier, um diese Ereignisabfrage zu bearbeiten.",
		editEntityMapping: "Klicken Sie hier, um dieses Mapping zwischen einem Ereignistypen und einem Entitätstypen zu bearbeiten."
	},
	diagram: {
		eventsOverTime: "Dieses Diagramm zeigt Ihnen eine Übersicht über alle Events des ausgewählten Typen in zeitlicher Abhängigkeit. Filter-Optionen beeinflussen dieses Diagramm.",
		childEntitiesStatus: "Dieses Diagramm gibt Ihnen einen groben Überblick über die Verteilung der Status der Kinder-Entitäten.",
	},
	descriptions: {
		children: "Kinder",
		inspect: "Untersuchen",
		attributes: "Attribute",
		queries: "Ereignisabfragen",
		entityMappings: "Entitätsverknüpfungen",
		eventTypes: "Ereignistypen",
		confirm: "Bestätigen",
		abort: "Abbrechen",
		save: "Speichern",
		confirmationTitle: "Bitte bestätigen Sie den Vorgang.",
		createEntityMappingView: "Entitätsverknüpfung erstellen",
		editEntityMappingView: "Entitätsverknüpfung bearbeiten",
		createEventTypeView: "Ereignistyp erstellen",
		createEventQueryView: "Ereignisabfrage erstellen",
		editEventQueryView: "Ereignisabfrage bearbeiten für ",
		availableAttributes: "Verfügbare Attribute",
		eventTypeName: "Name des Ereignistyps",
		attributeName: "Name des Attributs",
		timestampName: "Name des Zeitstempel-Attributs",
		attributeDistributionDiagram: "Verteilung der Attributwerte",
		attributeDistributionDiagramName: "Attributverteilung für ",
		analyticsView: "Analyse",
	},
	messages: {
		notFound: "Fehler 404. Die angeforderte Seite existiert nicht.",
		noEventTypes: "Keine Ereignistypen",
		noEventQueries: "Noch keine Ereignisabfragen definiert",
		noEntityMappings: "Es wurden noch keine Entitätsverknüpfungen definiert.",
		deleteQueryMessage: "Möchten Sie diese Ereignisabfrage wirklich löschen?",
		deleteEventTypeMessage: "Möchten Sie diesen Ereignistypen wirklich löschen?",
		deleteEntityMappingMessage: "Möchten Sie diese Entitätsverknüpfung wirklich löschen?",
		deletedQueryMessage: "Ereignisabfrage gelöscht.",
		deletedEventTypeMessage: "Ereignistyp gelöscht.",
		deletedEntityMappingMessage: "Entitätsverknüpfung gelöscht.",
		createdQueryMessage: "Ereignisabfrage gespeichert.",
		createdEventTypeMessage: "Ereignistyp gespeichert.",
		createdEntityMappingMessage: "Entitätsverknüpfung gespeichert.",
		updatedQueryMessage: "Ereignisabfrage aktualisiert.",
		updatedEventTypeMessage: "Ereignistyp aktualisiert.",
		updatedEntityMappingMessage: "Entitätsverknüpfung aktualisiert.",
		requiredFieldMessage: 'Bitte füllen Sie dieses Feld aus.',
		missingData: "Das Diagramm kann wegen fehlender Daten nicht angezeigt werden.",
		noSpaceInInput: "Diese Eingabe darf keine Leerzeichen beinhalten."
	},
};

export default help_de;