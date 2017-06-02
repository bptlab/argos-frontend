import React, {Component} from "react";
import AppStyles from "./../AppStyles";
import { css } from 'aphrodite';

class EventTable extends Component {

	composeTableHeader(eventTypeAttributes) {
		return (
			<tr>
			{eventTypeAttributes.map(
				(attribute, key) => {
					return (
						<th key={key} 
							className={css(AppStyles.tableCell, AppStyles.tableHeaderCell)}>
							{attribute.Name}
						</th>
					);
				})
			}
			</tr>
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
				<thead>
					{this.composeTableHeader(this.props.eventTypeAttributes)}
				</thead>
				{this.composeTableBody(this.props.events)}
			</table>
			</div>
		);
	}
}

export default EventTable;
