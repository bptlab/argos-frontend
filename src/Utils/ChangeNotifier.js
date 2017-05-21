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

	static handleNotification(subscription, notification) {
		ChangeNotifier.handleNotificationForGridView(subscription, notification);
		ChangeNotifier.handleNotificationForDetailView(subscription, notification);
    }

    static handleNotificationForGridView(subscription, notification) {
        if (notification.ArtifactType === "Entity" && subscription.artifactId === notification.ArtifactId) {
			subscription.notificationCallback();
        }
    }

    static handleNotificationForDetailView(subscription, notification) {
		if (
			(notification.ArtifactType === "Entity" && subscription.artifactId === notification.ArtifactId)
			||
			(notification.ArtifactType === "Event" && subscription.artifactId === parseInt(notification.EventTypeId, 10))
		) {
			subscription.notificationCallback();
		}
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
				if (ChangeNotifier.handleNotification(subscription, notification)) {
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