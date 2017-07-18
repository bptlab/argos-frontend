import React, {Component} from "react";
import Utils from "../Utils/Utils";
import EntityInformation from "../Utils/EntityInformation";
import {Col, Row} from "react-grid-system";
import config from "./../config/config";
import help from "./../config/help";
import './CardGrid.css';
import './../App.css';


class EntityCard extends Component {

	renderCardHeader() {
		return (
			<div style={{backgroundColor: Utils.getColorForStatus(this.props.entity.Status), color: config.colors.textAlternate}} className="card-header">
				{this.props.entity.Name}
			</div>
		);
	}

	renderCardBody() {
		return (
			<div style={{backgroundColor: Utils.getLightColorForStatus(this.props.entity.Status)}}>
				<EntityInformation entity={this.props.entity}/>
			</div>
		);
	}

	renderCardActions() {
		return (
			<div>
				<Row
					className="noMargin card-action-padding"
					style={{backgroundColor: Utils.getLightColorForStatus(this.props.entity.Status)}}>
					<Col xs={6}>
						{this.props.entity.HasChildren &&
						<a
							href={Utils.getLink(`/grid/${this.props.entity.Id}`)}
							data-hint={help.button.showChildrenOfEntity}
							data-hintPosition="top-right"
							className="card-button"
							style={{color: config.colors.text}}>
							<span>{help.descriptions.children}</span>
						</a>}
					</Col>
					<Col xs={6}>
						<a
							href={Utils.getLink(`/details/${this.props.parentEntityId}/${this.props.entity.Id}`)}
							data-hint={help.button.inspectEntity}
							data-hintPosition="top-right"
							className="card-button"
							style={{color: config.colors.text}}>
							<span>{help.descriptions.inspect}</span>
						</a>
					</Col>
				</Row>
			</div>
		)
	}

	render() {
		return (
			<div className="card">
				{this.renderCardHeader()}
				{this.renderCardBody()}
				{this.renderCardActions()}
			</div>
		);
	}
}

export default EntityCard;
