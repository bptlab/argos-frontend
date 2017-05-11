import config from './../config/config';

class Header {
	static getStatus(currentStatus) {
		return config.statuses.find((status) => {
			return status.name === currentStatus;
		})
	}
}

export default Header;