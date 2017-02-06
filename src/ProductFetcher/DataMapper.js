class DataMapper {
    
    static mapProductFamilies(apiProductFamilyCollection) {
        const productFamilies = [];
        for(let i = 0; i < apiProductFamilyCollection.length; i++) {
            const apiProductFamily = apiProductFamilyCollection[i];
            const productFamily = {
                "id":       apiProductFamily.id,
                "name":     apiProductFamily.name,
                "brand":    apiProductFamily.brand,
                "products": DataMapper.mapProducts(apiProductFamily.products)
            };
            productFamilies.push(productFamily);
        }
        return productFamilies;
    }
    
    static mapProducts(apiProductCollection) {
        const products = [];
        for(let i = 0; i < apiProductCollection.length; i++) {
            const apiProduct = apiProductCollection[i]; 
            const product = {
                "id":               apiProduct.id,
                "name":             apiProduct.name,
                "numberOfDevices":  apiProduct.numberOfDevices,
                "numberOfEvents":   apiProduct.numberOfEvents,
                "productionStart":  apiProduct.productionStart,
                "orderNumber":      apiProduct.orderNumber,
                "state":            apiProduct.state,           
                "stateDescription": apiProduct.stateDescription 
            };
            products.push(product);
        }
        return products;
    }
    
    static mapEventTypes(apiEventTypeCollection) {
        const eventTypes = [];
        for(let i = 0; i < apiEventTypeCollection.length; i++) {
            const apiEventType = apiEventTypeCollection[i];
            const eventType = {
                "id":               apiEventType.id,
                "name":             apiEventType.name,
                "numberOfevents":   apiEventType.numberOfEvents,
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
                "id" :      apiEventTypeAttributes.id,
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