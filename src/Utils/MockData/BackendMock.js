import Config from './../../config/config.js';
import Hierarchy from './TransportForLondon/Hierarchy.js';
import Entity from './TransportForLondon/Entity.js';
import EntityType from './TransportForLondon/EntityType.js';
import Query from './TransportForLondon/Query.js';
import Event from './TransportForLondon/Event.js';
import EventTypeAttribute from './TransportForLondon/EventTypeAttribute.js';

class BackendMock {

	static getRouteMapper() {
		return new Map()
			.set(/^entitytype\/hierarchy$/i, BackendMock.getEntityTypeHierarchy)
			.set(/^entitytype\/(-?\d+)\/attributes$/i, BackendMock.getEntityTypeAttributes)
			.set(/^entity\/(-?\d+)\/children\/type\/(-?\d+)\/(((\w)+)\+)*(\w)*$/i, BackendMock.getChildEntitiesOfEntityType)
			.set(/^eventtypes$/i, BackendMock.getEventTypes)
			.set(/^eventtype\/(-?\d+)\/queries/i, BackendMock.getQueriesOfEventType)
            .set(/^entity\/(-?\d+)\/eventtypes$/i, BackendMock.getEventTypesOfEntity)
            .set(/^eventtype\/(-?\d+)\/attributes$/i, BackendMock.getAttributesOfEventType)
            .set(/^entity\/(-?\d+)\/eventtype\/(-?\d+)\/events/i, BackendMock.getEventsOfEventTypeAndEntity);
			.set(/^eventquery\/(-?\d+)\/delete$/i, BackendMock.deleteEventQuery);
	}
		
	static handleRequest(request) {
		const RouteMapper = BackendMock.getRouteMapper();
		const cleanedRoute = request.url.replace(Config.backendRESTRoute,"");
		const targetRoute = [...RouteMapper.keys()].find((route) => {
			return route.exec(cleanedRoute);
		});
		const responseValue = RouteMapper.get(targetRoute)(targetRoute.exec(cleanedRoute));
		return BackendMock.buildResponse(responseValue);
	}
	
	static getEntityTypeHierarchy() {
		return Hierarchy;
	}
	
	static deleteEventQuery() {
		return "Success";
	}
	
	static getQueriesOfEventType() {
		return Query;
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
	    const entityId = parseInt(params[1]);
	    const associatedEventTypeInformation = EventType.filter((eventTypeInformation) => {
	        return eventTypeInformation.associatedEntities.includes(entityId);
        });
	    let associatedEventTypes = [];
        associatedEventTypeInformation.map((eventTypeInformation) => {
            associatedEventTypes = associatedEventTypes.concat(eventTypeInformation.eventTypes);
        });
        return associatedEventTypes;
    }

    static getAttributesOfEventType(params) {
        const eventTypeId = parseInt(params[1]);
		const eventTypeAttributeInformation = EventTypeAttribute.find((eventTypeAttribute) => {
            return eventTypeAttribute.Id === eventTypeId;
        });
        return eventTypeAttributeInformation.TypeAttributes;
    }

    static getEventsOfEventTypeAndEntity(params) {
	    const entityId = parseInt(params[1]);
	    const eventTypeId = parseInt(params[2]);
        const concernedEventTypeInformation = Event.find((eventInformation) => {
           return  eventInformation.eventTypeId === eventTypeId;
        });
        let associatedEvents = [];
        concernedEventTypeInformation.eventInformation.map((eventInformation) => {
           if (eventInformation.associatedEntities.includes(entityId)) {
               associatedEvents = associatedEvents.concat(eventInformation.events);
           }
        });
        return associatedEvents;
    }
	
	static buildResponse(value) {
		return new Response(JSON.stringify(value));
	}
	
	
} export default BackendMock;