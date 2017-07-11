import BackendMock from "./MockData/BackendMock";
import config from "./../config/config.js";

const availableRoutes = new Map()
	.set(/^entitytype\/hierarchy$/i, {
		mockFunction: BackendMock.getEntityTypeHierarchy,
		isCachable: true,
	})
	.set(/^entitytype\/(-?\d+)\/attributes$/i, {
		mockFunction: BackendMock.getEntityTypeAttributes,
		isCachable: true,
	})
	.set(/^entity\/(-?\d+)\/children\/type\/(-?\d+)\/(((\w)+)\+)*(\w)*$/i, {
		mockFunction: BackendMock.getChildEntitiesOfEntityType,
		isCachable: false,
	})
	.set(/^eventtypes$/i, {
		mockFunction: BackendMock.getEventTypes,
		isCachable: false,
	})
	.set(/^eventtype\/(-?\d+)\/queries$/i, {
		mockFunction: BackendMock.getQueriesOfEventType,
		isCachable: false,
	})
	.set(/^eventtype\/(-?\d+)\/entitymappings$/i, {
		mockFunction: BackendMock.getMappingsOfEventType,
		isCachable: false,
	})
	.set(/^entitymapping\/(-?\d+)\/delete$/i, {
		mockFunction: BackendMock.deleteMapping,
		isCachable: false,
	})
	.set(/^entity\/(-?\d+)$/i, {
		mockFunction: BackendMock.getEntity,
		isCachable: true,
	})
	.set(/^eventtype\/(-?\d+)\/delete$/i, {
		mockFunction: BackendMock.deleteEventType,
		isCachable: false,
	})
	.set(/^entity\/(-?\d+)\/eventtypes\/(false|true)/i, {
		mockFunction: BackendMock.getEventTypesOfEntity,
		isCachable: false,
	})
	.set(/^eventtype\/(-?\d+)$/i, {
		mockFunction: BackendMock.getEventType,
		isCachable: true,
	})
	.set(/^eventtype\/(-?\d+)\/attributes$/i, {
		mockFunction: BackendMock.getAttributesOfEventType,
		isCachable: true,
	})
	.set(/^entity\/(-?\d+)\/eventtype\/(-?\d+)\/events\/(false|true)/i, {
		mockFunction: BackendMock.getEventsOfEventTypeAndEntity,
		isCachable: false,
	})
	.set(/^eventquery\/(-?\d+)\/delete$/i, {
		mockFunction: BackendMock.deleteEventQuery,
		isCachable: false,
	})
	.set(/^eventtype\/create$/, {
		mockFunction: BackendMock.createEventType,
		isCachable: false,
	})
	.set(/^eventquery\/create$/, {
		mockFunction: BackendMock.createEventQuery,
		isCachable: false,
	})
	.set(/^entitymapping\/create$/, {
		mockFunction: BackendMock.createEntityMapping,
		isCachable: false,
	})
	.set(/^eventquery\/(-?\d+)$/i, {
		mockFunction: BackendMock.getEventQueryById,
		isCachable: false
	})
	.set(/^eventquery\/(-?\d+)\/edit$/i, {
		mockFunction: BackendMock.updateEventQuery,
		isCachable: false
	})
	.set(/^entitymapping\/(-?\d+)$/i, {
		mockFunction: BackendMock.loadEntityMappingById,
		isCachable: false
	})
	.set(/^entitymapping\/(-?\d+)\/edit$/i, {
		mockFunction: BackendMock.updateEntityMapping,
		isCachable: false
	});

class RestRoutesManager {

	static trimUrl(url) {
		return url.replace(config.backendRESTRoute + "/", "").toLowerCase();
	}

	static findRoute(url) {
		const trimmedUrl = RestRoutesManager.trimUrl(url);
		return [...availableRoutes.keys()].find((route) => {
			return route.exec(trimmedUrl);
		});
	}

	static executeMockFunction(request) {
		const cleanedRoute = RestRoutesManager.trimUrl(request.url);
		const targetRoute = RestRoutesManager.findRoute(cleanedRoute);
		return availableRoutes.get(targetRoute).mockFunction(targetRoute.exec(cleanedRoute));
	}

	static shouldBeCached(url) {
		const targetRoute = RestRoutesManager.findRoute(url);
		return availableRoutes.get(targetRoute).isCachable;
	}

}

export default RestRoutesManager;
