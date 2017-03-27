const productFamilies = [{
    id: 0,
    name: "Testproductfamily",
    brand: "Testbrand",
    products: [{
        family: "Testproductfamily",
        brand: "Testbrand",
        id: 0,
        name: "Testproduct 5000 14E-17B",
        numberOfDevices: 52189,
        numberOfEvents: 84,
        productionStart: "2016-05-07",
        orderNumber: "9830510416",
        state: "RUNNING",
        stateDescription: "No errors or warnings detected",
        statusUpdateQueries: {
            ERROR: "ESPER-QUERY",
            WARNING: "ESPER-QUERY",
            RUNNING: "ESPER-QUERY"
        }
    },{
        family: "Testproductfamily",
        brand: "Testbrand",
        id: 1,
        name: "Testproduct 5010 116-1EB",
        numberOfDevices: 90621,
        numberOfEvents: 741,
        productionStart: "2016-04-06",
        orderNumber: "7716013254",
        state: "RUNNING",
        stateDescription: "No errors or warnings detected",
        statusUpdateQueries: {
            ERROR: "ESPER-QUERY",
            WARNING: "ESPER-QUERY",
            RUNNING: "ESPER-QUERY"
        }
    },{
        family: "Testproductfamily",
        brand: "Testbrand",
        id: 2,
        name: "Testproduct 3010 226-1XC",
        numberOfDevices: 746,
        numberOfEvents: 362,
        productionStart: "2016-01-01",
        orderNumber: "7710473416",
        state: "WARNING",
        stateDescription: "Warning detected!",
        statusUpdateQueries: {
            ERROR: "ESPER-QUERY",
            WARNING: "ESPER-QUERY",
            RUNNING: "ESPER-QUERY"
        }
    }]},
    {
    id: 1,
    name: "TestproductfamilyNeo",
    brand: "TestbrandNeo",
    products: [{
        family: "TestproductfamilyNeo",
        brand: "TestbrandNeo",
        id: 5,
        name: "Testproduct 7000 27E-11C",
        numberOfDevices: 3475,
        numberOfEvents: 13,
        productionStart: "2016-02-06",
        orderNumber: "48958959",
        state: "WARNING",
        stateDescription: "Sensor defect!",
        statusUpdateQueries: {
            ERROR: "ESPER-QUERY",
            WARNING: "ESPER-QUERY",
            RUNNING: "ESPER-QUERY"
        }
    },{
        family: "TestproductfamilyNeo",
        brand: "TestbrandNeo",
        id: 6,
        name: "Testproduct 5010 115",
        numberOfDevices: 90621,
        numberOfEvents: 741,
        productionStart: "2016-04-06",
        orderNumber: "7716013254",
        state: "RUNNING",
        stateDescription: "No errors or warnings detected",
        statusUpdateQueries: {
            ERROR: "ESPER-QUERY",
            WARNING: "ESPER-QUERY",
            RUNNING: "ESPER-QUERY"
        }
    },{
        family: "TestproductfamilyNeo",
        brand: "TestbrandNeo",
        id: 7,
        name: "Testproduct 012 226-1FC",
        numberOfDevices: 746,
        numberOfEvents: 362,
        productionStart: "2016-02-01",
        orderNumber: "7710473416",
        state: "ERROR",
        stateDescription: "Controller defect!",
        statusUpdateQueries: {
            ERROR: "ESPER-QUERY",
            WARNING: "ESPER-QUERY",
            RUNNING: "ESPER-QUERY"
        }
    }]}
];

export default {
    PRODUCTFAMILIES: productFamilies
}