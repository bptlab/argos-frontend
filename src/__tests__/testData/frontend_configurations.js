const configurations =   [{
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
        causeCode: 0,
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