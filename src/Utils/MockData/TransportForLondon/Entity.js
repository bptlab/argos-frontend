const Entity = [
	/* ### Virtual Root ### */
	{
		Id: -1,
		TypeId: -1,
		ParentId: -1,
		Name: "",
		Status: "",
		Attributes: []
	},
	/* ### TransportationMode ### */
	{
		Id: 		10,
		TypeId:		0,
		ParentId:	-1,
		Name:		"bus",
		Status:		"RUNNING",
		Attributes: [
			{
				Name:	"isScheduledService",
				Value:	"true"
			},
			{
				Name:	"isFarePaying",
				Value:	"true"
			}
		]
	}, 	
	{
		Id: 		20,
		TypeId:		0,
		ParentId:	-1,
		Name:		"tube",
		Status:		"RUNNING",
		Attributes: [
			{
				Name:	"isScheduledService",
				Value:	"true"
			},
			{
				Name:	"isFarePaying",
				Value:	"true"
			}
		]
	},

	/* ### Lines ### */
		/* BUS */
	{
		Id: 		101,
		TypeId:		1,
		ParentId:	10,
		Name:		"9",
		Status:		"RUNNING",
		Attributes: [
			{
				Name: 	"serviceTypes",
				Value:	 [
					{
						$type: "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
						name: "Regular",
						uri: "/Line/Route?ids=9&serviceTypes=Regular"
					}
				]
			}
		]
	},
	{
		Id: 		102,
		TypeId:		1,
		ParentId:	10,
		Name:		"39",
		Status:		"RUNNING",
		Attributes: [
			{
				Name: 	"serviceTypes",
				Value:	 [
					{
						$type: "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
						name: "Regular",
						uri: "/Line/Route?ids=39&serviceTypes=Regular"
					}
				]
			}
		]
	},
		/* TUBE */
	{
		Id: 		201,
		TypeId:		1,
		ParentId:	20,
		Name:		"Victoria",
		Status:		"RUNNING",
		Attributes: [
			{
				Name: 	"serviceTypes",
				Value:	[
					{
						$type: "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
						name: "Regular",
						uri: "/Line/Route?ids=Victoria&serviceTypes=Regular"
					},
					{
						$type: "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
						name: "Night",
						uri: "/Line/Route?ids=Victoria&serviceTypes=Night"
					}
				],
			}
		]
	},
	{
		Id: 		202,
		TypeId:		1,
		ParentId:	20,
		Name:		"Waterloo & City",
		Status:		"RUNNING",
		Attributes: [
			{
				Name: 	"serviceTypes",
				Value:	[
					{
						"$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
						"name": "Regular",
						"uri": "/Line/Route?ids=Waterloo & City&serviceTypes=Regular"
					}
				],
			}
		]
	},

	/* ### StopPoints ### */
		/* BUS LINE 9 */
	{
		Id: 		1011,
		TypeId:		2,
		ParentId:	101,
		Name:		"Green Park Station",
		Status:		"RUNNING",
		Attributes: []
	},
	{
		Id: 		1012,
		TypeId:		2,
		ParentId:	101,
		Name:		"High Street Kensington Station",
		Status:		"RUNNING",
		Attributes: []
	},
	{
		Id: 		1013,
		TypeId:		2,
		ParentId:	101,
		Name:		"Hyde Park Corner Station",
		Status:		"RUNNING",
		Attributes: []
	},
	{
		Id: 		1014,
		TypeId:		2,
		ParentId:	101,
		Name:		"Knightsbridge Station  / Harrods",
		Status:		"RUNNING",
		Attributes: []
	},
	{
		Id: 		1015,
		TypeId:		2,
		ParentId:	101,
		Name:		"Warwick Gardens",
		Status:		"RUNNING",
		Attributes: []
	},
		/* BUS LINE 39 */
	{
		Id: 		1021,
		TypeId:		2,
		ParentId:	102,
		Name:		"Putney Bridge Station",
		Status:		"RUNNING",
		Attributes: []
	},
	{
		Id: 		1022,
		TypeId:		2,
		ParentId:	102,
		Name:		"Replingham Road",
		Status:		"RUNNING",
		Attributes: []
	},
	{
		Id: 		1023,
		TypeId:		2,
		ParentId:	102,
		Name:		"Southfields Station",
		Status:		"RUNNING",
		Attributes: []
	},
	{
		Id: 		1024,
		TypeId:		2,
		ParentId:	102,
		Name:		"Clapham Junction Station",
		Status:		"RUNNING",
		Attributes: []
	},
	{
		Id: 		1025,
		TypeId:		2,
		ParentId:	102,
		Name:		"St John's Avenue",
		Status:		"RUNNING",
		Attributes: []
	},
		/* TUBE LINE Victoria */
	{
		Id: 		2011,
		TypeId:		2,
		ParentId:	201,
		Name:		"Blackhorse Road Underground Station",
		Status:		"RUNNING",
		Attributes: []
	},
	{
		Id: 		2012,
		TypeId:		2,
		ParentId:	201,
		Name:		"Brixton Underground Station",
		Status:		"RUNNING",
		Attributes: []
	},
	{
		Id: 		2013,
		TypeId:		2,
		ParentId:	201,
		Name:		"Euston Underground Station",
		Status:		"RUNNING",
		Attributes: []
	},
	{
		Id: 		2014,
		TypeId:		2,
		ParentId:	201,
		Name:		"Finsbury Park Underground Station",
		Status:		"RUNNING",
		Attributes: []
	},
	{
		Id: 		2015,
		TypeId:		2,
		ParentId:	201,
		Name:		"Green Park Underground Station",
		Status:		"RUNNING",
		Attributes: []
	},
	/* TUBE LINE Waterloo & City */
	{
		Id: 		2021,
		TypeId:		2,
		ParentId:	202,
		Name:		"Bank Underground Station",
		Status:		"RUNNING",
		Attributes: []
	},
	{
		Id: 		2021,
		TypeId:		2,
		ParentId:	202,
		Name:		"Waterloo Underground Station",
		Status:		"RUNNING",
		Attributes: []
	},
];

export default Entity;