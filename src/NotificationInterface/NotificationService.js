class NotificationInterface {

    onOpenConnection() {
        this.notificationCallback("Successfully connected to Push-Notification-Service");
    }
    
    onCloseConnection() {
        this.notificationCallback("Closed connection to Push-Notification-Service");
    }
    
    onError(error) {
        this.notificationCallback("Error on Push-Notification-Service: "+error);
    }
    
    processNewMessage(event) {
        const message = JSON.parse(event.data);
        const affectedEntity = message.entityType;
        switch (affectedEntity) {
            case "Product": {
                
            }
        }
    }
    
    constructor(remoteDomain, remotePort, API, notificationCallback) {
        this.connection = new WebSocket("ws://"+remoteDomain+":"+remotePort+"/"+API);
        this.notificationCallback = notificationCallback;
        this.connection.onopen = this.onOpenConnection;
        this.connection.onclose = this.onCloseConnection;
        this.connection.onerror = this.onError;
        this.connection.onmessage = this.processNewMessage;
    }
}