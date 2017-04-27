import Config from './../../config/config.js';
import Hierarchy from './Transport for London/Hierarchy.js';
import Entity from './Transport for London/Entity.js';

class BackendMock {

	static getRouteMapper() {
		return new Map()
			.set(/entitytype\/hierarchy/i, BackendMock.getEntityTypeHierarchy)
			.set(/entitytype\/(\d+)\/attributes/i, BackendMock.getEntityTypeAttributes)
			.set(/entity\/(\d+)/i, BackendMock.getEntity);
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
			return entity.Id = params[1];
		});
	}
	
	static getEntityTypeAttributes(params) {
		
	}
	
	static buildResponse(value) {
		const response = new Response(JSON.stringify(value));
		return response;
	}
	
	
} export default BackendMock;