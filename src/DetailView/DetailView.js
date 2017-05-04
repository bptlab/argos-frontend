import React from "react";
import {Container} from "react-grid-system";
import {connect} from "react-refetch";
import ConnectionComponent from "./../Utils/ConnectionComponent.js";
import EntityInformation from "./EntityInformation";
import EventDiagram from "./EventDiagram";
import SearchBar from "./../Utils/SearchBar";
import EventTable from "./EventTable";
import {css} from "aphrodite";
import AppStyles from "./../AppStyles";
import Header from "../Header";

class DetailView extends ConnectionComponent {
	render() {
		const entity = this.props.entity.value;
		const connectionIncomplete = super.render(this.props.entity);
		if(connectionIncomplete) {
			return connectionIncomplete;
		}
		return (
			<div>
				<Header title={entity.Name}/>
				<Container>
					<div className={css(AppStyles.dFlex, AppStyles.elementMarginTop)}>
						<EntityInformation entity={entity} styles={[AppStyles.w50]}/>
						<EventDiagram styles={[AppStyles.w50]}/>
					</div>
					<SearchBar styles={[AppStyles.elementMarginTop]}/>
					<EventTable entityId={this.props.match.params.entityId} />
				</Container>
			</div>
		);
	}
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
	entity: `/entity/${props.match.params.entityId}`,
}))(DetailView);
