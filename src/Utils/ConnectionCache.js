const cacheVariableName = "cache";

class ConnectionCache {

	static add(cache) {
		const url = cache.url;
		cache.json().then(data => ConnectionCache.addResolvedRequest(url, data));
	}

	static addResolvedRequest(url, data) {
		let currentCache = ConnectionCache.getStorageCache();
		if (!currentCache) {
			currentCache = new Map();
		}
		currentCache.set(url, data);
		ConnectionCache.writeStorageCache(currentCache);
	}


	static get(url) {
		const currentCache = ConnectionCache.getStorageCache();
		return currentCache.get(url);
	}

	static getAll() {
		return ConnectionCache.getStorageCache();
	}

	static invalidate(url) {
		const currentCache = ConnectionCache.getStorageCache();
		const newCache = {};
		currentCache.forEach((cacheObject, cacheUrl) => {
			if (url !== cacheUrl) {
				newCache.set(cacheUrl, cacheObject);
			}
		});
		ConnectionCache.writeStorageCache(newCache);

	}

	static clear() {
		ConnectionCache.writeStorageCache({});
	}

	static getStorageCache() {
		const storedString = JSON.parse(sessionStorage.getItem(cacheVariableName));
		if (storedString) {
			return new Map(storedString);
		}
		else {
			return storedString;
		}
	}

	static writeStorageCache(cache) {
		sessionStorage.setItem(cacheVariableName, JSON.stringify([...cache]));
	}

}

export default ConnectionCache;