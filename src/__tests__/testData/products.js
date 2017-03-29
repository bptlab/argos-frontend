const products = [{
    id: 0,
    name: "Testproduct 5000 14E-17B",
    numberOfDevices: 52189,
    numberOfEvents: 84,
    productionStart: "2016-05-07",
    orderNumber: "9830510416",
    state: "RUNNING",
    stateDescription: "No errors or warnings detected",
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
    name: "Testproduct 5100 12E-15B",
    numberOfDevices: 3215,
    numberOfEvents: 54,
    productionStart: "2016-03-01",
    orderNumber: "7840516417",
    state: "WARNING",
    stateDescription: "Main-Controller-Component reported a temperature problem.",
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
}];

export default {
    PRODUCTS: products
}
