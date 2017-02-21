const eventTable = {
    header: [
        {
            id:     0,
            name:   "ErrorCode",
            type:   "Integer"
        },{
            id:     1,
            name:   "ErrorDescription",
            type:   "String"
        },{
            id:     2,
            name:   "PossibleFix",
            type:   "String"
        },{
            id:     3,
            name:   "DeviceID",
            type:   "Integer"
        },{
            id:     4,
            name:   "DeviceLocation",
            type:   "String"
        },{
            id:     5,
            name:   "SoftwareVersion",
            type:   "String"
        }
    ],
    events: [{
        ErrorCode:                  404,
        ErrorDescription:           "Product not found.",
        PossibleFix:                "Search for it.",
        DeviceID:                   666,
        DeviceLocation:             "Not known.",
        SoftwareVersion:            "0.0.4.alpha"
    }]
};

export default {
    EVENTTABLE: eventTable
}