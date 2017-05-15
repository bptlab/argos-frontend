import config from './../config/config';

class Utils {
	static getStatus(status) {
		let statusConfiguration = config.statuses.find(statusConfig => statusConfig.name === status);
		if (!statusConfiguration) {
			return config.statuses.find(statusConfig => statusConfig.name === 'UNDEFINED');
		}
		return statusConfiguration;
	}

	static getColorForStatus(status) {
		return Utils.getStatus(status).color;
	}
	static getLightColorForStatus(status) {
		return Utils.getStatus(status).colorLight;
	}

	static getFilteredEvents(events, filters) {
		return events.filter(event =>
			Utils.isCoveredByFilters(event, filters));
	}

	static isCoveredByFilters(event, filters) {
		// every is equivalent to logical and over an array
		return filters.every((filter) => {
			return Utils.testFilter(event, filter);
		});
	}

	static testFilter(event, filter) {
		if (!filter.value) {
			return true;
		}
		let columnsToBeSearched = event.Attributes.map(attribute => attribute.Name);
		if(filter.column) {
			columnsToBeSearched = columnsToBeSearched.filter((column) => {
				return Utils.doesContain(column.Name, filter.column);
			});
		}

		return columnsToBeSearched.some((column) => {
			return Utils.testColumn(column, event, filter);
		});
	}

	static testColumn(column, event, filter) {
		const filterValues = filter.value.split(",");
		const eventAttribute = event.Attributes.find(attribute => attribute.Name === column.Name);
		return filterValues.some(filterValue => {
			const currentFilterValue = filterValue.trim();
			return (currentFilterValue &&  Utils.doesContain(eventAttribute.Value, currentFilterValue));
		});
	}

	static doesContain(baseValue, subValue) {
		return (baseValue.toString().toLowerCase().indexOf(subValue.toString().toLowerCase()) > -1);
	}


}

export default Utils;