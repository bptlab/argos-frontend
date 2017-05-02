import React, { Component } from 'react';
import {connect, PromiseState} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import EntityInformation from './EntityInformation';
import EventDiagram from './EventDiagram';
import SearchBar from './../Utils/SearchBar';
import EventTabs from './EventTabs';
import EventTable from './EventTable';
import { css } from 'aphrodite';
import AppStyles from './../AppStyles';

class DetailView extends ConnectionComponent {
	render() {
        const allFetches = PromiseState.all([this.props.entity]);
        const entity = this.props.entity.value;
        const eventTypes = this.props.eventTypes.value;
        const connectionIncomplete = super.render(allFetches);
        if(connectionIncomplete) {
            return connectionIncomplete;
        }
        return (
			<div>
				<div className={css(AppStyles.dFlex, AppStyles.elementMarginTop)}>
					<EntityInformation styles={[AppStyles.w50]}/>
					<EventDiagram styles={[AppStyles.w50]}/>
				</div>
				<SearchBar styles={[AppStyles.elementMarginTop]}/>
				<EventTabs styles={[AppStyles.elementMarginTop]}/>
				<EventTable/>
			</div>
		);
	}
}


export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
    entity: `/entity/${props.match.params.entityId}`,
	eventTypes: `/entity/${props.match.params.entityId}/eventtypes`,
}))(DetailView);
