const EntityType = 
    {
        /* ### TransportationMode ### */
        0: {
            attributes: ["isScheduledService", "isFarePaying"],
            entitymappings: [],
        },
        /* ### Line ### */
        1: {
            attributes: ["serviceTypes"],
            entitymappings: [],
        },
        /* ### StopPoint ### */
        2: {
            attributes: ["indicator", "stopLetter", "commonName", "lat", "long"],
            entitymappings: [],
        },
    };


export default EntityType;