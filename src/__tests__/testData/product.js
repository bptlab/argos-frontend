const product = {
    id: 0,
    name: "Testproduct 30X 1W1-PSB",
    numberOfDevices: 201,
    numberOfEvents: 553,
    productionStart: "2016-06-07",
    orderNumber: "7711294712",
    state: "ERROR",
    stateDescription: "Error detected! Intervention required!",
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
};

export default {
    PRODUCT: product
}
