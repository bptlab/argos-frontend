class ProductFetcherMock {

    constructor(remoteAddress, remotePort, requestMethod = "POST") {
        this.remoteAddress = remoteAddress;
        this.remotePort = remotePort;
        this.requestMethod = requestMethod;
        this.client = new XMLHttpRequest();
    }

    getRemoteAddress() {
        return self.remoteAddress;
    }

    getRemotePort() {
        return self.remotePort;
    }

    sendRequest() {
        this.client.setRequestHeader("Content-type", "application/json");
        this.client.send();
    }

    receiveSingleProductFamily() {
        return (
            [{
                "numberOfDevices":254,
                "numberOfEvents":84,
                "productionStart":"Jun 12, 2016 10:00:00 AM",
                "state":"WARNING",
                "name":"Family 1",
                "id":10,
                "metaData":
                    {"label":"product label 001",
                        "brand":"Testbrand1",
                        "orderNumber":1234,
                        "statusDescription":"something is broken!"
                    }
            }]
        );
    }

    receiveAllProductFamilies() {
        return (
            [{
                "numberOfDevices":254,
                "numberOfEvents":84,
                "productionStart":"Jun 12, 2016 10:00:00 AM",
                "state":"WARNING",
                "name":"Family 1",
                "id":10,
                "metaData":
                    {"label":"product label 001",
                        "brand":"Testbrand1",
                        "orderNumber":1234,
                        "statusDescription":"something is broken!"
                    }
            },
                {
                    "numberOfDevices":187,
                    "numberOfEvents":107,
                    "productionStart":"Jan 1, 2017 18:00:00 AM",
                    "state":"RUNNING",
                    "name":"Family 2",
                    "id":26,
                    "metaData":
                        {"label":"product label 002",
                            "brand":"Testbrand1",
                            "orderNumber":5678,
                            "statusDescription":"everything is running as expected!"
                        }
                },
                {
                    "numberOfDevices":677,
                    "numberOfEvents":176,
                    "productionStart":"Feb 1, 2016 12:00:00 AM",
                    "state":"ERROR",
                    "name":"Family 3",
                    "id":77,
                    "metaData":
                        {"label":"product label 003",
                            "brand":"Testbrand2",
                            "orderNumber":9876,
                            "statusDescription":"everything is broken!"
                        }
                }]
        );
    }

    receiveSingleProduct() {
        return (
            [{
                "numberOfDevices":254,
                "numberOfEvents":84,
                "productionStart":"Jun 12, 2016 10:00:00 AM",
                "state":"WARNING",
                "name":"Family 1",
                "id":10,
                "metaData":
                    {"label":"product label 001",
                        "brand":"Testbrand1",
                        "orderNumber":1234,
                        "statusDescription":"something is broken!"
                    }
            }]
        );
    }

    receiveAllProducts() {
        return (
            [{
                "numberOfDevices":254,
                "numberOfEvents":84,
                "productionStart":"Jun 12, 2016 10:00:00 AM",
                "state":"WARNING",
                "name":"Family 1",
                "id":10,
                "metaData":
                    {"label":"product label 001",
                        "brand":"Testbrand1",
                        "orderNumber":1234,
                        "statusDescription":"something is broken!"
                    }
            },
            {
                "numberOfDevices":187,
                "numberOfEvents":107,
                "productionStart":"Jan 1, 2017 18:00:00 AM",
                "state":"RUNNING",
                "name":"Family 2",
                "id":26,
                "metaData":
                    {"label":"product label 002",
                        "brand":"Testbrand1",
                        "orderNumber":5678,
                        "statusDescription":"everything is running as expected!"
                    }
            },
            {
                "numberOfDevices":677,
                "numberOfEvents":176,
                "productionStart":"Feb 1, 2016 12:00:00 AM",
                "state":"ERROR",
                "name":"Family 3",
                "id":77,
                "metaData":
                    {"label":"product label 003",
                        "brand":"Testbrand2",
                        "orderNumber":9876,
                        "statusDescription":"everything is broken!"
                    }
            }]
        );
    }
}

export default ProductFetcherMock;