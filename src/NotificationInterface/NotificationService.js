import {argosConfig} from '../config/argosConfig';
class NotificationService {
    
    constructor(remoteDomain, remotePort, API, notificationCallback) {
        this.notificationSubscribers = [];
        this.notificationEndpoint = notificationCallback;
        this.establishConnection(remoteDomain, remotePort, API);
    }
    
    establishConnection(remoteDomain, remotePort, API) {
        if('WebSocket' in window) {
            /* istanbul ignore next */
            const protocol = argosConfig.webSocketProtocol + "://";
            /* istanbul ignore next */
            this.connection = new WebSocket(protocol + remoteDomain + ":" + remotePort + "/" + API);
            /* istanbul ignore next */
            this.connection.onopen = this.onOpenConnection.bind(this);
            /* istanbul ignore next */
            this.connection.onclose = this.onCloseConnection.bind(this);
            /* istanbul ignore next */
            this.connection.onerror = this.onError.bind(this);
            /* istanbul ignore next */
            this.connection.onmessage = this.processNewMessage.bind(this);
        } else {
            this.onError("WebSocket is not supported in this Browser / Environment");
        }
    }

    onOpenConnection() {
        this.notificationEndpoint({
            type: argosConfig.NotificationServiceNeutralInfo,
            message: argosConfig.messageSuccessConnectionPush
        });
    }
    
    onCloseConnection() {
        this.notificationEndpoint({
            type: argosConfig.NotificationServiceError,
            message: argosConfig.messageLostConnectionPush
        });
    }
    
    onError(error) {
        this.notificationEndpoint({
            type: argosConfig.NotificationServiceError,
            message: argosConfig.messageErrorConnectionPush+": "+error
        });
    }
    
    processNewMessage(event) {
        const message = JSON.parse(event.data);
        const affectedEntity = message[0].entityType;
        const affectedSubscribers = this.notificationSubscribers.filter(function(subscriber) {
            if(subscriber.entityOfInterest === affectedEntity) {
                return subscriber;
            }
        }.bind(affectedEntity));
        affectedSubscribers.forEach(function(subscriber) {
            subscriber.notificationCallback();
        });
    }

    subscribe(entityType, notificationCallback) {
        const subscriber = NotificationService.buildSubscriber(entityType, notificationCallback);
        this.notificationSubscribers.push(subscriber);
    }

    unsubscribe(entityType, notificationCallback) {
        const subscriber = this.notificationSubscribers.find((element) => {
            return element.entityOfInterest === entityType && element.notificationCallback === notificationCallback;
        });
        const outdatedIndex = this.notificationSubscribers.indexOf(subscriber);
        if(outdatedIndex > -1) {
            this.notificationSubscribers.splice(outdatedIndex, 1);
        }
    }
    
    static buildSubscriber(entityType, notificationCallback) {
        return ({
            entityOfInterest: entityType,
            notificationCallback: notificationCallback
        });
    }
} export default NotificationService;