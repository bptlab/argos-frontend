class ServerMock {

    constructor() {
        this.statusText = 200;
        this.status = 200;
        this.readyState = 4;
        this.headers = [];
        this.productFamilies = ServerMock.getProductFamily();
        this.eventTypes = ServerMock.getEventTypes();
        this.events = ServerMock.getEvents();
        this.productConfigurations = ServerMock.getProductConfigurations();

        //function binding
        this.deleteEventType = this.deleteEventType.bind(this);
    }

    open(requestMethod, api) {
        this.api = api;
    }

    setRequestHeader(key, value) {
        this.headers.push({
            key: key,
            value: value
        });
    }
    
    static getProductConfigurations() {
        return [{
            id: 0,
            productId: 0,
            state: "RUNNING",
            stateDescription: "No errors or warnings detected",
            codingPlugId: 30,
            codingPlugSoftwareVersions: [1.0, 1.1, 3.1],
            numberOfEvents: 234,
            statusUpdateQueries: {
                RUNNING: "ESPER-QUERY",
                WARNING: "ESPER-QUERY",
                ERROR: "ESPER-QUERY"
            },
            errorTypes: [{
                id: 0,
                errorTypeId: "0",
                displayCode: "0Z",
                causeCode:  0,
                errorDescription: "Heating produces strange sounds",
                errorCauses: [{
                    id: 0,
                    causeDescription: "Kabelbaum missing",
                    errorOccurrences: 3,
                    errorPrediction: 0.3
                }]
            }]
        }];
    }

    static getProductConfigurations() {
        return [{
            id: 100,
            productId: 0,
            state: "RUNNING",
            stateDescription: "No errors or warnings detected",
            codingPlugId: 10,
            codingPlugSoftwareVersions: [1.0, 1.1, 1.2],
            numberOfEvents: 234,
            statusUpdateQueries: {
                RUNNING: "ESPER-QUERY",
                WARNING: "ESPER-QUERY",
                ERROR: "ESPER-QUERY"
            },
            errorTypes: [{
                id: 0,
                errorTypeId: "0",
                displayCode: "0Z",
                causeCode:  0,
                errorDescription: "Heating produces strange sounds",
                errorCauses: [{
                    id: 0,
                    causeDescription: "Kabelbaum missing",
                    errorOccurrences: 3,
                    errorPrediction: 0.3
                }]
            }]
        },
        {
            id: 200,
            productId: 0,
            state: "WARNING",
            stateDescription: "Few errors or warnings",
            codingPlugId: 20,
            codingPlugSoftwareVersions: [2.0, 2.1],
            numberOfEvents: 234,
            statusUpdateQueries: {
                RUNNING: "ESPER-QUERY",
                WARNING: "ESPER-QUERY",
                ERROR: "ESPER-QUERY"
            },
            errorTypes: [{
                id: 0,
                errorTypeId: "0",
                displayCode: "0Z",
                causeCode:  0,
                errorDescription: "Heating produces strange sounds",
                errorCauses: [{
                    id: 0,
                    causeDescription: "Kabelbaum missing",
                    errorOccurrences: 3,
                    errorPrediction: 0.3
                }]
            }]
        },{
            id: 300,
            productId: 0,
            state: "ERROR",
            stateDescription: "Too many errors",
            codingPlugId: 30,
            codingPlugSoftwareVersions: [1.0, 1.1, 3.1],
            numberOfEvents: 234,
            statusUpdateQueries: {
                RUNNING: "ESPER-QUERY",
                WARNING: "ESPER-QUERY",
                ERROR: "ESPER-QUERY"
            },
            errorTypes: [{
                id: 0,
                errorTypeId: "0",
                displayCode: "0Z",
                causeCode:  0,
                errorDescription: "Heating produces strange sounds",
                errorCauses: [{
                    id: 0,
                    causeDescription: "Kabelbaum missing",
                    errorOccurrences: 3,
                    errorPrediction: 0.3
                }]
            }]
        },{
            id: 400,
            productId: 0,
            state: "UNDEFINED",
            stateDescription: "No status information yet.",
            codingPlugId: 10,
            codingPlugSoftwareVersions: [4.0, 4.1],
            numberOfEvents: 234,
            statusUpdateQueries: {
                RUNNING: "ESPER-QUERY",
                WARNING: "ESPER-QUERY",
                ERROR: "ESPER-QUERY"
            },
            errorTypes: [{
                id: 0,
                errorTypeId: "0",
                displayCode: "0Z",
                causeCode:  0,
                errorDescription: "Heating produces strange sounds",
                errorCauses: [{
                    id: 0,
                    causeDescription: "Kabelbaum missing",
                    errorOccurrences: 3,
                    errorPrediction: 0.3
                }]
            }]
        }];
    }

    static getProductFamily() {
        return [{
            id: 0,
            name: "Testproductfamily",
            brand: "Testbrand",
            products: [{
                id: 0,
                name: "Testproduct 5000 14E-17B",
                numberOfDevices: 52189,
                numberOfEvents: 84,
                productionStart: "2016-05-07",
                orderNumber: "9830510416",
                state: "RUNNING",
                stateDescription: "No errors or warnings in configurations",
                statusUpdateQueries: {
                    RUNNING: "ESPER-QUERY",
                    WARNING: "ESPER-QUERY",
                    ERROR: "ESPER-QUERY"
                },
                configurations: [
                    {
                        id: 100,
                        codingPlugId: 10,
                        codingPlugSoftwareVersions: [1.0, 1.1, 1.2]
                    },
                    {
                        id: 200,
                        codingPlugId: 20,
                        codingPlugSoftwareVersions: [2.0, 2.1]
                    },
                    {
                        id: 300,
                        codingPlugId: 30,
                        codingPlugSoftwareVersions: [1.0, 1.1, 3.1]
                    },
                    {
                        id: 400,
                        codingPlugId: 10,
                        codingPlugSoftwareVersions: [4.0, 4.1]
                    }
                ]
            },{
                id: 1,
                name: "Testproduct 5010 116-1EB",
                numberOfDevices: 90621,
                numberOfEvents: 741,
                productionStart: "2016-04-06",
                orderNumber: "7716013254",
                state: "WARNING",
                stateDescription: "Few errors or warnings in configurations",
                statusUpdateQueries: {
                    RUNNING: "ESPER-QUERY",
                    WARNING: "ESPER-QUERY",
                    ERROR: "ESPER-QUERY"
                },
                configurations: [
                    {
                        id: 100,
                        codingPlugId: 10,
                        codingPlugSoftwareVersions: [1.0, 1.1, 1.2]
                    },
                    {
                        id: 200,
                        codingPlugId: 20,
                        codingPlugSoftwareVersions: [2.0, 2.1]
                    }
                ]
            },{
                id: 2,
                name: "Testproduct 3010 226-1XC",
                numberOfDevices: 746,
                numberOfEvents: 362,
                productionStart: "2016-01-01",
                orderNumber: "7710473416",
                state: "WARNING",
                stateDescription: "Warning detected in configuration",
                statusUpdateQueries: {
                    RUNNING: "ESPER-QUERY",
                    WARNING: "ESPER-QUERY",
                    ERROR: "ESPER-QUERY"
                },
                configurations: [
                    {
                        id: 100,
                        codingPlugId: 10,
                        codingPlugSoftwareVersions: [1.0, 1.1, 1.2]
                    },
                    {
                        id: 200,
                        codingPlugId: 20,
                        codingPlugSoftwareVersions: [2.0, 2.1]
                    },
                    {
                        id: 300,
                        codingPlugId: 30,
                        codingPlugSoftwareVersions: [1.0, 1.1, 3.1]
                    },
                ]
            }]},
            {
            id: 1,
            name: "TestproductfamilyNeo",
            brand: "TestbrandNeo",
            products: [{
                id: 5,
                name: "Testproduct 7000 27E-11C",
                numberOfDevices: 3475,
                numberOfEvents: 13,
                productionStart: "2016-02-06",
                orderNumber: "48958959",
                state: "WARNING",
                stateDescription: "Sensor defect in configuration",
                statusUpdateQueries: {
                    RUNNING: "ESPER-QUERY",
                    WARNING: "ESPER-QUERY",
                    ERROR: "ESPER-QUERY"
                },
                configurations: [
                    {
                        id: 100,
                        codingPlugId: 10,
                        codingPlugSoftwareVersions: [1.0, 1.1, 1.2]
                    },
                    {
                        id: 200,
                        codingPlugId: 20,
                        codingPlugSoftwareVersions: [2.0, 2.1]
                    },
                    {
                        id: 300,
                        codingPlugId: 30,
                        codingPlugSoftwareVersions: [1.0, 1.1, 3.1]
                    },
                ]
            },{
                id: 6,
                name: "Testproduct 5010 115",
                numberOfDevices: 90621,
                numberOfEvents: 741,
                productionStart: "2016-04-06",
                orderNumber: "7716013254",
                state: "RUNNING",
                stateDescription: "No errors or warnings in configurations detected",
                statusUpdateQueries: {
                    RUNNING: "ESPER-QUERY",
                    WARNING: "ESPER-QUERY",
                    ERROR: "ESPER-QUERY"
                },
                configurations: [
                    {
                        id: 100,
                        codingPlugId: 10,
                        codingPlugSoftwareVersions: [1.0, 1.1, 1.2]
                    },
                    {
                        id: 200,
                        codingPlugId: 20,
                        codingPlugSoftwareVersions: [2.0, 2.1]
                    },
                    {
                        id: 300,
                        codingPlugId: 30,
                        codingPlugSoftwareVersions: [1.0, 1.1, 3.1]
                    },
                ]
            },{
                id: 7,
                name: "Testproduct 012 226-1FC",
                numberOfDevices: 746,
                numberOfEvents: 362,
                productionStart: "2016-02-01",
                orderNumber: "7710473416",
                state: "ERROR",
                stateDescription: "Controller defect in configuration",
                statusUpdateQueries: {
                    RUNNING: "ESPER-QUERY",
                    WARNING: "ESPER-QUERY",
                    ERROR: "ESPER-QUERY"
                },
                configurations: [
                    {
                        id: 100,
                        codingPlugId: 10,
                        codingPlugSoftwareVersions: [1.0, 1.1, 1.2]
                    },
                    {
                        id: 200,
                        codingPlugId: 20,
                        codingPlugSoftwareVersions: [2.0, 2.1]
                    },
                    {
                        id: 300,
                        codingPlugId: 30,
                        codingPlugSoftwareVersions: [1.0, 1.1, 3.1]
                    },
                ]
            }]}
        ];
    }

    deleteEventType(event) {
        const searchIndex = this.eventTypes.indexOf(event);
        if(searchIndex > -1) {
            this.eventTypes.splice(searchIndex, 1);
        }
    }

    static getEventTypes() {
        return [{
            id:     0,
            name: "Error Events",
            numberOfEvents: 8493,
            timestampAttributeName: "DateOfServiceIntervention",
            eventQuery: "",
            attributes: [
                {
                    id:     0,
                    name:   "ErrorCode",
                    type:   "Integer"
                },{
                    id:     1,
                    name:   "ErrorDescription",
                    type:   "String"
                },{
                    id:     2,
                    name:   "PossibleFix",
                    type:   "String"
                },{
                    id:     3,
                    name:   "DeviceID",
                    type:   "Integer"
                },{
                    id:     4,
                    name:   "DeviceLocation",
                    type:   "String"
                },{
                    id:     5,
                    name:   "SoftwareVersion",
                    type:   "String"
                }, {
                    id:     6,
                    name:   "DateOfServiceIntervention",
                    type:   "Date"
                }
            ]
        }];
    }

    static getEvents() {
        return [{
            ErrorCode:                  235,
            ErrorDescription:           "Critical Error 235",
            PossibleFix:                "Fix it.",
            DeviceID:                   12352,
            DeviceLocation:             "Hamburg",
            SoftwareVersion:            "12.0.9",
            DateOfServiceIntervention:  "2016-01-29T00:00:00.000+0200",
        },{
            ErrorCode:                  900,
            ErrorDescription:           "Critical Error 900",
            PossibleFix:                "Fix it.",
            DeviceID:                   93812,
            DeviceLocation:             "Stuttgart",
            SoftwareVersion:            "13.0.1",
            DateOfServiceIntervention:  "2017-01-02T00:00:00.000+0200",
        },{
            ErrorCode:                  283,
            ErrorDescription:           "Critical Error 283",
            PossibleFix:                "Fix it.",
            DeviceID:                   234182,
            DeviceLocation:             "Berlin",
            SoftwareVersion:            "13.2.0",
            DateOfServiceIntervention:  "2016-04-22T00:00:00.000+0200",
        },{
            ErrorCode:                  353,
            ErrorDescription:           "Critical Error 353",
            PossibleFix:                "Fix it.",
            DeviceID:                   190347,
            DeviceLocation:             "Berlin",
            SoftwareVersion:            "14.4.3",
            DateOfServiceIntervention:  "2016-10-18T00:00:00.000+0200",
        },{
            ErrorCode:                  500,
            ErrorDescription:           "Critical Error 500",
            PossibleFix:                "Fix it.",
            DeviceID:                   89128,
            DeviceLocation:             "Berlin",
            SoftwareVersion:            "13.0.5",
            DateOfServiceIntervention:  "2017-03-12T00:00:00.000+0200",
        },{
            ErrorCode:                  404,
            ErrorDescription:           "Product not found.",
            PossibleFix:                "Search for it.",
            DeviceID:                   666,
            DeviceLocation:             "Not known.",
            SoftwareVersion:            "0.0.4.alpha",
            DateOfServiceIntervention:  "2016-11-02T00:00:00.000+0200",
        }];
    }

    onReadyStateChange(callback) {
        this.onreadystatechange = callback;
    }

    onError(callback) {
        this.onError = callback;
    }

    send() {
        if(this.api.indexOf("eventtypes/delete") > -1) {
            const splitResults = this.api.split("/");
            const eventTypeId = parseInt(splitResults[splitResults.length-1]);
            const eventTypeToBeDeleted = this.eventTypes.find((eventType) => {
                return eventType.id === eventTypeId;
            });
            if(eventTypeToBeDeleted) {
                this.deleteEventType(eventTypeToBeDeleted);
                this.status = 200;
                this.statusText = "Success";
            } else {
                this.status = 404;
                this.statusText = "No EventType found by id "+eventTypeId;
            }
            this.responseText = this.statusText;
        } else if(this.api.indexOf("productfamilies") > -1) {
            this.responseText = JSON.stringify(this.productFamilies);
        } else if(this.api.indexOf("eventtypes") > -1) {
            this.responseText = JSON.stringify(this.eventTypes);
        } else if(this.api.indexOf("events") > -1) {
            this.responseText = JSON.stringify(this.events);
        } else if(this.api.indexOf("productconfigurations") > -1) {
            this.responseText = JSON.stringify(this.productConfigurations.find((configuration) => {
                return (configuration.id.toString() === this.api.split("/").pop());
            }));
        } else {
            this.responseText = JSON.stringify("");
        }
        this.onreadystatechange();
    }
}
export default ServerMock;
