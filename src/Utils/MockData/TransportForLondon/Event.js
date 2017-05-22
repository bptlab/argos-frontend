const Event = [
    /* BusStatus */
    {
        eventTypeId: 99101991,
        eventInformation: [
            {
                associatedEntities: [101],
                events: [
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-05-02T12:00"
                            },
                            {
                                Name: "load",
                                Value: "80"
                            },
                            {
                                Name: "nrOfBusses",
                                Value: "12"
                            },
                        ]
                    },
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-04-28T11:50"
                            },
                            {
                                Name: "load",
                                Value: "45"
                            },
                            {
                                Name: "nrOfBusses",
                                Value: "7"
                            },
                        ]
                    }
                ],
            },
            {
                associatedEntities: [102],
                events: [
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-05-01T11:23"
                            },
                            {
                                Name: "load",
                                Value: "95"
                            },
                            {
                                Name: "nrOfBusses",
                                Value: "3"
                            },
                        ]
                    },
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-04-27T17:19"
                            },
                            {
                                Name: "load",
                                Value: "70"
                            },
                            {
                                Name: "nrOfBusses",
                                Value: "4"
                            },
                        ]
                    },
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-04-12T09:36"
                            },
                            {
                                Name: "load",
                                Value: "62"
                            },
                            {
                                Name: "nrOfBusses",
                                Value: "5"
                            },
                        ]
                    }
                ],
            },
        ],
    },

    /* TubeStatus */
    {
        eventTypeId: 99201991,
        eventInformation: [
            {
                associatedEntities: [201],
                events: [
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-05-02T15:06"
                            },
                            {
                                Name: "WagonsPerTrain",
                                Value: "4"
                            },
                            {
                                Name: "NrOfTrains",
                                Value: "10"
                            },
                        ]
                    },
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-05-01T14:06"
                            },
                            {
                                Name: "WagonsPerTrain",
                                Value: "3"
                            },
                            {
                                Name: "NrOfTrains",
                                Value: "8"
                            },
                        ]
                    }
                ],
            },
            {
                associatedEntities: [202],
                events: [
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-05-02T15:06"
                            },
                            {
                                Name: "WagonsPerTrain",
                                Value: "9"
                            },
                            {
                                Name: "NrOfTrains",
                                Value: "15"
                            },
                        ]
                    },
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-05-01T17:46"
                            },
                            {
                                Name: "WagonsPerTrain",
                                Value: "12"
                            },
                            {
                                Name: "NrOfTrains",
                                Value: "19"
                            },
                        ]
                    }
                ],
            },
        ],
    },

    /* LineStatus */
    {
        eventTypeId: 99101992,
        eventInformation: [
            {
                associatedEntities: [101, 102, 201, 202],
                events: [
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-05-01T11:11"
                            },
                            {
                                Name: "isOperating",
                                Value: "true"
                            },
                            {
                                Name: "loadPrediction",
                                Value: "80"
                            },
                        ]
                    },
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-05-01T10:51"
                            },
                            {
                                Name: "isOperating",
                                Value: "false"
                            },
                            {
                                Name: "loadPrediction",
                                Value: "70"
                            },
                        ]
                    },
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-04-25T13:39"
                            },
                            {
                                Name: "isOperating",
                                Value: "true"
                            },
                            {
                                Name: "loadPrediction",
                                Value: "40"
                            },
                        ]
                    }
                ],
            },
        ],
    },

    /* StopPointInformation */
    {
        eventTypeId: 991011991,
        eventInformation: [
            {
                associatedEntities: [
                    1011, 1012, 1013, 1014, 1015,
                    1021, 1022, 1023, 1024, 1025,
                    2011, 2012, 2013, 2014, 2015,
                    2021, 2022],
                events: [
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-05-01T12:12"
                            },
                            {
                                Name: "crowded",
                                Value: "true"
                            },
                        ]
                    }
                ],
            },
        ],
    },

    /* StopPointInterruption */
    {
        eventTypeId: 991011992,
        eventInformation: [
            {
                associatedEntities: [
                    1011, 1012, 1013, 1014, 1015,
                    1021, 1022, 1023, 1024, 1025,
                    2011, 2012, 2013, 2014, 2015,
                    2021, 2022],
                events: [
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-04-18T19:12"
                            },
                            {
                                Name: "interrupted",
                                Value: "false"
                            },
                        ]
                    }
                ],
            },
        ],
    },
];

export default Event;