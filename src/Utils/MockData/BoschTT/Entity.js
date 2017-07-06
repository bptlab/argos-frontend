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
			},
			{
				Name: "ProductId",
				Value: "101"
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
			},
			{
				Name: "ProductId",
				Value: "102"
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
			},
			{
				Name: "ProductId",
				Value: "103"
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
			},
			{
				Name: "ProductId",
				Value: "104"
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
			},
			{
				Name: "ProductId",
				Value: "105"
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
			},
			{
				Name: "ProductId",
				Value: "106"
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
			},
			{
				Name: "ProductId",
				Value: "107"
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
			},
			{
				Name: "ProductId",
				Value: "108"
			}
		]
	},
	/* ### Konfiguration ### */
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
				Name: 	"CodingPlug",
				Value: 	"154",
			},
			{
				Name: 	"ConfigId",
				Value: 	"1011",
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
				Name: 	"CodingPlug",
				Value: 	"154",
			},{
				Name: 	"CodingPlug",
				Value: 	"1021",
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
				Name: 	"CodingPlug",
				Value: 	"154",
			},{
				Name: 	"CodingPlug",
				Value: 	"1031",
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
				Name: 	"CodingPlug",
				Value: 	"154",
			},{
				Name: 	"CodingPlug",
				Value: 	"1041",
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
				Name: 	"CodingPlug",
				Value: 	"154",
			},{
				Name: 	"CodingPlug",
				Value: 	"1051",
			},
		]
	},
];

export default Entity;