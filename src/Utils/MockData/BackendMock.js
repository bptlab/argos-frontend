import Config from './../../config/config.js';
import Hierarchy from './Transport for London/Hierarchy.js';
import Entity from './Transport for London/Entity.js';
import EntityType from './Transport for London/EntityType.js';

class BackendMock {

	static getRouteMapper() {
		return new Map()
			.set(/^entitytype\/hierarchy$/i, BackendMock.getEntityTypeHierarchy)
			.set(/^entitytype\/(-?\d+)\/attributes$/i, BackendMock.getEntityTypeAttributes)
			.set(/^entity\/(-?\d+)\/children\/type\/(-?\d+)\/(((\w)+)\+)*(\w)*$/i, BackendMock.getChildEntitiesOfEntityType)
			.set(/^entity\/(-?\d+)$/i, BackendMock.getEntity);
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
	
	static getEntity(params) {
		return Entity.find((entity) => {
			return entity.Id === parseInt(params[1]);
		});
	}
	
	static getEntityTypeAttributes(params) {
		return EntityType[params[1]]["attributes"];
	}
	
	static getChildEntitiesOfEntityType(params) {
		return Entity.filter((Entity) => {
			return (Entity.ParentId === parseInt(params[1]) && Entity.TypeId === parseInt(params[2]));
		});
	}
	
	static buildResponse(value) {
		return new Response(JSON.stringify(value));
	}
	
	
} export default BackendMock;