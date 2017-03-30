export const argosConfig = {
    useBackendMock:                 false,
    sameServer:                     true,
    backendHost:                    'localhost',
    backendPort:                    8989,
    backendNotificationAPI:         'notifications',
    enumerationSymbol:              '#',
    searchPlaceholder:              'Search...',
    kindOfChart:                    'doughnut',
    kindOfDetailChart:              'line',
    dashboardName:                  'Early Warning Dashboard',
    webSocketProtocol:              'ws',
    messageSuccessConnectionPush:   'Successfully connected to Push-Notification-Service',
    messageLostConnectionPush:      'Connection to Push-Notification-Service lost / not possible',
    messageErrorConnectionPush:     'Error on Push-Notification-Service',
    NotificationServiceSuccess:     'success',
    NotificationServiceError:       'danger',
    NotificationServiceNeutralInfo: 'info',
    RESTInterfaceRouteError:        'Wrong route specified',
    RESTInterfaceConnectionError:   'A critical connection error occurred!',
    routeNameDetailView:            'product',
    tableHeaderDescriptionDelete:   'Delete?',
    eventTypeAddHint:               'To add a new Event-Type please refer to a Product and press the "Plus"-Button.',
    errorMessage403:                'Your are not allowed to modify this Event-Type',
    errorRemainingDependencies:     'You can not delete this Event-Type, because of existing dependencies',
    messageSuccessEventTypeCreation:'EventType sucessfully created.',
    createEventTypeDefaultQuery:    'INSERT INTO TestErrorEvents SELECT timestamp, productId, ' +
                                    'productFamilyId FROM FeedbackData'
};
