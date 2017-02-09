class RESTInterfaceMock {
    
    open(requestMethod, api) {
        this.api = api;
    }

    sendRequest() {
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
                stateDescription: "No errors or warnings detected"
            },{
                id: 1,
                name: "Testproduct 5010 116-1EB",
                numberOfDevices: 90621,
                numberOfEvents: 741,
                productionStart: "2016-04-06",
                orderNumber: "7716013254",
                state: "RUNNING",
                stateDescription: "No errors or warnings detected"
            },{
                id: 2,
                name: "Testproduct 3010 226-1XC",
                numberOfDevices: 746,
                numberOfEvents: 362,
                productionStart: "2016-01-01",
                orderNumber: "7710473416",
                state: "WARNING",
            },{
                id: 3,
                name: "Testproduct 20X US6-1XB",
                numberOfDevices: 345,
                numberOfEvents: 23,
                productionStart: "2016-03-02",
                orderNumber: "0139210418",
                state: "RUNNING",
                stateDescription: "No errors or warnings detected"
            },{
                id: 4,
                name: "Testproduct 30X 1W1-PSB",
                numberOfDevices: 201,
                numberOfEvents: 553,
                productionStart: "2016-06-07",
                orderNumber: "7711294712",
                state: "ERROR",
                stateDescription: "Error detected! Intervention required!"
            }]
        }];
    }
    
    static getEventTypes() {
        return [{
            id:     0,
            name:           "Error Events",
            numberOfEvents: 8493, 
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
            SoftwareVersion:            "12.0.9"
        },{
            ErrorCode:                  900,
            ErrorDescription:           "Critical Error 900",
            PossibleFix:                "Fix it.",
            DeviceID:                   93812,
            DeviceLocation:             "Stuttgart",
            SoftwareVersion:            "13.0.1"
        },{
            ErrorCode:                  283,
            ErrorDescription:           "Critical Error 283",
            PossibleFix:                "Fix it.",
            DeviceID:                   234182,
            DeviceLocation:             "Berlin",
            SoftwareVersion:            "13.2.0"
        },{
            ErrorCode:                  353,
            ErrorDescription:           "Critical Error 353",
            PossibleFix:                "Fix it.",
            DeviceID:                   190347,
            DeviceLocation:             "Berlin",
            SoftwareVersion:            "14.4.3"
        },{
            ErrorCode:                  500,
            ErrorDescription:           "Critical Error 500",
            PossibleFix:                "Fix it.",
            DeviceID:                   89128,
            DeviceLocation:             "Berlin",
            SoftwareVersion:            "13.0.5"
        },{
            ErrorCode:                  404,
            ErrorDescription:           "Product not found.",
            PossibleFix:                "Search for it.",
            DeviceID:                   666,
            DeviceLocation:             "Not known.",
            SoftwareVersion:            "0.0.4.alpha"
        }];
    }

    getResponse() {
        if(this.api.indexOf("productfamilies") > -1) {
                return JSON.stringify(RESTInterfaceMock.getProductFamily());
        } else if(this.api.indexOf("eventtypes") > -1) {
                return JSON.stringify(RESTInterfaceMock.getEventTypes());
        } else if(this.api.indexOf("events") > -1) {
                return (JSON.stringify(RESTInterfaceMock.getEvents()));
        } else {
                return (JSON.stringify(""));
        }
    }
}
export default RESTInterfaceMock;