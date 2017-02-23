class NotificationService {

    constructor(remoteDomain, remotePort, API, notificationCallback) {
        this.connection = new WebSocket("ws://"+remoteDomain+":"+remotePort+"/"+API);
        this.notificationCallback = notificationCallback;
        this.connection.onopen = this.onOpenConnection.bind(this);
        this.connection.onclose = this.onCloseConnection.bind(this);
        this.connection.onerror = this.onError.bind(this);
        this.connection.onmessage = this.processNewMessage.bind(this);
        this.notificationList = [];
    }

    onOpenConnection() {
        this.notificationCallback({
            type: "info",
            message: "Successfully connected to Push-Notification-Service"
        });
    }
    
    onCloseConnection() {
        this.notificationCallback({
            type: "danger",
            message: "Connection to Push-Notification-Service lost / not possible"
        });
    }
    
    onError(error) {
        this.notificationCallback({
            type: "danger",
            message: "Error on Push-Notification-Service: "+error
        });
    }
    
    processNewMessage(event) {
        const message = JSON.parse(event.data);
        const affectedEntity = message[0].entityType;
        const affectedSubscribers = this.notificationList.filter(function(subscriber) {
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
        this.notificationList.push(listElement);
    }

    unsubscribe(entityType, notificationCallback) {
        const listElement = NotificationService.buildNotificationElement(entityType, notificationCallback);
        const outdatedIndex = this.notificationList.indexOf(listElement);
        if(outdatedIndex > -1) {
            this.notificationList.slice(outdatedIndex, 1);
        }
    }
    
    static buildNotificationElement(entityType, notificationCallback) {
        return ({
            entityOfInterest: entityType,
            notificationCallback: notificationCallback
        });
    }
} export default NotificationService;