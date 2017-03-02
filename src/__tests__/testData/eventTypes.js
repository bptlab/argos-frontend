const eventTypes = [{
    id:             0,
    name:           "Error Events",
    numberOfEvents: 8493,
    attributes: [
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
    ]
}];

export default {
    EVENTTYPES: eventTypes
}