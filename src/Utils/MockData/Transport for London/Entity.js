const Entity = [
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
			}
		]
	}, 	
	{
		Id: 		11,
		TypeId:		0,
		ParentId:	-1,
		Name:		"tube",
		Status:		"RUNNING",
		Attributes: [
			{
				Name:	"isScheduledService",
				Value:	"true"
			}
		]
	},
	{
		Id: 		12,
		TypeId:		1,
		ParentId:	10,
		Name:		"9",
		Status:		"RUNNING",
		Attributes: []
	},
	{
		Id: 		13,
		TypeId:		1,
		ParentId:	10,
		Name:		"39",
		Status:		"RUNNING",
		Attributes: []
	},
	{
		Id: 		14,
		TypeId:		1,
		ParentId:	11,
		Name:		"Victoria",
		Status:		"RUNNING",
		Attributes: []
	},
	{
		Id: 		15,
		TypeId:		1,
		ParentId:	11,
		Name:		"Waterloo & City",
		Status:		"RUNNING",
		Attributes: []
	}
];

export default Entity;