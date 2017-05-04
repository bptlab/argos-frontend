import React from 'react';
import {connect} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import EventType from './EventType';
import SearchBar from './../Utils/SearchBar';


class SettingsView extends ConnectionComponent {

	render() {
		const connectionIncomplete = super.render(this.props.eventTypes);
		if(connectionIncomplete) {
			return connectionIncomplete;
		}
		return (
			<div>
				<SearchBar/>
				{this.props.eventTypes.value.map((eventType) => {
					return(<EventType 
						eventType={eventType} 
						key={eventType.Id}
						deleteEventType={this.props.deleteEventType} />);
				})}
			</div>
		);
	}
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(() => ({
	eventTypes: `/eventtypes`,
	deleteEventType: eventType => ({
		postLikeResponse: {
			url: `/eventtype/${eventType.Id}/delete`,
			method: 'DELETE',
			body: "",
			andThen: () => ({
				eventTypes: {
					url: `/eventtypes`,
					refreishing: true
				}
			})
		}
	})
}))(SettingsView);
