const configurations =   [{
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
},{
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

export default {
    CONFIGURATIONS: configurations
}
