import React from "react";
import {Container} from "react-grid-system";
import HierarchyStepper from "./HierarchyStepper";
import SearchBar from "./../Utils/SearchBar";
import CardGrid from "./CardGrid";
import {PromiseState} from "react-refetch";
import ConnectionComponent from "./../Utils/ConnectionComponent.js";
import AppStyles from "./../AppStyles";
import config from "./../config/config.js";
import help from "./../config/help";
import Header from "../Header";

class GridView extends ConnectionComponent {
	constructor() {
		super();
		this.state = {
			filterObject: {},
		};
		this.getChildEntityTypes = this.getChildEntityTypes.bind(this);
		this.getEntityType = this.getEntityType.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
	}


    componentDidMount() {
        this.registerNotification("Entity", parseInt(this.props.match.params.entityId, 10), this.props.refreshEntity);
    }

    componentWillUnmount() {
        this.unregisterAllNotifications();
    }

	getEntityType(entity) {
		const entityTypes = window.hierarchy.find(hierarchyArray => {
			return hierarchyArray.find(entityType => {
				return entityType.Id === entity.TypeId;
			});
		});
		if (entityTypes) {
			return entityTypes[0];
		}
	}

	getChildEntityTypes(parentEntityTypeId) {
		let childEntities = [];
		window.hierarchy.forEach(hierarchyLayer => {
			childEntities = childEntities.concat(hierarchyLayer.filter((entityType) => {
				return entityType.ParentId === parentEntityTypeId;
			}));
		});
		return childEntities;
	}

	getPageTitle(entity) {
		const entityType = this.getEntityType(entity);
		if (entityType) {
			return entityType.Name + ": " + entity.Name;
		}
		return config.projectName;
	}

	handleFilterChange(filterObject) {
		this.setState({
			filterObject: filterObject,
		});
	}

	render() {
		const allFetches = PromiseState.all([this.props.entity]);
		const entity = this.props.entity.value;
		const connectionIncomplete = super.render(allFetches);
		if (connectionIncomplete) {
			return connectionIncomplete;
		}
		const childEntityTypes = this.getChildEntityTypes(entity.TypeId);
		return (
			<div>
				<Header title={this.getPageTitle(entity)} status={entity.Status}/>
				<Container>
					<HierarchyStepper
						hierarchy={window.hierarchy}
						currentEntity={entity}
						getEntityType={this.getEntityType}
						getChildEntityTypes={this.getChildEntityTypes}/>
					<div
						data-hint={help.input.gridViewFilterBar}
						data-hintPosition="middle-left">
						<SearchBar onInputChange={this.handleFilterChange}/>
					</div>
					{childEntityTypes.map((childEntityType) => {
						return (
							<div key={`div-${childEntityType.Id}`}>
								<h1>{childEntityType.Name}</h1>
								<CardGrid
									filterObject={this.state.filterObject}
									styles={[AppStyles.elementMarginTop]}
									key={childEntityType.Id}
									currentEntity={entity}
									entityType={childEntityType}/>
							</div>
						);
					})}
				</Container>
			</div>
		);
	}
}

export default ConnectionComponent.argosConnector()(props => {
	const entityUrl = config.backendRESTRoute + `/entity/${props.match.params.entityId}`;
	return {
		entity: entityUrl,
		refreshEntity: () => ({
			entity: {
				url: entityUrl,
				force: true,
				refreshing: true
			}
		})
    };
})(GridView);
