import * as API from './ProductFetcher';

class RESTInterfaceMock {
    
    open(requestMethod, api, async) {
        this.api = api;
        console.log("Mock request to "+api+" using request method "+requestMethod+" and async "+async);
    }

    sendRequest() {
        console.log("Send a mock request");
    }

    getResponse() {
        switch(this.api) {
            case API.API_PRODUCTFAMILY_ALL: {
                const response = [{
                    id: 0,
                    metaData: {
                        name: "Testproduct plus GB172",
                        brand: "Testbrand1"
                    },
                    products: [{
                        id: 0,
                        metaData: {
                            name: "Testbrand1 Testproduct plus GB172-14, EG-E",
                            numberOfDevices: 189,
                            numberOfEvents: 84,
                            productionStart: "2016-05-07",
                            orderNumber: "7716010416",
                            state: "RUNNING",
                            stateDescription: "No errors or warnings detected"
                        }
                    },{
                        id: 1,
                        metaData: {
                            name: "Testbrand1 Testproduct plus GB172-20, EG-E",
                            numberOfDevices: 621,
                            numberOfEvents: 741,
                            productionStart: "2016-04-06",
                            orderNumber: "7716010417",
                            state: "RUNNING",
                            stateDescription: "No errors or warnings detected"
                        }
                    },{
                        id: 2,
                        metaData: {
                            name: "Testbrand1 Testproduct plus GB172-24, EG-E",
                            numberOfDevices: 746,
                            numberOfEvents: 62,
                            productionStart: "2016-01-01",
                            orderNumber: "7716010416",
                            state: "WARNING",
                            stateDescription: "Check warnings!"
                        }
                    },{
                        id: 3,
                        metaData: {
                            name: "Testbrand1 Testproduct plus GB172-24K, G25",
                            numberOfDevices: 345,
                            numberOfEvents: 31,
                            productionStart: "2016-03-02",
                            orderNumber: "7716010418",
                            state: "RUNNING",
                            stateDescription: "No errors or warnings detected"
                        }
                    },{
                        id: 4,
                        metaData: {
                            name: "Testbrand1 Testproduct plus GB172-24, G25",
                            numberOfDevices: 84,
                            numberOfEvents: 54,
                            productionStart: "2016-06-07",
                            orderNumber: "7716010612",
                            state: "ERROR",
                            stateDescription: "Error detected! Intervention required!"
                        }
                    }]
                }];
                return (JSON.stringify(response));
            }
            case API.API_EVENTYPES_OF_PRODUCT: {
                const response = [{
                    id:     0,
                    metaData: {
                        name:           "FeedbackData",
                        numberOfEvents: 8493,
                    },
                    attributes: [
                        {
                            name:   "dateOfServiceIntervention",
                            type:   "Date"
                        },{
                            name:   "dateOfInstallation",
                            type:   "Date"
                        },{
                            name:   "factoryId",
                            type:   "Integer"
                        },{
                            name:   "dateOfProduction",
                            type:   "Integer"
                        },{
                            name:   "counter",
                            type:   "Integer"
                        },{
                            name:   "softwareVersion",
                            type:   "Float"
                        },{
                            name:   "feedbackOfInstaller",
                            type:   "String"
                        },{
                            name:   "objectId",
                            type:   "Integer"
                        },{
                            name:   "locationOfDeviceId",
                            type:   "Integer"
                        },{
                            name:   "productFamilyId",
                            type:   "String"
                        },{
                            name:   "orderNumber",
                            type:   "Integer"
                        },{
                            name:   "productName",
                            type:   "String"
                        },{
                            name:   "codingPlugId",
                            type:   "Integer"
                        },{
                            name:   "codingPlugBusId",
                            type:   "Integer"
                        },{
                            name:   "codingPlugSoftwareVersion",
                            type:   "Float"
                        },{
                            name:   "errorId",
                            type:   "String"
                        }, {
                            name:   "errorFailureTreeId",
                            type:   "Integer"
                        },{
                            name:   "errorDescription",
                            type:   "String"
                        },{
                            name:   "causeId",
                            type:   "Integer"
                        },{
                            name:   "causeDescription",
                            type:   "String"
                        },{
                            name:   "replacementPartId",
                            type:   "Integer"
                        },{
                            name:   "replacementPartName",
                            type:   "String"
                        }
                    ]
                }];
                return (JSON.stringify(response));
            }
            case API.API_EVENTS_OF_PRODUCTS: {
                const response = [{
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
                    productName:                "Testbrand1 Testproduct plus GB172-14,  EG-E",
                    codingPlugId:               1117, 
                    codingPlugBusId:            154,
                    errorId:                    "6A-227",
                    errorFailureTreeId:         39534450,
                    errorDescription:           "Temperatur am Vorlauffühler ist größer als 95°C",
                    causeId:                    18205831,
                    causeDescription:           "Sicherheitsventil an der Gasarmatur öffnet nicht",
                    replacementPartid:          87181070870,
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
                    productName:                "Testbrand1 Testproduct plus GB172-14,  EG-E",
                    codingPlugId:               1117,
                    codingPlugBusId:            154,
                    errorId:                    "6A-227",
                    errorFailureTreeId:         39534450,
                    errorDescription:           "Temperatur am Vorlauffühler ist größer als 95°C",
                    causeId:                    18205831,
                    causeDescription:           "Sicherheitsventil an der Gasarmatur öffnet nicht",
                    replacementPartid:          87181070870,
                    replacementPartName:        "Elektrodensatz"
                }];
                return (JSON.stringify(response));
            }
            default:
                return (JSON.stringify(""));
        }
    }
}
export default RESTInterfaceMock;