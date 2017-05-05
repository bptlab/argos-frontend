const EntityType =
	{
        /* ### TransportationMode ### */
		0: {
			attributes: [
				{
					Id: 770771,
					Name: "isScheduledService",
				},
				{
					Id: 770772,
					Name: "isFarePaying",
				}
			],
			entitymappings: [],
		},
        /* ### Line ### */
		1: {
			attributes: [
				{
					Id: 771771,
					Name: "serviceTypes",
				}
			],
			entitymappings: [],
		},
        /* ### StopPoint ### */
		2: {
			attributes: [
				{
					Id: 772771,
					Name: "lat",
				},
				{
					Id: 772772,
					Name: "long"
				}
			],
			entitymappings: [],
		},
	};


export default EntityType;