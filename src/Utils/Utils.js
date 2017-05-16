import config from './../config/config';

class Utils {
	/**
	 * Retrieve the config array for the given status name.
	 *
	 * @param {string} status name (e.g. "RUNNING")
	 * @returns {array} with configs for this status
	 */
	static getStatus(status) {
		const statusConfiguration = config.statuses.find(statusConfig => statusConfig.name === status);
		if (!statusConfiguration) {
			return config.statuses.find(statusConfig => statusConfig.name === 'UNDEFINED');
		}
		return statusConfiguration;
	}

	/**
	 * Retrieves the color for the given status name as set in config.
	 * @param {string} status name (e.g. "RUNNING")
	 * @returns {string} hex color for the status
	 */
	static getColorForStatus(status) {
		return Utils.getStatus(status).color;
	}

	/**
	 * Retrieves the light color for the given status name as set in config.
	 * @param {string} status name (e.g. "RUNNING")
	 * @returns {string} hex color for the status
	 */
	static getLightColorForStatus(status) {
		return Utils.getStatus(status).colorLight;
	}

	/**
	 * Find the name of the timestamp attribute for a given event type.
	 * @param {object} eventType
	 * @param {array} eventTypeAttributes
	 * @returns {string} name of the timestamp attribute
	 */
	static getTimeStampAttributeName(eventType, eventTypeAttributes) {
		return eventTypeAttributes.find(attribute =>
			attribute.Id === eventType.TimestampAttributeId).Name;
	}

	/**
	 * Extracts the timestamp as a string from an event.
	 * @param {object} event
	 * @param {string} timeStampAttributeName
	 * @returns {string} containing the timestamp
	 */
	static getTimeStampAsStringFromEvent(event, timeStampAttributeName) {
		return event.Attributes.find(attribute =>
		attribute.Name === timeStampAttributeName).Value;
	}

	/**
	 * Returns the date from the timestamp for the given event.
	 * @param {object} event
	 * @param {string} timeStampAttributeName
	 * @returns {string} containing the date
	 */
	static getDateAsStringFromEvent(event, timeStampAttributeName) {
		return Utils
			.getTimeStampAsStringFromEvent(event, timeStampAttributeName)
			.split("T")[0];
	}

	/**
	 * Sorts two events corresponding their timestamp ascending.
	 * @param {object} eventA
	 * @param {object} eventB
	 * @param {string} timeStampAttributeName
	 * @returns {number} indicating which event was first
	 */
	static sortEventsByTime(eventA, eventB, timeStampAttributeName) {
		const dateA = new Date(Utils.getTimeStampAsStringFromEvent(eventA, timeStampAttributeName));
		const dateB = new Date(Utils.getTimeStampAsStringFromEvent(eventB, timeStampAttributeName));
		return dateA - dateB;
	}

	/**
	 * Sorts an array of events by their timestamp ascending. Earlier events on lower indeces.
	 * @param {array} events
	 * @param {string} timeStampAttributeName
	 * @returns {array} of sorted events
	 */
	static sortEvents(events, timeStampAttributeName) {
		return events.sort((eventA, eventB) => {
			return Utils.sortEventsByTime(eventA, eventB, timeStampAttributeName);
		});
	}

	/**
	 * Evaluates the given filters on the given events and returns all fitting events.
	 * @param {array} events
	 * @param {array} filters
	 * @returns {array} events that pass all filters
	 */
	static getFilteredEvents(events, filters) {
		return events.filter(event =>
			Utils.isCoveredByFilters(event, filters));
	}

	/**
	 * Evaluates the given filters on a given event.
	 * @param {object} event
	 * @param {array} filters
	 * @returns {boolean} whether the event matches all filters or not
	 */
	static isCoveredByFilters(event, filters) {
		// every is equivalent to logical and over an array
		return filters.every((filter) => {
			return Utils.testFilter(event, filter);
		});
	}

	/**
	 * Evaluates a given filter on a given event.
	 * @param {object} event
	 * @param {object} filter
	 * @returns {boolean} whether the event matches the filter
	 */
	static testFilter(event, filter) {
		if (!filter.value) {
			return true;
		}
		let columnsToBeSearched = event.Attributes.map(attribute => attribute.Name);
		if(filter.column) {
			columnsToBeSearched = columnsToBeSearched.filter((column) => {
				return Utils.doesContain(column, filter.column);
			});
		}

		return columnsToBeSearched.some((column) => {
			return Utils.testColumn(column, event, filter);
		});
	}

	/**
	 * Evaluates a single attribute of an event on a given filter.
	 * @param {string} column name of the event attribute that should be operated on.
	 * @param {object} event
	 * @param {object} filter
	 * @returns {boolean} whether the attribute matches the filter
	 */
	static testColumn(column, event, filter) {
		const filterValues = filter.value.split(",");
		const eventAttribute = event.Attributes.find(attribute => attribute.Name === column);
		return filterValues.some(filterValue => {
			const currentFilterValue = filterValue.trim();
			return (currentFilterValue &&  Utils.doesContain(eventAttribute.Value, currentFilterValue));
		});
	}

	/**
	 * Checks whether a value is contained within another value and operates case insensitive.
	 * @example
	 *      will match:  ("ABCD", "bc"), ("ABCD", "Ab"), ("ABCD", "bCd"), ("ABCD", "abcd")
	 *      won't match: ("ABCD", "bbcd"), ("ABCD", "yabc")
	 * @param baseValue
	 * @param subValue
	 * @returns {boolean}
	 */
	static doesContain(baseValue, subValue) {
		return (baseValue.toString().toLowerCase().indexOf(subValue.toString().toLowerCase()) > -1);
	}


}

export default Utils;