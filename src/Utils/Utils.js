import config from './../config/config';

class Utils {
	static getStatus(currentStatus) {
		return config.statuses.find((status) => {
			return status.name === currentStatus;
		})
	}
}

export default Utils;