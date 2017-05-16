import config from './../config/config.js';

class ChangeNotifier  {
	
	constructor() {
		if(!config.useBackendMock) {
			this.webSocket = new WebSocket(config.backendWebSocketURL);
			this.webSocket.onerror = this.handleError;
			this.webSocket.onopen = this.handleNewConnection;
			this.webSocket.onclose = this.handleConnectionClose;
			this.webSocket.onmessage = this.handleMessage;
		}
		this.subscribers = [];
		this.handleMessage = this.handleMessage.bind(this);
		this.register = this.register.bind(this);
		this.unregisterAll = this.unregisterAll.bind(this);
	}
	
	handleNewConnection(event) {
		console.log("[WEBSOCKET] Established a new connection! Details: "+event.data);
	}
	
	handleError(event) {
		console.log("[WEBSOCKET] An error occured! Details: "+event.data);
	}
	
	handleMessage(event) {
		const serverNotifications = JSON.parse(event.data);
		serverNotifications.forEach((serverNotification) => {
			this.subscribers.forEach((notificationNote) => {
				if (notificationNote.artifactType === serverNotification.ArtifactType && 
						((serverNotification.ArtifactType === "Event" &&
						notificationNote.artifactId === serverNotification.EntityId) || 
						notificationNote.artifactId === serverNotification.ArtifcatId)) {
							notificationNote.notificationCallback();
				}
			});
		});
	}

	handleConnectionClose(event) {
		console.log("[WEBSOCKET] Connection closed! Details: "+event.data);
	}
	
	register(artifactType, artifactId, callback) {
		const notificationNote = {
			artifactType: artifactType,
			artifactId: artifactId,
			notificationCallback: callback
		};
		this.subscribers.push(notificationNote);
	}
	
	unregisterAll() {
		this.subscribers = [];
	}
}
export default ChangeNotifier;