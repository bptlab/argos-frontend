import Hierarchy from "./TransportForLondon/Hierarchy.js";
import Entity from "./TransportForLondon/Entity.js";
import EntityType from "./TransportForLondon/EntityType.js";
import Query from "./TransportForLondon/Query.js";
import EntityMapping from "./TransportForLondon/EntityMapping.js";
import Event from "./TransportForLondon/Event.js";
import EventTypeAttribute from "./TransportForLondon/EventTypeAttribute.js";
import EventType from "./TransportForLondon/EventType.js";

class BackendMock {

	static getEntityTypeHierarchy() {
		return Hierarchy;
	}
	
	static createEntityMapping() {
		return "Success";
	}
	
	static createEventQuery() {
		return "Success";
	}

	static createEventType() {
		return "Success";
	}

	static deleteEventQuery() {
		return "Success";
	}

	static deleteEventType() {
		return "Success";
	}

	static deleteMapping() {
		return "Success";
	}

	static updateEventQuery() {
		return "Success";
	}

	static updateEntityMapping() {
		return "Success";
	}

	static getQueriesOfEventType() {
		return Query;
	}

	static getMappingsOfEventType(params) {
		const mappingInformation = EntityMapping.find((mapping) => {
			return mapping.Id === parseInt(params[1], 10);
		});
		if (!mappingInformation) {
			return [];
		}
		return mappingInformation.EntityMappings;
	}

	static getEntity(params) {
		return Entity.find((entity) => {
			return entity.Id === parseInt(params[1], 10);
		});
	}

	static getEntityTypeAttributes(params) {
		return EntityType[params[1]]["attributes"];
	}

	static getEventTypes() {
		let eventTypes = [];
		EventType.forEach((association) => {
			eventTypes = eventTypes.concat(association.eventTypes);
		});
		return eventTypes;
	}

	static getChildEntitiesOfEntityType(params) {
		return Entity.filter((Entity) => {
			return (Entity.ParentId === parseInt(params[1], 10) &&
			Entity.TypeId === parseInt(params[2], 10));
		});
	}

	static getEventTypesOfEntity(params) {
		const entityId = parseInt(params[1], 10);
		const associatedEventTypeInformation = EventType.filter((eventTypeInformation) => {
			return eventTypeInformation.associatedEntities.includes(entityId);
		});
		let associatedEventTypes = [];
		associatedEventTypeInformation.forEach((eventTypeInformation) => {
			associatedEventTypes = associatedEventTypes.concat(eventTypeInformation.eventTypes);
		});
		return associatedEventTypes;
	}

	static getEventType(params) {
		let requestedEventType = {};
		EventType.forEach((association) => {
			association.eventTypes.forEach(
				(eventType) => {
					if (eventType.Id === parseInt(params[1], 10)) {
						requestedEventType = eventType;
					}
				});
		});
		return requestedEventType;
	}

	static getAttributesOfEventType(params) {
		const eventTypeId = parseInt(params[1], 10);
		const eventTypeAttributeInformation = EventTypeAttribute.find((eventTypeAttribute) => {
			return eventTypeAttribute.Id === eventTypeId;
		});
		return eventTypeAttributeInformation.TypeAttributes;
	}

	static getEventsOfEventTypeAndEntity(params) {
		const entityId = parseInt(params[1], 10);
		const eventTypeId = parseInt(params[2], 10);
		const concernedEventTypeInformation = Event.find((eventInformation) => {
			return eventInformation.eventTypeId === eventTypeId;
		});
		let associatedEvents = [];
		concernedEventTypeInformation.eventInformation.forEach((eventInformation) => {
			if (eventInformation.associatedEntities.includes(entityId)) {
				associatedEvents = associatedEvents.concat(eventInformation.events);
			}
		});
		return associatedEvents;
	}

	static getEventQueryById(params) {
		return Query.find((eventQuery) => {
			return eventQuery.Id === parseInt(params[1], 10);
        });
	}


	static loadEntityMappingById(params) {
		let desiredEntityMapping;
		EntityMapping.forEach((entity) => {
			return entity.EntityMappings.forEach((entityMapping) => {
				if (entityMapping.Id === parseInt(params[1], 10)) {
					desiredEntityMapping = entityMapping;
				}
			});
		});
		if (desiredEntityMapping) {
			return desiredEntityMapping;
		}
		return {};
	}
}
export default BackendMock;
