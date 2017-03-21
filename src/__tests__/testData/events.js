const events = [{
    ErrorCode:                  404,
    ErrorDescription:           "Product not found.",
    PossibleFix:                "Search for it.",
    DeviceID:                   666,
    DeviceLocation:             "Not known.",
    SoftwareVersion:            "0.0.4.alpha"
},
{
    ErrorCode:                  123,
    ErrorDescription:           "Product not found.",
    PossibleFix:                "Search for it.",
    DeviceID:                   444,
    DeviceLocation:             "Hamburg",
    SoftwareVersion:            "0.0.7"
},
{
    ErrorCode:                  987,
    ErrorDescription:           "Product not found.",
    PossibleFix:                "Replace machine",
    DeviceID:                   333,
    DeviceLocation:             "Berlin",
    SoftwareVersion:            "0.1.0"
}];

export default {
    EVENTS: events
}
