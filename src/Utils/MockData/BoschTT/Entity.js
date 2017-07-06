const Entity = [
	/* ### Virtual Root ### */
	{
		Id: 			-1,
		TypeId: 		-1,
		ParentId: 		-1,
		Name: 			"",
		Status: 		"",
		HasChildren:	true,
		Attributes: 	[]
	},
	/* ### Product Family ### */
	{
		Id: 			10,
		TypeId:			0,
		ParentId:		-1,
		Name:			"Buderus Logamax plus GB172",
		Status:			"RUNNING",
		HasChildren:	true,
		Attributes: []
	},

	/* ### Products ### */
		/* Buderus Logamax plus GB172 */
	{
		Id: 			101,
		TypeId:			1,
		ParentId:		10,
		Name:			"Buderus Logamax plus GB172-14",
		Status:			"FAILURE",
		HasChildren: 	true,
		Attributes: [
			{
				Name: 	"NumberOfDevices",
				Value:	"894"
			},
			{
				Name: 	"ProductionStartDate",
				Value:	"03.01.2017"
			}
		]
	},
	{
		Id: 			102,
		TypeId:			1,
		ParentId:		10,
		Name:			"Buderus Logamax plus GB172-20",
		Status:			"RUNNING",
		HasChildren: 	true,
		Attributes: [
			{
				Name: 	"NumberOfDevices",
				Value:	"1251"
			},
			{
				Name: 	"ProductionStartDate",
				Value:	"13.02.2017"
			}
		]
	},
	{
		Id: 			103,
		TypeId:			1,
		ParentId:		10,
		Name:			"Buderus Logamax plus GB172-24",
		Status:			"RUNNING",
		HasChildren: 	true,
		Attributes: [
			{
				Name: 	"NumberOfDevices",
				Value:	"3547"
			},
			{
				Name: 	"ProductionStartDate",
				Value:	"20.02.2017"
			}
		]
	},
	{
		Id: 			104,
		TypeId:			1,
		ParentId:		10,
		Name:			"Buderus Logamax plus GB172-24K",
		Status:			"RUNNING",
		HasChildren: 	true,
		Attributes: [
			{
				Name: 	"NumberOfDevices",
				Value:	"468"
			},
			{
				Name: 	"ProductionStartDate",
				Value:	"11.04.2017"
			}
		]
	},
	{
		Id: 			105,
		TypeId:			1,
		ParentId:		10,
		Name:			"Buderus Logamax plus GB172-24, G25",
		Status:			"RUNNING",
		HasChildren: 	true,
		Attributes: [
			{
				Name: 	"NumberOfDevices",
				Value:	"468"
			},
			{
				Name: 	"ProductionStartDate",
				Value:	"11.04.2017"
			}
		]
	},
	{
		Id: 			106,
		TypeId:			1,
		ParentId:		10,
		Name:			"Buderus Logamax plus GB172-20",
		Status:			"RUNNING",
		HasChildren: 	true,
		Attributes: [
			{
				Name: 	"NumberOfDevices",
				Value:	"648"
			},
			{
				Name: 	"ProductionStartDate",
				Value:	"16.05.2017"
			}
		]
	},
	{
		Id: 			107,
		TypeId:			1,
		ParentId:		10,
		Name:			"Buderus Logamax plus GB172-28",
		Status:			"RUNNING",
		HasChildren: 	true,
		Attributes: [
			{
				Name: 	"NumberOfDevices",
				Value:	"43"
			},
			{
				Name: 	"ProductionStartDate",
				Value:	"07.01.2017"
			}
		]
	},
	{
		Id: 			108,
		TypeId:			1,
		ParentId:		10,
		Name:			"Buderus Logamax plus GB172-26",
		Status:			"RUNNING",
		HasChildren: 	true,
		Attributes: [
			{
				Name: 	"NumberOfDevices",
				Value:	"164"
			},
			{
				Name: 	"ProductionStartDate",
				Value:	"13.03.2017"
			}
		]
	},
	/* ### StopPoints ### */
		/* BUS LINE 9 */
	{
		Id: 			1011,
		TypeId:			2,
		ParentId:		101,
		Name:			"BaseConfiguration",
		Status:			"RUNNING",
		HasChildren: 	false,
		Attributes: [
			{
				Name: 	"SoftwareVersion",
				Value: 	"4,05",
			},
			{
				Name: 	"CodingPLug",
				Value: 	"154",
			},
		]
	},
	{
		Id: 			1021,
		TypeId:			2,
		ParentId:		102,
		Name:			"BaseConfiguration",
		Status:			"RUNNING",
		HasChildren: 	false,
		Attributes: [
			{
				Name: 	"SoftwareVersion",
				Value: 	"4,05",
			},
			{
				Name: 	"CodingPLug",
				Value: 	"154",
			},
		]
	},
	{
		Id: 			1031,
		TypeId:			2,
		ParentId:		103,
		Name:			"BaseConfiguration",
		Status:			"RUNNING",
		HasChildren: 	false,
		Attributes: [
			{
				Name: 	"SoftwareVersion",
				Value: 	"4,05",
			},
			{
				Name: 	"CodingPLug",
				Value: 	"154",
			},
		]
	},
	{
		Id: 			1041,
		TypeId:			2,
		ParentId:		104,
		Name:			"BaseConfiguration",
		Status:			"RUNNING",
		HasChildren: 	false,
		Attributes: [
			{
				Name: 	"SoftwareVersion",
				Value: 	"4,05",
			},
			{
				Name: 	"CodingPLug",
				Value: 	"154",
			},
		]
	},
	{
		Id: 			1025,
		TypeId:			2,
		ParentId:		105,
		Name:			"BaseConfiguration",
		Status:			"RUNNING",
		HasChildren: 	false,
		Attributes: [
			{
				Name: 	"SoftwareVersion",
				Value: 	"4,05",
			},
			{
				Name: 	"CodingPLug",
				Value: 	"154",
			},
		]
	},
];

export default Entity;