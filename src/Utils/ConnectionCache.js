const cacheVariableName = "cache";

class ConnectionCache {

	static add(cache) {
		let currentCache = ConnectionCache.getStorageCache();
		if (!currentCache) {
			currentCache = new Map();
		}
		currentCache.set(cache.url, cache);
		console.log(currentCache.body);
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
			// console.log(storedString);
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