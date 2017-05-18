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
		if (currentCache.has(url)) {
			return currentCache.get(url);
		}
		return null;
	}

	static getAll() {
		return ConnectionCache.getStorageCache();
	}

	static invalidate(url) {
		const currentCache = ConnectionCache.getStorageCache();
		const newCache = currentCache.delete(url);
		ConnectionCache.writeStorageCache(newCache);
	}

	static clear() {
		ConnectionCache.writeStorageCache(new Map());
	}

	static getStorageCache() {
		const storedString = JSON.parse(sessionStorage.getItem(cacheVariableName));
		if (!storedString) {
			return new Map();
		}
		return new Map(storedString);
	}

	static writeStorageCache(cache) {
		sessionStorage.setItem(cacheVariableName, JSON.stringify([...cache]));
	}

}

export default ConnectionCache;