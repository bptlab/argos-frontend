const Event = [
    /* Buderus Logamax plus GB172 */
    {
        eventTypeId: 99101991,
        eventInformation: [
            {
                associatedEntities: [101],
                events: [
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-05-02T12:00"
                            },
                            {
                                Name: "errorCode",
                                Value: "6A-227"
                            },
                            {
                                Name: "productId",
                                Value: "101"
                            },
                        ]
                    },
                    {
                        Attributes: [
							{
								Name: "timestamp",
								Value: "2017-05-02T12:00"
							},
							{
								Name: "errorCode",
								Value: "6A-123"
							},
							{
								Name: "productId",
								Value: "101"
							},
                        ]
                    }
                ],
            },
            {
                associatedEntities: [102],
                events: [
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-05-01T11:23"
                            },
							{
								Name: "errorCode",
								Value: "1A-123"
							},
							{
								Name: "productId",
								Value: "102"
							},
						]
                    },
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-04-27T17:19"
                            },
							{
								Name: "errorCode",
								Value: "2A-123"
							},
							{
								Name: "productId",
								Value: "102"
							},
						]
                    },
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-04-12T09:36"
                            },
							{
								Name: "errorCode",
								Value: "9A-123"
							},
							{
								Name: "productId",
								Value: "102"
							},
                        ]
                    }
                ],
            },
        ],
    },

    /* BaseConfiguration */
    {
        eventTypeId: 991011992,
        eventInformation: [
            {
                associatedEntities: [1011],
                events: [
                    {
                        Attributes: [
                            {
                                Name: "timestamp",
                                Value: "2017-05-02T15:06"
                            },
                            {
                                Name: "errorCode",
                                Value: "9A-123"
                            },
                            {
                                Name: "configId",
                                Value: "1011"
                            },
                        ]
                    },
                    {
                        Attributes: [
							{
								Name: "timestamp",
								Value: "2017-05-02T15:06"
							},
							{
								Name: "errorCode",
								Value: "5A-123"
							},
							{
								Name: "configId",
								Value: "1011"
							},
                        ]
                    }
                ],
            },
            {
				associatedEntities: [1021],
				events: [
					{
						Attributes: [
							{
								Name: "timestamp",
								Value: "2017-05-02T15:06"
							},
							{
								Name: "errorCode",
								Value: "9A-123"
							},
							{
								Name: "configId",
								Value: "1021"
							},
						]
					},
					{
						Attributes: [
							{
								Name: "timestamp",
								Value: "2017-05-02T15:06"
							},
							{
								Name: "errorCode",
								Value: "5A-123"
							},
							{
								Name: "configId",
								Value: "1021"
							},
						]
					}
				],
			},
        ],
    },
];

export default Event;