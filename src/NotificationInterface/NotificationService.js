class NotificationService {
    
    constructor(remoteDomain, remotePort, API, notificationCallback) {
        this.notificationSubscribors = [];
        this.notificationEndpoint = notificationCallback;
        if('WebSocket' in window) {
            this.establishConnection(remoteDomain, remotePort, API);
        } else {
            this.onError("WebSocket is not supported in this Browser / Environment");
        }
    }
    
    establishConnection(remoteDomain, remotePort, API) {
        this.connection = new WebSocket("ws://" + remoteDomain + ":" + remotePort + "/" + API);
        this.connection.onopen = this.onOpenConnection.bind(this);
        this.connection.onclose = this.onCloseConnection.bind(this);
        this.connection.onerror = this.onError.bind(this);
        this.connection.onmessage = this.processNewMessage.bind(this);
    }

    onOpenConnection() {
        this.notificationEndpoint({
            type: "info",
            message: "Successfully connected to Push-Notification-Service"
        });
    }
    
    onCloseConnection() {
        this.notificationEndpoint({
            type: "danger",
            message: "Connection to Push-Notification-Service lost / not possible"
        });
    }
    
    onError(error) {
        this.notificationEndpoint({
            type: "danger",
            message: "Error on Push-Notification-Service: "+error
        });
    }
    
    processNewMessage(event) {
        const message = JSON.parse(event.data);
        const affectedEntity = message[0].entityType;
        const affectedSubscribers = this.notificationSubscribors.filter(function(subscriber) {
            if(subscriber.entityOfInterest === affectedEntity) {
                return subscriber;
            }
        }.bind(affectedEntity));
        affectedSubscribers.forEach(function(subscriber) {
            subscriber.notificationCallback();
        });
    }

    subscribe(entityType, notificationCallback) {
        const listElement = NotificationService.buildNotificationElement(entityType, notificationCallback);
        this.notificationSubscribors.push(listElement);
    }

    unsubscribe(entityType, notificationCallback) {
        const searchElement = this.notificationSubscribors.find((element) => {
            return element.entityOfInterest === entityType && element.notificationCallback === notificationCallback;
        });
        const outdatedIndex = this.notificationSubscribors.indexOf(searchElement);
        if(outdatedIndex > -1) {
            this.notificationSubscribors.splice(outdatedIndex, 1);
        }
    }
    
    static buildNotificationElement(entityType, notificationCallback) {
        return ({
            entityOfInterest: entityType,
            notificationCallback: notificationCallback
        });
    }
} export default NotificationService;