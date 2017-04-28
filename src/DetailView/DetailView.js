import React, { Component } from 'react';
import EntityInformation from './EntityInformation';
import EventDiagram from './EventDiagram';
import SearchBar from './../Utils/SearchBar';
import EventTabs from './EventTabs';
import EventTable from './EventTable';
import { css } from 'aphrodite';
import AppStyles from './../AppStyles';
import DefinitionStyles from './../DefinitionStyles';

class DetailView extends Component {
	render() {
		return (
			<div>
				<div className={css(AppStyles.dFlex, DefinitionStyles.elementMarginTop)}>
					<EntityInformation styles={[AppStyles.w50]}/>
					<EventDiagram styles={[AppStyles.w50]}/>
				</div>
				<SearchBar styles={[DefinitionStyles.elementMarginTop]}/>
				<EventTabs styles={[DefinitionStyles.elementMarginTop]}/>
				<EventTable/>
			</div>
		);
	}
}

export default DetailView;