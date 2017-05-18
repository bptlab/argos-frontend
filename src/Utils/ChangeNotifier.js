import config from './../config/config.js';

class ChangeNotifier  {
	
	constructor() {
		if(!config.useBackendMock) {
			this.webSocket = new WebSocket(config.backendWebSocketURL);
			this.webSocket.onerror = this.handleError;
			this.webSocket.onopen = this.handleNewConnection;
			this.webSocket.onclose = this.handleConnectionClose;
			this.webSocket.onmessage = this.handleMessage.bind(this);
		}
		this.subscribers = [];
		this.handleMessage = this.handleMessage.bind(this);
		this.register = this.register.bind(this);
		this.unregisterAll = this.unregisterAll.bind(this);
	}

	static isRelevantNotification(subscription, notification) {
		return ChangeNotifier.isRelevantNotificationForGridView(subscription, notification);
        /*return (subscription.artifactType === notification.ArtifactType &&
        ((notification.ArtifactType === "Event" && subscription.artifactId === notification.EntityId)
        || subscription.artifactId === notification.ArtifactId));*/
    }

    static isRelevantNotificationForGridView(subscription, notification) {
        return notification.ArtifactType === "Entity" && subscription.artifactId === notification.ArtifactId;
    }

	handleNewConnection() {
		console.log("[WEBSOCKET] Established a new connection! Connection is open.");
	}
	
	handleError() {
		console.log("[WEBSOCKET] An error occured! Connection could not be established.");
	}
	
	handleMessage(event) {
		const serverNotifications = JSON.parse(event.data);
		serverNotifications.forEach((notification) => {
			this.subscribers.forEach((subscription) => {
				console.log(subscription);
				if (ChangeNotifier.isRelevantNotification(subscription, notification)) {
                    subscription.notificationCallback();
				}
			});
		});
	}

	handleConnectionClose() {
		console.log("[WEBSOCKET] Connection closed!");
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