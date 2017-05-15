import config from './../config/config';

class Utils {
	static getStatus(currentStatus) {
		let status = config.statuses.find((status) => {
			return status.name === currentStatus;
		});
		if (!status) {
			status = config.statuses.find((status) => {
				return status.name === 'UNDEFINED';
			});
		}
		return status;
	}
}

export default Utils;