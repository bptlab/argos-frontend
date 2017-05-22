const EventType = [
    {
        associatedEntities: [101, 102],
        eventTypes: [
            {
                Id: 99101991,
                Name: "BusStatus",
                NumberOfEvents: 0,
                TimestampAttributeId: 99101991991
            },
        ]
    },
    {
        associatedEntities: [201, 202],
        eventTypes: [
            {
                Id: 99201991,
                Name: "TubeStatus",
                NumberOfEvents: 0,
                TimestampAttributeId: 99201991991
            },
        ],
    },
    {
        associatedEntities: [101, 102, 201, 202],
        eventTypes: [
            {
                Id: 99101992,
                Name: "LineStatus",
                NumberOfEvents: 0,
                TimestampAttributeId: 99101992991
            },
        ],
    },
    {
        associatedEntities: [1011, 1012, 1013, 1014, 1015,
                            1021, 1022, 1023, 1024, 1025,
                            2011, 2012, 2013, 2014, 2015,
                            2021, 2022],
        eventTypes: [
            {
                Id: 991011991,
                Name: "StopPointInformation",
                NumberOfEvents: 0,
                TimestampAttributeId: 991011991991
            },
        ],
    },
    {
        associatedEntities: [1011, 1012, 1013, 1014, 1015,
            1021, 1022, 1023, 1024, 1025,
            2011, 2012, 2013, 2014, 2015,
            2021, 2022],
        eventTypes: [
            {
                Id: 991011992,
                Name: "StopPointInterruption",
                NumberOfEvents: 0,
                TimestampAttributeId: 991011992991
            },
        ],
    },
];

export default EventType;