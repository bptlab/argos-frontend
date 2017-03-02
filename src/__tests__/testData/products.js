const products = [{
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
    name: "Testproduct 5100 12E-15B",
    numberOfDevices: 3215,
    numberOfEvents: 54,
    productionStart: "2016-03-01",
    orderNumber: "7840516417",
    state: "WARNING",
    stateDescription: "Main-Controller-Component reported a temperature problem."
}];

export default {
    PRODUCTS: products
}