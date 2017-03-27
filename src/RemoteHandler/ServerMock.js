class ServerMock {
    
    constructor() {
        this.statusText = 200;
        this.status = 200;
        this.readyState = 4;
        this.headers = [];
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
                stateDescription: "No errors or warnings detected",
                statusUpdateQueries: {
                    RUNNING: "ESPER-QUERY",
                    WARNING: "ESPER-QUERY",
                    ERROR: "ESPER-QUERY"
                }
            },{
                id: 1,
                name: "Testproduct 5010 116-1EB",
                numberOfDevices: 90621,
                numberOfEvents: 741,
                productionStart: "2016-04-06",
                orderNumber: "7716013254",
                state: "RUNNING",
                stateDescription: "No errors or warnings detected",
                statusUpdateQueries: {
                    RUNNING: "ESPER-QUERY",
                    WARNING: "ESPER-QUERY",
                    ERROR: "ESPER-QUERY"
                }
            },{
                id: 2,
                name: "Testproduct 3010 226-1XC",
                numberOfDevices: 746,
                numberOfEvents: 362,
                productionStart: "2016-01-01",
                orderNumber: "7710473416",
                state: "WARNING",
                stateDescription: "Warning detected!",
                statusUpdateQueries: {
                    RUNNING: "ESPER-QUERY",
                    WARNING: "ESPER-QUERY",
                    ERROR: "ESPER-QUERY"
                }
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
                stateDescription: "Sensor defect!",
                statusUpdateQueries: {
                    RUNNING: "ESPER-QUERY",
                    WARNING: "ESPER-QUERY",
                    ERROR: "ESPER-QUERY"
                }
            },{
                id: 6,
                name: "Testproduct 5010 115",
                numberOfDevices: 90621,
                numberOfEvents: 741,
                productionStart: "2016-04-06",
                orderNumber: "7716013254",
                state: "RUNNING",
                stateDescription: "No errors or warnings detected",
                statusUpdateQueries: {
                    RUNNING: "ESPER-QUERY",
                    WARNING: "ESPER-QUERY",
                    ERROR: "ESPER-QUERY"
                }
            },{
                id: 7,
                name: "Testproduct 012 226-1FC",
                numberOfDevices: 746,
                numberOfEvents: 362,
                productionStart: "2016-02-01",
                orderNumber: "7710473416",
                state: "ERROR",
                stateDescription: "Controller defect!",
                statusUpdateQueries: {
                    RUNNING: "ESPER-QUERY",
                    WARNING: "ESPER-QUERY",
                    ERROR: "ESPER-QUERY"
                }
            }]}
        ];
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
        if(this.api.indexOf("productfamilies") > -1) {
            this.responseText = JSON.stringify(ServerMock.getProductFamily());
        } else if(this.api.indexOf("eventtypes") > -1) {
            this.responseText = JSON.stringify(ServerMock.getEventTypes());
        } else if(this.api.indexOf("events") > -1) {
            this.responseText = JSON.stringify(ServerMock.getEvents());
        } else {
            this.responseText = JSON.stringify("");
        }
        this.onreadystatechange();
    }
}
export default ServerMock;