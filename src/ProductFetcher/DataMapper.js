class DataMapper {
    
    static mapProductFamilies(apiProductFamilyCollection) {
        const productFamilies = [];
        for(let i = 0; i < apiProductFamilyCollection.length; i++) {
            const apiProductFamily = apiProductFamilyCollection[i];
            const productFamily = {
                "id":       apiProductFamily.id,
                "name":     apiProductFamily.metaData.name,
                "brand":    apiProductFamily.metaData.brand,
                "products": this.mapProducts(apiProductFamily.products)
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
                "name":             apiProduct.metaData.name,
                "numberOfDevices":  apiProduct.metaData.numberOfDevices,
                "numberOfEvents":   apiProduct.metaData.numberOfEvents,
                "productionStart":  apiProduct.metaData.productionStart,
                "orderNumber":      apiProduct.metaData.orderNumber,
                "state":            apiProduct.metaData.state,           
                "stateDescription": apiProduct.metaData.stateDescription 
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
                "name":             apiEventType.metaData.name,
                "numberOfevents":   apiEventType.metaData.numberOfEvents,
                "attributes":       this.mapEventTypeAttributes(apiEventType.attributes)
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