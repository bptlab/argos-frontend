class DataMapper {

    static mapProductFamilies(apiProductFamilyCollection) {
        const productFamilies = [];
        for(let i = 0; i < apiProductFamilyCollection.length; i++) {
            const apiProductFamily = apiProductFamilyCollection[i];
            const productFamily = {
                "id":       apiProductFamily.id,
                "name":     apiProductFamily.name,
                "brand":    apiProductFamily.brand,
                "products": DataMapper.mapProducts(apiProductFamily)
            };
            productFamilies.push(productFamily);
        }
        return productFamilies;
    }

    static mapProducts(productFamily) {
        const apiProductCollection = productFamily.products;
        const products = [];
        for(let i = 0; i < apiProductCollection.length; i++) {
            const apiProduct = apiProductCollection[i];
            const product = {
                "id":                   apiProduct.id,
                "name":                 apiProduct.name,
                "brand":                productFamily.brand,
                "family":               productFamily.name,
                "numberOfDevices":      apiProduct.numberOfDevices,
                "numberOfEvents":       apiProduct.numberOfEvents,
                "productionStart":      apiProduct.productionStart,
                "orderNumber":          apiProduct.orderNumber,
                "state":                apiProduct.state,
                "stateDescription":     apiProduct.stateDescription,
                "configurations":       apiProduct.configurations,
            };
            products.push(product);
        }
        return products;
    }

    static mapConfigurations(apiConfigurations) {
        const configurations = [];
        for(let i = 0; i < apiConfigurations.length; i++) {
            const apiConfiguration = apiConfigurations[i];
            const configuration = {
                "id":                   apiConfiguration.id,
                "productId":            apiConfiguration.productId,
                "numberOfEvents":       apiConfiguration.numberOfEvents,
                "codingPlugId":         apiConfiguration.codingPlugId,
                "codingPlugSoftwareVersion": apiConfiguration.codingPlugSoftwareVersion,
                "state":                apiConfiguration.state,
                "stateDescription":     apiConfiguration.stateDescription,
                "errorTypes":           apiConfiguration.errorTypes,
                "statusUpdateQueries":  DataMapper.mapStatusUpdateQueries(apiConfiguration.statusUpdateQueries)
            };
            configurations.push(configuration);
        }
        return configurations;
    }

    static mapStatusUpdateQueries(queries) {
        return {
            "ERROR":    queries.ERROR,
            "WARNING":  queries.WARNING,
            "RUNNING":  queries.RUNNING
        };
    }

    static mapEventTypes(apiEventTypeCollection) {
        const eventTypes = [];
        for(let i = 0; i < apiEventTypeCollection.length; i++) {
            const apiEventType = apiEventTypeCollection[i];
            const eventType = {
                "id":               apiEventType.id,
                "name":             apiEventType.name,
                "numberOfEvents":   apiEventType.numberOfEvents,
                "timestampAttributeName": apiEventType.timestampAttributeName,
                "attributes":       DataMapper.mapEventTypeAttributes(apiEventType.attributes)
            };
            eventTypes.push(eventType);
        }
        return eventTypes;
    }

    static mapEventTypeAttributes(apiEventTypeAttributes) {
        const eventTypeAttributes = [];
        for(let i = 0; i < apiEventTypeAttributes.length; i++) {
            const apiEventTypeAttribute = apiEventTypeAttributes[i];
            const eventTypeAttribute = {
                "id" :      apiEventTypeAttribute.id,
                "name":     apiEventTypeAttribute.name,
                "type":     apiEventTypeAttribute.type
            };
            eventTypeAttributes.push(eventTypeAttribute);
        }
        return eventTypeAttributes;
    }

    static mapEvents(apiEvents) {
        return apiEvents; //No mapping possible, due to its dynamic construction;
        //Attributes defined in is corresponding eventType
    }
}
export default DataMapper;
