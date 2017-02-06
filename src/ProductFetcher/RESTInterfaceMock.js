class RESTInterfaceMock {
    
    open(requestMethod, api) {
        this.api = api;
    }

    sendRequest() {
    }
    
    static getProductFamily() {
        return [{
            id: 0,
            name: "Logamax plus GB172",
            brand: "Buderus",
            products: [{
                id: 0,
                name: "Buderus Logamax plus GB172-14, EG-E",
                numberOfDevices: 189,
                numberOfEvents: 84,
                productionStart: "2016-05-07",
                orderNumber: "7716010416",
                state: "RUNNING",
                stateDescription: "No errors or warnings detected"
            },{
                id: 1,
                name: "Buderus Logamax plus GB172-20, EG-E",
                numberOfDevices: 621,
                numberOfEvents: 741,
                productionStart: "2016-04-06",
                orderNumber: "7716010417",
                state: "RUNNING",
                stateDescription: "No errors or warnings detected"
            },{
                id: 2,
                name: "Buderus Logamax plus GB172-24, EG-E",
                numberOfDevices: 746,
                numberOfEvents: 62,
                productionStart: "2016-01-01",
                orderNumber: "7716010416",
                state: "WARNING",
            },{
                id: 3,
                name: "Buderus Logamax plus GB172-24K, G25",
                numberOfDevices: 345,
                numberOfEvents: 31,
                productionStart: "2016-03-02",
                orderNumber: "7716010418",
                state: "RUNNING",
                stateDescription: "No errors or warnings detected"
            },{
                id: 4,
                name: "Buderus Logamax plus GB172-24, G25",
                numberOfDevices: 84,
                numberOfEvents: 54,
                productionStart: "2016-06-07",
                orderNumber: "7716010612",
                state: "ERROR",
                stateDescription: "Error detected! Intervention required!"
            }]
        }];
    }
    
    static getEventTypes() {
        return [{
            id:     0,
            name:           "FeedbackData",
            numberOfEvents: 8493, 
            attributes: [
                {
                    id:     0,
                    name:   "dateOfServiceIntervention",
                    type:   "Date"
                },{
                    id:     1,
                    name:   "dateOfInstallation",
                    type:   "Date"
                },{
                    id:     2,
                    name:   "factoryId",
                    type:   "Integer"
                },{
                    id:     3,
                    name:   "dateOfProduction",
                    type:   "Integer"
                },{
                    id:     4,
                    name:   "counter",
                    type:   "Integer"
                },{
                    id:     5,
                    name:   "softwareVersion",
                    type:   "Float"
                },{
                    id:     6,
                    name:   "feedbackOfInstaller",
                    type:   "String"
                },{
                    id:     7,
                    name:   "objectId",
                    type:   "Integer"
                },{
                    id:     8,
                    name:   "locationOfDeviceId",
                    type:   "Integer"
                },{
                    id:     9,
                    name:   "productFamilyId",
                    type:   "String"
                },{
                    id:     10,
                    name:   "orderNumber",
                    type:   "Integer"
                },{
                    id:     11,
                    name:   "productName",
                    type:   "String"
                },{
                    id:     12,
                    name:   "codingPlugId",
                    type:   "Integer"
                },{
                    id:     13,
                    name:   "codingPlugBusId",
                    type:   "Integer"
                },{
                    id:     14,
                    name:   "codingPlugSoftwareVersion",
                    type:   "Float"
                },{
                    id:     15,
                    name:   "errorId",
                    type:   "String"
                }, {
                    id:     16,
                    name:   "errorFailureTreeId",
                    type:   "Integer"
                },{
                    id:     17,
                    name:   "errorDescription",
                    type:   "String"
                },{
                    id:     18,
                    name:   "causeId",
                    type:   "Integer"
                },{
                    id:     19,
                    name:   "causeDescription",
                    type:   "String"
                },{
                    id:     20,
                    name:   "replacementPartId",
                    type:   "Integer"
                },{
                    id:     21,
                    name:   "replacementPartName",
                    type:   "String"
                }
            ]
        }];
    }
    
    static getEvents() {
        return [{
            dateOfServiceIntervention:  "2016-01-01",
            dateOfInstallation:         "2016-02-01",
            factoryId:                  8290,
            dateOfProduction:           305,
            counter:                    12447,
            softwareVersion:            4.09,
            feedbackOfInstaller:        "Sicherheitstemperaturbegrenzer am Wärmeblock oder der Abgassicherheitstemperaturbegrenzer hat mehrmals angesprochen.",
            objectId:                   32830295,
            locationOfDeviceId:         32835144,
            productFamilyId:            0,
            orderNumber:                7716010417,
            productName:                "Buderus Logamax plus GB172-14,  EG-E",
            codingPlugId:               1117,
            codingPlugBusId:            154,
            codingPlugSoftwareVersion:  1.13,
            errorId:                    "6A-227",
            errorFailureTreeId:         39534450,
            errorDescription:           "Temperatur am Vorlauffühler ist größer als 95°C",
            causeId:                    18205831,
            causeDescription:           "Sicherheitsventil an der Gasarmatur öffnet nicht",
            replacementPartId:          87181070870,
            replacementPartName:        "Elektrodensatz"
        },
        {
            dateOfServiceIntervention:  "2016-01-01",
            dateOfInstallation:         "2016-02-01",
            factoryId:                  8290,
            dateOfProduction:           305,
            counter:                    12447,
            softwareVersion:            4.09,
            feedbackOfInstaller:        "Sicherheitstemperaturbegrenzer am Wärmeblock oder der Abgassicherheitstemperaturbegrenzer hat mehrmals angesprochen.",
            objectId:                   32830295,
            locationOfDeviceId:         32835144,
            productFamilyId:            0,
            orderNumber:                7716010417,
            productName:                "Buderus Logamax plus GB172-14,  EG-E",
            codingPlugId:               1117,
            codingPlugBusId:            154,
            codingPlugSoftwareVersion:  1.14,
            errorId:                    "6A-227",
            errorFailureTreeId:         39534450,
            errorDescription:           "Temperatur am Vorlauffühler ist größer als 95°C",
            causeId:                    18205831,
            causeDescription:           "Sicherheitsventil an der Gasarmatur öffnet nicht",
            replacementPartId:          87181070870,
            replacementPartName:        "Elektrodensatz"
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