import React, { Component } from 'react';
import EntityInformation from './EntityInformation';
import EventDiagram from './EventDiagram';
import SearchBar from './../Utils/SearchBar';
import EventTable from './EventTable';
import { css } from 'aphrodite';
import AppStyles from './../AppStyles';

class DetailView extends Component {
	render() {
        return (
			<div>
				<div className={css(AppStyles.dFlex, AppStyles.elementMarginTop)}>
					<EntityInformation entityId={this.props.match.params.entityId} styles={[AppStyles.w50]}/>
					<EventDiagram styles={[AppStyles.w50]}/>
				</div>
				<SearchBar styles={[AppStyles.elementMarginTop]}/>
				<EventTable entityId={this.props.match.params.entityId} />
			</div>
		);
	}
}


export default DetailView;
