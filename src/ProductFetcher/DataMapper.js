class DataMapper {
    
    static mapProductFamiles(apiProductFamilyCollection) {
        const collectionOfProductFamilies = [];
        for(let i = 0; i < apiProductFamilyCollection.length; i++) {
            const api_productFamily = apiProductFamilyCollection[i];
            const productFamily = {
                "id":       api_productFamily.id,
                "name":     api_productFamily.metaData.name,
                "brand":    api_productFamily.metaData.brand,
                "products": this.mapProducts(api_productFamily.products)
            };
            collectionOfProductFamilies.push(productFamily);
        }
        return collectionOfProductFamilies;
    }
    
    static mapProducts(apiProductCollection) {
        const collectionOfProducts = [];
        for(let i = 0; i < apiProductCollection.length; i++) {
            const api_product = apiProductCollection[i];
            const product = {
                "id":               api_product.id,
                "name":             api_product.metaData.name,
                "numberOfDevices":  api_product.metaData.numberOfDevices,
                "numberOfEvents":   api_product.metaData.numberOfEvents,
                "productionStart":  api_product.metaData.orderNumber,
                "orderNumber":      api_product.orderNumber,
                "state":            api_product.metaData.state,           //TODO: To be discussed
                "stateDescription": api_product.metaData.stateDescription //TODO: To be discussed
            };
            collectionOfProducts.push(product);
        }
        return collectionOfProducts;
    }
    
    static mapEventTypes(apiEventTypeCollection) {
        const collectionOfEventTypes = [];
        for(let i = 0; i < apiEventTypeCollection.length; i++) {
            const api_eventType = apiEventTypeCollection[i];
            const eventType = {
                "id":               api_eventType.id,
                "name":             api_eventType.metaData.name,
                "numberOfevents":   api_eventType.metaData.numberOfEvents,
                "attributes":       this.mapEventTypeAttributes(api_eventType.attributes)
            };
            collectionOfEventTypes.push(eventType);
        }
        return collectionOfEventTypes;
    }
    
    static mapEventTypeAttributes(apiEventTypeAttributes) {
        const collectionOfEventTypeAttributes = [];
        for(let i = 0; i < apiEventTypeAttributes.length; i++) {
            const api_eventTypeAttribute = apiEventTypeAttributes[i];
            const eventTypeAttribute = {
                "name":     api_eventTypeAttribute.name,
                "type":     api_eventTypeAttribute.type
            }
            collectionOfEventTypeAttributes.push(eventTypeAttribute);
        }
        return collectionOfEventTypeAttributes;
    }
    
    static mapEvent(apiEvents) {
        return apiEvents; //No mapping possible, due to its dynamic construction;
        //Attributes defined in is corresponding eventType
    }
}