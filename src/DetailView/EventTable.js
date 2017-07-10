import React, {Component} from "react";
import AppStyles from "./../AppStyles";
import { css } from 'aphrodite';
import Utils from "../Utils/Utils";
import InsertChartButton from "material-ui/svg-icons/editor/insert-chart";
import "./../App.css";

class EventTable extends Component {

	composeTableHeader(eventTypeAttributes) {
		let eventTypeIsValid = this.props.currentEventType !== null;
		return (
			<thead>
			{eventTypeIsValid && <tr>
				{eventTypeAttributes.map(
					(attribute, key) => {
						return (
							<th key={key} 
								className={css(AppStyles.tableCell, AppStyles.tableHeaderCell)}>
								{attribute.Name}
								<a className="showOnHover"
									href={Utils.getLink(
										"analytics?eventTypeId=" + this.props.currentEventType.Id + "&entityId="
										+ this.props.entityId + "&attributeName=" + attribute.Name
										+ '&types=["attribute-distribution"]')}>
									<InsertChartButton style={{height: "16px", width: "16px"}}/>
								</a>
							</th>
						);
					})
				}
				</tr>}
			</thead>
		);
	}

	composeTableRow(event, key) {
		const row = event.Attributes.map(
			(eventAttribute, attributeKey) => {
				return (
					<td key={attributeKey} 
						className={css(AppStyles.tableCell)}>
						{eventAttribute.Value}
					</td>
				);
			});
		return (<tr className={css(AppStyles.tableRow)} key={key}>{row}</tr>);
	}

	composeTableBody(events) {
		return (
			<tbody>
				{events.map((event, key) => {
					return this.composeTableRow(event, key);
				})}
			</tbody>
		);
	}

	render() {
		return (
			<div className={css(AppStyles.tableWrapper)}>
			<table className={css(AppStyles.eventTable)}>
				{this.composeTableHeader(this.props.eventTypeAttributes)}
				{this.composeTableBody(this.props.events)}
			</table>
			</div>
		);
	}
}

export default EventTable;
